<template>
  <q-page class="col q-pa-md">
    <div class="text-subtitle1">To Do app, made with ❤️ by Rohith Kashyap</div>
    <hr />

    <div v-for="h in help" :key="h.title">
      <p class="text-h6">{{ h.title }}</p>
      <li v-for="t in h.text" :key="t">
        {{ t }}
      </li>
      <br />
    </div>
    <hr />
    <p class="text-h5">Changelog</p>
    <div v-for="updates in changelog" :key="updates.version">
      <p class="text-h6">{{ updates.version }}</p>
      <li v-for="change in updates.changes" :key="change">
        {{ change }}
      </li>
      <br />
    </div>
    <p></p>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const help = ref([
      {
        title: "Login",
        text: ["Login via Google only! Sorry."],
      },
      {
        title: "Setup",
        text: [
          'Once you log in, a new category called "My List" will be created, with a first sample todo. That\'s it!',
        ],
      },
      {
        title: "Categories",
        text: [
          "To add a new category, click the + button in the category tabs.",
          "You cannot edit a category name yet.",
          "To delete it, press the edit tab. If you delete a category, ALL TODOS UNDER IT WILL BE DELETED FOREVER!",
        ],
      },
      {
        title: "To Dos",
        text: [
          "To edit a todo, press it.",
          "To complete the todo, press the checkbox.",
          "To undo completed todo, press the checkbox again.",
          "To add a new todo, enter todo title in the input at the bottom of the screen, and hit enter.",
        ],
      },
    ]);
    const changelog = ref([
      {
        version: "1.0.1",
        changes: [
          "Allows moving todo to a different category",
          "Streamlined prompts",
          "Added better way to edit todos and delete category",
        ],
      },
      {
        version: "1.0.0",
        changes: [
          "Connects to firebase firestore database",
          "Allows adding/deleting categories",
          "Allows adding/completing/deleting todos",
        ],
      },
    ]);

    return {
      help,
      changelog,
    };
  },
};
</script>
