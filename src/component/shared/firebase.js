import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6gdRGT7Rl9FTvmVV8gKZ5Hd1TC7YhEuM",
  authDomain: "magazine-c3f45.firebaseapp.com",
  projectId: "magazine-c3f45",
  storageBucket: "magazine-c3f45.appspot.com",
  messagingSenderId: "618173024228",
  appId: "1:618173024228:web:3f2f634b9f8891830729f1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export default app;
