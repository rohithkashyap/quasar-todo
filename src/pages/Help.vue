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
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      changelog: [
        {
          version: "0.0.2",
          changes: ["Save tasks in localStorage"],
        },
        {
          version: "0.0.1",
          changes: ["Base app"],
        },
      ],
    };
  },
});
</script>
