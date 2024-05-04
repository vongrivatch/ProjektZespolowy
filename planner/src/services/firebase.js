import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDtUEe0vwUj5e1ZDNQIfNCmnXRQ6x3lDDE",
  authDomain: "purrfectplanner-a17d3.firebaseapp.com",
  projectId: "purrfectplanner-a17d3",
  storageBucket: "purrfectplanner-a17d3.appspot.com",
  messagingSenderId: "138908230443",
  appId: "1:138908230443:web:304875007bb43942d3db6e",
  measurementId: "G-HN2GSBH0V6"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app;
export { db };
