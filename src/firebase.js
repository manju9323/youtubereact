
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAHDxtuPDxXxeBAZRnPqBtZZHu4arcjbYY",
  authDomain: "video-59dcf.firebaseapp.com",
  projectId: "video-59dcf",
  storageBucket: "video-59dcf.appspot.com",
  messagingSenderId: "771912120555",
  appId: "1:771912120555:web:1366eb59c2672a7e82a6ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider();

export default app;