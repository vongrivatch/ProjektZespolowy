
import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACmCEOrSWE_fm0nNu29rCN6Vj_7m15N_4",
  authDomain: "flashcardsapp-b79a0.firebaseapp.com",
  projectId: "flashcardsapp-b79a0",
  storageBucket: "flashcardsapp-b79a0.appspot.com",
  messagingSenderId: "800209669108",
  appId: "1:800209669108:web:eae7520cbdd95d726047a1"
};

const app = initializeApp(firebaseConfig);

export default app;
