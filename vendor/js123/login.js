import { supabase } from "./supabase/supa.js";

const btnshow = document.getElementById("spass");
const iconshow = document.getElementById("iconpas");
const inppass = document.getElementById("pass");
const inpuser = document.getElementById("user");
const formula = document.getElementById("enviar");

localStorage.clear();

async function loginsupa(user1,email1) {
    const { data, error } = await supabase
  .from('usuarios')
  .select("*");

  if(!error){
    if(data){
        data.forEach(c => {
            let user = {usuario: c.user, contraseña: c.password};
            //console.log(user);
            if(user1 == user.usuario && email1 == user.contraseña){
                localStorage.setItem("user", JSON.stringify(user));
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
                /* Read more about handling dismissals below*/ 
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
                });
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Usuario u Contraseña incorrecta",
                    willClose: () =>{
                        window.location.href = "./admin.html";
                    }
                });
            }
        });
    }
  }else{
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
 loginsupa(user,pass);
 //console.log(users);
let users00 = localStorage.getItem("users");
let us = JSON.parse(users00);
console.log(us);
});


