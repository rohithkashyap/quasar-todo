<template>
  <q-page class="column">
    <q-tabs
      v-if="loggedIn"
      v-model="activeCategory"
      class="bg-primary text-white shadow-2"
      mobile-arrows
      outside-arrows
      no-caps
    >
      <q-tab
        v-for="(tab, index) in categories"
        :name="tab.name"
        :label="tab.name"
        :key="tab.name"
        @mousedown="startCategoryTimer(index)"
        @touchstart="startCategoryTimer(index)"
        @mouseup="cancelCategoryTimer"
        @touchend="cancelCategoryTimer"
      />
      <!-- Add New tab -->
      <q-tab @click="addNewTab">
        <q-icon name="add" />
      </q-tab>
    </q-tabs>

    <div v-if="loggedIn">
      <div class="list scroll">
        <q-list bordered separator>
          <q-item
            v-for="(task, index) in taskList"
            :key="task.title"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-checkbox
                v-model="task.completed"
                class="no-pointer-event"
                color="primary"
                @click="completeTask(index)"
              />
            </q-item-section>
            <q-item-section :class="{ completed: task.completed }">
              <template v-if="task.editing && !task.completed">
                <q-input
                  v-model="task.title"
                  @keyup.enter="saveTask(index)"
                  @blur="saveTask(index)"
                  dense
                  autofocus
                />
              </template>
              <template v-else>
                <q-item-label
                  @click="handleTodoClick(index)"
                  @mousedown="startTodoTimer(index, $event)"
                  @touchstart="startTodoTimer(index, $event)"
                  @mouseup="cancelTodoTimer"
                  @touchend="cancelTodoTimer"
                  :class="{ 'cursor-pointer': !task.completed }"
                >
                  {{ task.title }}
                </q-item-label>
              </template>
            </q-item-section>
            <q-item-section side v-if="task.completed">
              <q-btn flat @click="deleteTask(index)" icon="delete" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div v-if="!taskList.length" class="absolute-center column">
        <q-icon name="check" color="positive" size="xl" />
        <p color="primary">No Tasks!</p>
      </div>

      <q-footer elevated class="bg-dark text-white">
        <q-input
          @keyup.enter="addTask"
          outlined
          clearable
          clear-icon="close"
          v-model="newTask"
          placeholder="Add a task"
        >
          <template v-slot:append>
            <q-btn @click="addTask" round dense flat icon="add" />
          </template>
        </q-input>
      </q-footer>
    </div>
    <div v-else class="absolute-center column">
      <q-card>
        <q-card-section>
          <div class="text-h5 text-center">Welcome!</div>
          <div class="text-h6 text-center">Please login to continue</div>
        </q-card-section>
        <q-separator />
        <q-card-actions vertical>
          <q-btn
            @click="login"
            color="primary"
            label="Login via Google"
            no-caps
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, watch, watchEffect, onUnmounted } from "vue";
import { useQuasar } from "quasar";
import {
  ToDo,
  todoConverter,
  categoryConverter,
  completionMessages,
} from "../classes/Todo";
import { db, auth } from "src/boot/firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  setDoc,
  orderBy,
} from "firebase/firestore";
import { useUserStore } from "src/stores/user";
import { Category } from "../classes/Todo";

