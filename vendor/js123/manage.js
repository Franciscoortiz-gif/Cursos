
import { supabase } from "./supabase/supa.js";


let useac = document.getElementById("user");
const tabl = document.getElementById("tabla");

let us = localStorage.getItem("user");
let us2 = JSON.parse(us);
console.log(us2)
useac.innerHTML = us2.usuario;

carga();


async function carga() {
    let { data, error } = await supabase
  .from('cursos')
  .select('*')
  .eq('asignado', false);
  console.log(data);
  if(!error){
    tabl.innerHTML = "";
        data.forEach(c => {
            //console.log(c.data());
            tabl.innerHTML += `
            <tr>
                <td>${c.created_at}</td>
                <td>${c.nombre}</td>
                <td>${c.correo}</td>
                <td>${c.celular}</td>
                <td>${c.cursosoli}</td>
                <td><button class="ed" onclick="edit('${c.id}')">Tomar solicitud</button></td>
            </tr>
            `
        });
    if(data){
       datawq();
    }
  }
}


function datawq(){
     supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'cursos' },
            (payload) => {
                console.log('Change received!', payload);
                if(payload.eventType === 'UPDATE' || payload.eventType === 'INSERT'){
                    carga();
                }
            }
        )
        .subscribe()
}