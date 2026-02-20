import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    projectId: "test-project-56f2e",
    appId: "1:69842840681:web:48d0cc41577f60b4b386f8",
    storageBucket: "test-project-56f2e.firebasestorage.app",
    apiKey: "AIzaSyBS37qxeRn-jx85o7LzStSnQ5oHFz1Kpwg",
    authDomain: "test-project-56f2e.firebaseapp.com",
    messagingSenderId: "69842840681",
    measurementId: "G-D474WP0W6P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