// Composition API
export default {
  setup() {
    const newTask = ref("");
    const taskList = ref([]);
    const categories = ref([]);
    const activeCategory = ref("");
    const lastActiveCategory = ref("");
    let categoriesListener = null;
    let todosListener = null;

    const notify = useQuasar();
    const userStore = useUserStore();
    const loggedIn = computed(() => {
      return userStore.isAuthenticated;
    });
    let categoryLongPressTimer = null;
    let todoLongPressTimer = null;

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        let maxRetries = 3; // Maximum number of retries
        let retryCount = 0; // Current retry count

        while (retryCount < maxRetries) {
          try {
            // User is logged in
            const userId = user.uid;

            // Check if the user has a category collection
            const categoriesRef = collection(db, "users", userId, "categories");
            const categoriesSnapshot = await getDocs(categoriesRef);

            if (categoriesSnapshot.empty) {
              // User does not have a category collection
              // Create one for them
              await setDoc(doc(db, "users", userId), {});

              // Create "My list" category and todos collection
              const myListCategoryRef = doc(categoriesRef, "My list");

              const newCat = new Category("My list", Date.now());
              await setDoc(
                myListCategoryRef,
                categoryConverter.toFirestore(newCat)
              );

              const todosCollectionRef = collection(myListCategoryRef, "todos");
              const newTodo = new ToDo(
                "123",
                Date.now(),
                "My first todo",
                false,
                ""
              );
              await addDoc(
                todosCollectionRef,
                todoConverter.toFirestore(newTodo)
              );

              await setDoc(todosCollectionRef, {});
            }

            startCategoriesListener();
            break;
          } catch (error) {
            // Increment the retry count
            retryCount++;

            if (retryCount === maxRetries) {
              notifyFail("Something went wrong. Please refresh or restart.");
            } else {
              const delay = 1000; // Delay in milliseconds before retrying
              console.log(
                `Retrying (${retryCount}/${maxRetries}) in ${delay}ms...`
              );
              await wait(delay); // Wait for the specified delay before retrying
            }
          }
        }
      } else {
        stopCategoriesListener();
        stopTodosListener();
      }
    });

    const startCategoriesListener = () => {
      try {
        const userId = auth.currentUser.uid;
        const q = query(
          collection(db, "users", userId, "categories"),
          orderBy("createdDate")
        );

        categoriesListener = onSnapshot(q, (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            // Access individual category document ID
            const cat = categoryConverter.fromFirestore(doc);
            data.push(cat);
          });
          categories.value = data;
          activeCategory.value = categories.value.at(0).name;
          lastActiveCategory.value = activeCategory.value;
        });
      } catch (error) {
        notifyFail("Cannot listen to changes from DB.");
      }
    };

    // Function to stop listening to changes
    const stopCategoriesListener = () => {
      if (categoriesListener) {
        categoriesListener();
        categoriesListener = null;
      }
    };
    const stopTodosListener = () => {
      if (todosListener) {
        todosListener();
        todosListener = null;
      }
    };

    onUnmounted(() => {
      stopCategoriesListener();
      stopTodosListener();
    });

    // Set up listener for all notes in the
    watch(activeCategory, (newValue, oldValue) => {
      // Unsubscribe from the previous todos listener
      if (todosListener) {
        todosListener();
        todosListener = null;
      }

      if (newValue) {
        lastActiveCategory.value = oldValue;
        const userId = auth.currentUser.uid;
        // Listener for todos collection based on the active category
        const q = query(
          collection(db, "users", userId, "categories", newValue, "todos"),
          orderBy("completed"),
          orderBy("createdDate")
        );

        todosListener = onSnapshot(q, (snapshot) => {
          taskList.value = snapshot.docs.map((doc) =>
            todoConverter.fromFirestore(doc)
          );
        });
      }
    });

    // Clean up the listeners when the component is unmounted
    onUnmounted(() => {
      if (categoriesListener) {
        categoriesListener();
      }
      if (todosListener) {
        todosListener();
      }
    });

    // Login
    const login = async () => {
      const userStore = useUserStore();
      try {
        await userStore.signInWithRedirect();
      } catch (error) {
        notifyFail("Could not sign in. " + error);
      }
    };

    // Add a task
    const addTask = async () => {
      if (newTask.value.length == 0 || activeCategory.value == null) {
        return;
      }
      try {
        const userId = auth.currentUser.uid;
        const userCategoriesRef = collection(
          db,
          "users",
          userId,
          "categories",
          activeCategory.value,
          "todos"
        );
        const newTodo = new ToDo("123", Date.now(), newTask.value, false, "");

        await addDoc(userCategoriesRef, todoConverter.toFirestore(newTodo));
      } catch (error) {
        notifyFail(error);
      }
      notifySuccess("Todo added!");
      newTask.value = "";
    };

    // Delete a task
    const deleteTask = async (index) => {
      const id = taskList.value.at(index).id;
      try {
        const userId = auth.currentUser.uid;
        const userTodoDocRef = doc(
          db,
          "users",
          userId,
          "categories",
          activeCategory.value,
          "todos",
          id
        );
        await deleteDoc(userTodoDocRef);
      } catch (error) {
        notifyFail(error);
      }
    };

    // Complete a task
    const completeTask = async (index) => {
      const userId = auth.currentUser.uid;
      const userTodoDocRef = doc(
        db,
        "users",
        userId,
        "categories",
        activeCategory.value,
        "todos",
        taskList.value.at(index).id
      );
      let isCompleted = taskList.value.at(index).completed;
      try {
        await updateDoc(userTodoDocRef, {
          completed: isCompleted,
        });
        if (isCompleted) {
          notifySuccess(
            completionMessages[
              Math.floor(Math.random() * completionMessages.length)
            ]
          );
        }
      } catch (error) {
        notifyFail(error);
      }
    };

    const startTodoTimer = (index, event) => {
      event.preventDefault();
      todoLongPressTimer = setTimeout(() => {
        editTask(index);
      }, 1000); // Adjust the delay (in milliseconds) for long press detection
    };

    const handleTodoClick = (index) => {
      if (todoLongPressTimer) {
        cancelTodoTimer();
      }

      taskList.value.at(index).completed = !taskList.value.at(index).completed;
      completeTask(index);
    };

    const cancelTodoTimer = () => {
      clearTimeout(todoLongPressTimer);
      todoLongPressTimer = null;
    };

    const editTask = (index) => {
      taskList.value[index].editing = true;
    };

    const saveTask = async (index) => {
      taskList.value[index].editing = false;
      const userId = auth.currentUser.uid;
      const userTodoDocRef = doc(
        db,
        "users",
        userId,
        "categories",
        activeCategory.value,
        "todos",
        taskList.value.at(index).id
      );

      try {
        await updateDoc(userTodoDocRef, {
          title: taskList.value.at(index).title,
        });
      } catch (error) {
        notifyFail(error);
      }
    };

    const addNewCategory = async (newCategory) => {
      try {
        const userId = auth.currentUser.uid;
        const categoriesRef = collection(db, "users", userId, "categories");

        const newCategoryDocRef = doc(categoriesRef, newCategory);

        // Create the category document under categories collection
        const newCat = new Category(newCategory, Date.now());

        await setDoc(newCategoryDocRef, categoryConverter.toFirestore(newCat));
        activeCategory.value = newCategory;
      } catch (error) {
        notifyFail("Error adding new category: " + error);
      }
    };

    // Function to check if a category already exists
    const isCategoryExists = async (categoryName) => {
      const userId = auth.currentUser.uid;
      const categoryDocRef = doc(
        db,
        "users",
        userId,
        "categories",
        categoryName
      );

      try {
        const categoryDocSnapshot = await getDoc(categoryDocRef);
        return categoryDocSnapshot.exists();
      } catch (error) {
        notifyFail(
          "Could not check if category exists. Please try again later. " + error
        );
        return false;
      }
    };

    const addNewTab = () => {
      const newTabName = prompt("Enter a name for the new category");
      if (!newTabName) {
        activeCategory.value = lastActiveCategory.value;
        return;
      }

      isCategoryExists(newTabName)
        .then((exists) => {
          if (exists) {
            notifyFail("Category already exists!");
            activeCategory.value = lastActiveCategory.value;
          } else {
            addNewCategory(newTabName);
          }
        })
        .catch((error) => {
          notifyFail("Error checking category existence: " + error);
          activeCategory.value = lastActiveCategory.value;
        });
    };

    // Failed notification
    const notifyFail = (error) => {
      notify.notify({
        message: "Failed! " + error,
        color: "red",
        icon: "error_outline",
        position: "top-right",
      });
    };

    // Success notification
    const notifySuccess = (info) => {
      notify.notify({
        message: info,
        color: "green",
        icon: "published_with_changes",
        position: "top-right",
      });
    };

    const startCategoryTimer = (index) => {
      categoryLongPressTimer = setTimeout(() => {
        const categoryId = categories.value.at(index).name; // Specify the category ID

        const result = window.confirm(
          `Are you sure you want to delete the category "${categoryId}"? All todos under this category will be deleted forever!`
        );
        if (result) {
          const userId = auth.currentUser.uid;

          deleteCategoryAndSubcollections(userId, categoryId)
            .then(() => {
              notifySuccess("Deleted category and all todos in it.");
            })
            .catch((error) => {
              notifyFail("Error deleting category: " + error);
            });
        }
      }, 1000); // Adjust the delay (in milliseconds) for long press detection
    };

    const cancelCategoryTimer = () => {
      clearTimeout(categoryLongPressTimer);
      categoryLongPressTimer = null;
    };

    const deleteCategoryAndSubcollections = async (userId, categoryId) => {
      const categoryRef = doc(db, "users", userId, "categories", categoryId);
      const todosCollectionRef = collection(categoryRef, "todos");

      // Delete the todos collection within the category document
      await deleteCollection(todosCollectionRef);

      // Delete the category document
      await deleteDoc(categoryRef);
    };

    const deleteCollection = async (collectionRef) => {
      const snapshot = await getDocs(collectionRef);

      // Delete all documents in the collection
      snapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    };

    return {
      newTask,
      taskList,
      categories,
      activeCategory,
      loggedIn,
      login,
      addTask,
      deleteTask,
      completeTask,
      notify,
      editTask,
      saveTask,
      addNewTab,
      startCategoryTimer,
      cancelCategoryTimer,
      startTodoTimer,
      cancelTodoTimer,
      handleTodoClick,
    };
  },
};
</script>

<style lang="scss">
.completed {
  text-decoration: line-through;
  color: grey;
}
.notask {
  opacity: 0.5;
}
</style>
