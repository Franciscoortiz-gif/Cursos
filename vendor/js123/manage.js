import {doc, collection, onSnapshot,query,where, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from "./data.js";


let useac = document.getElementById("user");
const tabl = document.getElementById("tabla");

let us = localStorage.getItem("users");
let us2 = JSON.parse(us);
useac.innerHTML = us2[0].user;
let vend = us2[0].user;
let ap = 0;

noasignados();



async function noasignados(){
    const refus = collection(db, "Inscripciones");
    const q = query(refus, where("asignado", "==", false));
    const consult = onSnapshot(refus,(hq) => {
        tabl.innerHTML = "";
        hq.forEach(c => {
            //console.log(c.data());
            tabl.innerHTML += `
            <tr>
                <td>${c.data().nombre}</td>
                <td>${c.data().correo}</td>
                <td>${c.data().celular}</td>
                <td>${c.data().curs}</td>
                <td><button class="ed" onclick="edit('${c.id}')">Tomar solicitud</button></td>
            </tr>
            `
        });
    });
}

