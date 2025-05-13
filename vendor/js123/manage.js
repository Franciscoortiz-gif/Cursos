import {doc, collection, onSnapshot, query,where } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from "./data.js";

const tabl = document.getElementById("tabla");

let us = localStorage.getItem("users");
let us2 = JSON.parse(us);

noasignados();

async function noasignados(){
    const refus = collection(db, "Inscripciones");
    const q = query(refus, where("asignado", "==", false));
    const consult = onSnapshot(q,(hq) => {
        tabl.innerHTML = "";
        hq.forEach(c => {
            console.log(c.data());
            tabl.innerHTML = `
            <tr>
                <td>${c.data().nombre}</td>
                <td>${c.data().correo}</td>
                <td>${c.data().celular}</td>
                <td>${c.data().curs}</td>
            </tr>
            `
        });
    });
}