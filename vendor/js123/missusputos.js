import { supabase } from "./supabase/supa.js";

let useac = document.getElementById("user");
const tab2 = document.getElementById("tabla");
const putoelquelolea = document.getElementById("salir");

let us = localStorage.getItem("user");
let us2 = JSON.parse(us);
//console.log(us2)
useac.innerHTML = us2.usuario;
let us11 = us2.usuario;

carg();

async function carg(){
    let { data, error } = await supabase
    .from('cursos')
    .select('*')
    .eq('vendedor', us11);

    if(!error){
        tab2.innerHTML = '';
        data.forEach(c => {
            //console.log(c.data());
                tab2.innerHTML += `
                <tr>
                    <td>${c.created_at}</td>
                    <td>${c.nombre}</td>
                    <td>${c.correo}</td>
                    <td>${c.celular}</td>
                    <td>${c.cursosoli}</td>
                    <td>${c.vendedor}</td>
                    <td>${c.fechacurso}</td>
                    <td>${c.aula}</td>
                </tr>
                `
    });
    actualiza();
}
}

function actualiza(){
    supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'cursos' },
                (payload) => {
                    //console.log('Change received!', payload);
                    if(payload.eventType === 'UPDATE' || payload.eventType === 'INSERT'){
                        carg();
                    }
                }
            )
            .subscribe()
}

putoelquelolea.addEventListener('click', (e) =>{
    e.preventDefault();
    localStorage.clear();
    window.location.href = "./admin.html";
});