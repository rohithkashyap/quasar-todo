<template>
  <q-page class="column">
    <div class="list scroll">
      <q-list bordered separator>
        <q-item
          v-for="(task, index) in taskList"
          :key="task.title"
          @click="task.completed = !task.completed"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-checkbox
              v-model="task.completed"
              class="no-pointer-event"
              color="primary"
            />
          </q-item-section>
          <q-item-section :class="{ completed: task.completed }">
            <q-item-label>{{ task.title }}</q-item-label>
          </q-item-section>
          <q-item-section side v-if="task.completed">
            <q-btn flat @click="deleteTask(index)" icon="delete" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div v-if="!taskList.length" class="absolute-center column notask">
      <q-icon name="check" color="positive" size="5em" />
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
  </q-page>
</template>

<script>
import { ref, onMounted, watch } from "vue";

// Composition API
export default {
  setup() {
    const newTask = ref("");
    const taskList = ref([]);

    onMounted(() => {
      if (localStorage.getItem("taskList") !== null) {
        let list = localStorage.getItem("taskList");
        console.log(list);
        taskList.value = JSON.parse(list);
      }
    });

    // Add a task
    const addTask = () => {
      if (newTask.value.length == 0) {
        return;
      }
      taskList.value.push({
        title: newTask.value,
        completed: false,
      });
      newTask.value = "";
      updateLocalStorage();
    };

    // Delete a task
    const deleteTask = (index) => {
      taskList.value.splice(index, 1);
    };

    // Update localStorage
    const updateLocalStorage = () => {
      localStorage.setItem("taskList", JSON.stringify(taskList.value));
    };

    watch(
      taskList,
      () => {
        updateLocalStorage();
      },
      { deep: true }
    );

    return {
      newTask,
      taskList,
      addTask,
      deleteTask,
    };
  },
};

// Options API
// export default defineComponent({
//   name: "PageIndex",
//   mounted() {
// if (localStorage.getItem("taskList") !== null) {
//   let list = localStorage.getItem("taskList");
//   this.taskList = JSON.parse(list);
// }
//   },
//   unmounted() {
//     this.updateLocalStorage();
//   },
//   data() {
//     return {
//       newTask: "",
//       taskList: [],
//     };
//   },
//   methods: {
// // Add a task
// addTask() {
//   if (this.newTask.length == 0) {
//     return;
//   }
//   this.taskList.push({
//     title: this.newTask,
//     completed: false,
//   });
//   this.newTask = "";
// },

//     // Delete a task
// deleteTask(index) {
//   this.taskList.splice(index, 1);
// },

//   // Update localStorage
//   updateLocalStorage() {
//     localStorage.setItem("taskList", JSON.stringify(this.taskList));
//   },
// },
//   watch: {
//     taskList: {
//       handler() {
//         this.updateLocalStorage();
//       },
//       deep: true,
//     },
//   },
// });
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
