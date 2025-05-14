import { supabase } from "./supabase/supa.js";


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
    registsupa(name,edad,email,celular,ciudad,curso) ;  
    
    
})

async function registsupa(nombre1,age,email,cel,ciudad,curso) {
    const { data, error } = await supabase
  .from('cursos')
  .insert({ nombre: nombre1, edad: age, direccion: ciudad, cursosoli: curso, correo: email, celular: cel })
  .select();
  if(error){
     Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salio mal por favor intenta de nuevo",
            willClose: () =>{
            window.location.href = "./inscripcion.html";
        }
        
        });
  }else{
     let timerInterval;
    Swal.fire({
        title: "Solicitud de Inscripcion realizada con exito",
        html: "Dentro de poco uno de nuestros asesores de ventas se contactara contigo para concluir tu isncripcion",
        html: "Se te redigira a la pagina principal en <b></b> milisegundos",
        timer: 5000,
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
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            window.location.href = "./index.html"
        }
        });
        
  }
}