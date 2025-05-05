import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDglc2rlQIxyj2c9CfTujK-NXQFttaMzvo",
  authDomain: "handrehab-e2afd.firebaseapp.com",
  databaseURL: "https://handrehab-e2afd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "handrehab-e2afd",
  storageBucket: "handrehab-e2afd.appspot.com",
  messagingSenderId: "337803807188",
  appId: "1:337803807188:web:3a875527d1e45189fcae41"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);