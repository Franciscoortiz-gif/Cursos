import {db} from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js"


const formula = document.getElementById("fom");
const nimbreref = document.getElementById("nom");
const ageref = document.getElementById("age");
const emailref = document.getElementById("email");
const numref = document.getElementById("tel");
const ciudref = document.getElementById("ciu");
const selcur = document.getElementById("cur");


formula.addEventListener('submit', (e) =>{
    e.preventDefault(); 
    let name = nimbreref.value;
    let edad = ageref.value;
    let email = emailref.value;
    let celular = numref.value;
    let ciudad = ciudref.value;
    let curso = selcur.options[selcur.selectedIndex].value;
    console.log(name,edad,email,celular,ciudad,curso);
    regist(name,edad,email,celular,ciudad,curso) ;  
})

async function regist(nombre1,age,email,cel,ciudad,curso) {
    try {
        const docRef = await addDoc(collection(db, "inscripciones"), {
            nombre: nombre1,
            edad: age,
            correo: email,
            celular: cel,
            direccion: ciudad,
            curs: curso
    });

    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.log("Error adding document: ", e);
    }
}