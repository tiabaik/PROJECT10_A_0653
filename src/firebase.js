import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBBvy7BaAoKTvKUKKL7tIcZjus60o8-bAk",
  authDomain: "vuefire0653.firebaseapp.com",
  databaseURL: "https://vuefire0653-default-rtdb.firebaseio.com",
  projectId: "vuefire0653",
  storageBucket: "vuefire0653.appspot.com",
  messagingSenderId: "482276514933",
  appId: "1:482276514933:web:2514045414b53fb8192c3c"
}

const firebaseApp = initializeApp(firebaseConfig);

export const db = getDatabase(firebaseApp);

//tambahkan code untuk menginisialisasikan Firebase

//tambahkan code untuk menginisialisasikan Realtime Database 
//dan mendapatkan referensi ke database tersebut
