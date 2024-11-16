
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyApvAuzAbE1_8IuxRadDOf_rmp8QYQY2mk",
  authDomain: "kurationai.firebaseapp.com",
  projectId: "kurationai",
  storageBucket: "kurationai.firebasestorage.app",
  messagingSenderId: "975898147978",
  appId: "1:975898147978:web:147da7e107c8c398a90173",
  measurementId: "G-XJVNVLWHEN"
};


const app = initializeApp(firebaseConfig);

export {app}