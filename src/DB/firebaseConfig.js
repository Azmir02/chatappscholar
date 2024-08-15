// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDB-PVhkNU_nbk4a-Kt_XgAqXJD0VeSd6s",
    authDomain: "chatting-app-ab789.firebaseapp.com",
    projectId: "chatting-app-ab789",
    storageBucket: "chatting-app-ab789.appspot.com",
    messagingSenderId: "413646771426",
    appId: "1:413646771426:web:9c1f86d928d28e41fd3abb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig