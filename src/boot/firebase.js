import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { useUserStore } from "src/stores/user";

import { boot } from "quasar/wrappers";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default boot(({ router, store }) => {
  const userStore = useUserStore(store);

  // Set up the Firebase auth state change listener
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // User is signed in
      userStore.isAuthenticated = true;
      userStore.user = user;
      console.log("User is signed in!", user.displayName);
    } else {
      // User is not signed in
      userStore.isAuthenticated = false;
      userStore.user = null;
      console.log("User is not signed in!");
    }
  });
});
