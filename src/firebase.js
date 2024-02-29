// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
/* import { getAnalytics } from "firebase/analytics"; */
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2qhj4aoutrhpCQ-lE8CS3ENNWXoQ77CU",
  authDomain: "teza-c542a.firebaseapp.com",
  projectId: "teza-c542a",
  storageBucket: "teza-c542a.appspot.com",
  messagingSenderId: "182749420075",
  appId: "1:182749420075:web:c07a66f34475477332686e",
  measurementId: "G-D0WWPXD92H",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */

export default appFirebase;
