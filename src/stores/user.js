import { defineStore } from "pinia";
import { auth, googleProvider } from "src/boot/firebase";
import { signInWithRedirect, User } from "firebase/auth";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    async signInWithRedirect() {
      try {
        await signInWithRedirect(auth, googleProvider);
      } catch (error) {
        console.error("Sign-in with redirect failed:", error);
      }
    },
    signOut() {
      auth
        .signOut()
        .then(() => {
          this.user = null;
          this.isAuthenticated = false;
          console.log("Signed out user");
        })
        .catch((error) => {
          console.log("Error during sign out", error);
        });
    },
  },
});
