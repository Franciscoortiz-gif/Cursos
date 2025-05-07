import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyD00cTIkzkarLjLKDR6Qsuy2r9f3z-Ramw",
  authDomain: "cursos-df60a.firebaseapp.com",
  projectId: "cursos-df60a",
  storageBucket: "cursos-df60a.firebasestorage.app",
  messagingSenderId: "223719595361",
  appId: "1:223719595361:web:1a11e18799b97d1fcab920",
  measurementId: "G-MZGT9RPHYE"
};

  export const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);


