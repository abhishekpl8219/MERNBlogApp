// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernblog-f0611.firebaseapp.com",
  projectId: "mernblog-f0611",
  storageBucket: "mernblog-f0611.appspot.com",
  messagingSenderId: "107595773759",
  appId: "1:107595773759:web:e1ea32b554cca124ee458a"
};

// Initialize Firebase
export const app1 = initializeApp(firebaseConfig);