<template>
  <q-page class="bg-grey-3 column">
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
      <q-icon name="check" color="primary" size="5em" />
      <p color="primary">No Tasks!</p>
    </div>

    <q-footer elevated class="bg-white text-white">
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      newTask: "",
      taskList: [],
    };
  },
  methods: {
    // Add a task
    addTask() {
      if (this.newTask.length == 0) {
        return;
      }
      this.taskList.push({
        title: this.newTask,
        completed: false,
      });
      this.newTask = "";
      console.log(this.taskList);
    },

    // Delete a task
    deleteTask(index) {
      this.taskList.splice(index, 1);
    },
  },
});
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
