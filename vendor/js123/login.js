import { db } from "./data.js"
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const btnshow = document.getElementById("spass");
const iconshow = document.getElementById("iconpas");
const inppass = document.getElementById("pass");
const inpuser = document.getElementById("user");
const formula = document.getElementById("enviar");

localStorage.clear();


let users = [];
async function login(user1,email1) {
    const refusers = collection(db, "users");
    const q = await getDocs(refusers);

    q.forEach(c => {
       //console.log(c.data()); 
       users.push(c.data());
    });

    if(users.find((item) => item.user === user1) && users.find((item2) => item2.password === email1)){
        //console.log("Correcto");
        localStorage.setItem('users', JSON.stringify(users));
        users = [];
        let timerInterval;
        Swal.fire({
        title: "Inicio de sesion Correcto",
        html: "Se te dirigira a la pestaña principal el <b></b> milisegundos.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
            window.location.href = "./manageinscriptions.html";
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
        });
    }else{
        //console.log("Incorrecto");
        users = [];
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Usuario u Contraseña incorrecta",
        willClose: () =>{
            window.location.href = "./admin.html";
        }
        });
        
    }
}

btnshow.addEventListener('click', (e) =>{
    e.preventDefault();
    if(iconshow.classList == "bx bxs-show"){
        inppass.type = "text"
        iconshow.classList.remove("bxs-show");
        iconshow.classList.add("bxs-hide");
    }else{
        iconshow.classList.remove("bxs-hide");
        inppass.type = "password"
        iconshow.classList.add("bxs-show");
    }
});

formula.addEventListener('click', (e) =>{
 e.preventDefault();
 let pass = inppass.value;
 let user = inpuser.value;
 console.log(pass+user);
 login(user,pass);
 //console.log(users);
let users00 = localStorage.getItem("users");
let us = JSON.parse(users00);
console.log(us);
});


