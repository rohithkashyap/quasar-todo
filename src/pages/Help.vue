<template>
  <q-page class="col q-pa-md">
    <p>Type in, then hit enter or plus.</p>
    <p>On web version, changes will be saved in cookies.</p>
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
    const changelog = ref([
      {
        version: "0.0.3",
        changes: ["Use composition API"],
      },
      {
        version: "0.0.2",
        changes: ["Dark mode", "Save tasks in localStorage"],
      },
      {
        version: "0.0.1",
        changes: ["Base app"],
      },
    ]);

    return {
      changelog,
    };
  },
};
</script>
