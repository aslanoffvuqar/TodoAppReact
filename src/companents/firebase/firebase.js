
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDh2kfQOpBztIZE1Xktcc4PNTQ2WTPvVIE",
    authDomain: "todo-f35b6.firebaseapp.com",
    projectId: "todo-f35b6",
    storageBucket: "todo-f35b6.appspot.com",
    messagingSenderId: "640668756200",
    appId: "1:640668756200:web:7808167f9144c43474c15d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)