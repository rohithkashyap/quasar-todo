<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> To Do </q-toolbar-title>
        <div v-if="userName">
          Hi, {{ userName }}!
          <q-btn flat dense round icon="logout" @click="signOut"></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :width="200" :breakpoint="500">
      <q-scroll-area class="fit">
        <q-list highlight padding class="menu-list">
          <q-item exact clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section> To do </q-item-section>
          </q-item>

          <q-item exact clickable v-ripple to="/help">
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section> Help </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useUserStore } from "src/stores/user";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);
    const userStore = useUserStore();
    const userName = computed(() => {
      const user = userStore.user;
      if (user && user.displayName) {
        return user.displayName.split(" ")[0];
      }
      return "";
    });

    const signOut = () => {
      userStore.signOut();
    };

    return {
      leftDrawerOpen,
      userStore,
      userName,
      signOut,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
