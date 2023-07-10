<template>
  <q-page v-touch-swipe.mouse.right.left="handleSwipe">
    <q-tabs
      v-if="loggedIn"
      v-model="activeCategory"
      class="bg-grey-9 text-white shadow-2"
      mobile-arrows
      outside-arrows
      no-caps
    >
      <q-tab
        v-for="tab in categories"
        :name="tab.name"
        :label="tab.name"
        :key="tab.name"
      />
      <!-- Add New tab -->
      <q-tab @click="addingCategory = true">
        <q-icon name="add" />
      </q-tab>
      <q-tab @click="editingCategories = true">
        <q-icon name="edit" />
      </q-tab>
    </q-tabs>

    <div v-if="loggedIn">
      <div class="list scroll q-mb-xl">
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
              <q-item-label
                @click.stop="handleTodoClick(index)"
                :class="{ 'cursor-pointer': !task.completed }"
              >
                {{ task.title }}
              </q-item-label>
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

      <!-- Edit a task -->
      <q-dialog v-model="editingTask">
        <q-card style="width: 100%">
          <q-card-section>
            <div class="text-h6">Edit To Do</div>
            <div class="q-pa-md">
              <q-select
                v-model="editedTask.category"
                :options="categoryOptions"
                label="Select a category"
              />

              <q-input
                @keyup.enter="saveTask"
                autofocus
                clearable
                label="Update todo text"
                clear-icon="close"
                v-model="editedTask.title"
                placeholder="Edit existing task"
              >
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn color="primary" label="Cancel" v-close-popup />
            <q-btn
              color="positive"
              label="Save"
              @click="saveTask"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Add a category -->
      <q-dialog v-model="addingCategory">
        <q-card style="width: 100%">
          <q-card-section>
            <div class="text-h6">Add a new category</div>
            <div class="q-pa-md">
              <q-input
                @keyup.enter="addNewTab"
                autofocus
                clearable
                label="Category name"
                clear-icon="close"
                v-model="newCategoryName"
                placeholder="Category name"
              >
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn
              color="primary"
              label="Cancel"
              @click="goToLastActiveCategory"
              v-close-popup
            />
            <q-btn
              color="positive"
              label="Save"
              @click="addNewTab"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Delete a category -->
      <q-dialog v-model="editingCategories">
        <q-card style="width: 100%">
          <q-card-section>
            <div class="text-h6">Delete a category</div>
            <div class="q-pa-md">
              <q-select
                v-model="categoryToDelete"
                :options="categoryOptions"
                label="Select a category to delete"
              />
            </div>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn
              color="primary"
              label="Cancel"
              @click="goToLastActiveCategory"
              v-close-popup
            />
            <q-btn
              color="negative"
              label="Delete"
              @click="deleteSelectedCategory"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-footer class="bg-dark text-white">
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
            color="blue-10"
            label="Login via Google"
            no-caps
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, watch, onUnmounted } from "vue";
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
    const categoryOptions = computed(() => {
      return categories.value.map((category) => ({
        label: category.name,
        value: category.name,
      }));
    });
    const activeCategory = ref("");
    const lastActiveCategory = ref("");
    let categoriesListener = null;
    let todosListener = null;
    let editingTask = ref(false);
    let editedTask = ref(null);
    let addingCategory = ref(false);
    let newCategoryName = ref("");
    let editingCategories = ref(false);
    let categoryToDelete = ref("");

    const notify = useQuasar();
    const userStore = useUserStore();
    const loggedIn = computed(() => {
      return userStore.isAuthenticated;
    });

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

              const newCat = new Category("My list", 0);
              await setDoc(
                myListCategoryRef,
                categoryConverter.toFirestore(newCat)
              );

              const todosCollectionRef = collection(myListCategoryRef, "todos");
              const newTodo = new ToDo("123", 0, "My first todo", false, "");
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

    const handleTodoClick = (index) => {
      if (taskList.value[index].completed) {
        return;
      }
      editedTask.value = taskList.value[index];
      editedTask.value.category = activeCategory.value;
      editingTask.value = true;
    };

    const saveTask = async () => {
      const userId = auth.currentUser.uid;
      const userTodoDocRef = doc(
        db,
        "users",
        userId,
        "categories",
        activeCategory.value,
        "todos",
        editedTask.value.id
      );
      // Same category, updated title
      if (!editedTask.value.category.value) {
        try {
          await updateDoc(userTodoDocRef, {
            title: editedTask.value.title,
          });
          notifySuccess(`Updated todo!`);
        } catch (error) {
          notifyFail(error);
        }
      }
      // New category
      else {
        console.log("New cat", editedTask.value.category.value);
        const docSnapshot = await getDoc(userTodoDocRef);
        const docData = docSnapshot.data();

        // Create a new document in the destination collection
        const newDocRef = doc(
          db,
          "users",
          userId,
          "categories",
          editedTask.value.category.value,
          "todos",
          editedTask.value.id
        );
        await setDoc(newDocRef, docData);
        await deleteDoc(userTodoDocRef);
        notifySuccess(`Moved todo to ${editedTask.value.category.value}!`);
      }
      editedTask.value = null;
      editingTask.value = false;
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

    const goToLastActiveCategory = () => {
      activeCategory.value = lastActiveCategory.value;
    };

    const addNewTab = async () => {
      addingCategory.value = false;
      if (!newCategoryName.value) {
        goToLastActiveCategory();
        newCategoryName.value = "";
        return;
      }

      try {
        const exists = await isCategoryExists(newCategoryName.value);
        if (exists) {
          notifyFail("Category already exists!");
          goToLastActiveCategory();
        } else {
          await addNewCategory(newCategoryName.value);
        }
      } catch (error) {
        notifyFail("Error checking category existence: " + error);
        goToLastActiveCategory();
      }

      newCategoryName.value = "";
    };

    // Failed notification
    const notifyFail = (error) => {
      notify.notify({
        message: "Failed! " + error,
        color: "negative",
        icon: "error_outline",
        position: "top-right",
      });
    };

    // Success notification
    const notifySuccess = (info) => {
      notify.notify({
        message: info,
        color: "positive",
        icon: "published_with_changes",
        position: "top-right",
      });
    };

    const deleteSelectedCategory = () => {
      const categoryId = categoryToDelete.value.value;
      const userId = auth.currentUser.uid;

      deleteCategoryAndSubcollections(userId, categoryId)
        .then(() => {
          notifySuccess("Deleted category and all todos in it.");
        })
        .catch((error) => {
          notifyFail("Error deleting category: " + error);
        });
      categoryToDelete.value = "";
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

    const handleSwipe = ({ evt, ...newInfo }) => {
      const activeCategoryIndex = categories.value.findIndex(
        (category) => category.name === activeCategory.value
      );
      if (newInfo.direction == "right") {
        if (activeCategoryIndex > 0) {
          activeCategory.value = categories.value.at(
            activeCategoryIndex - 1
          ).name;
        }
      } else {
        if (activeCategoryIndex < categories.value.length - 1) {
          activeCategory.value = categories.value.at(
            activeCategoryIndex + 1
          ).name;
        }
      }
    };

    return {
      newTask,
      taskList,
      categories,
      categoryOptions,
      activeCategory,
      loggedIn,
      login,
      addTask,
      deleteTask,
      completeTask,
      notify,
      saveTask,
      addNewTab,
      handleTodoClick,
      handleSwipe,
      editingTask,
      editedTask,
      addingCategory,
      newCategoryName,
      goToLastActiveCategory,
      editingCategories,
      categoryToDelete,
      deleteSelectedCategory,
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
