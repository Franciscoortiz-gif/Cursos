import { collection, doc, updateDoc, getDocs, query, where, orderBy} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import {db} from "./firebase.js";


const divemaiinref = document.getElementById("ema1");
const divpass1 = document.getElementById("pass12");
const divpass2 = document.getElementById("pass13");
const divbtnenviarpas = document.getElementById("pass14");
const btnemaenv = document.getElementById("form-submit");
const emainp = document.getElementById("email2");
const pass2btn = document.getElementById("form-submit1");
const pass1 = document.getElementById("pass10");
const pass2 = document.getElementById("pass11");




divemaiinref.classList.add("show");
btnemaenv.classList.add("show");

divpass1.classList.add("hidden");
divpass2.classList.add("hidden");
divbtnenviarpas.classList.add("hidden");
let userinfo2 = [];

async function verif(email) {
    const infous = []; 
    const userref = collection(db, "users");
    const q = query(userref, where("email", "==", email));
    const quer = await getDocs(q);
    quer.forEach(c => {
        const injj = [];
        injj[0] = c.id;
        return infous.push(injj) ;
    });
    return userinfo2.push(infous);
}

async function edit(passw) {
    const idd1 = userinfo2[0];
    const idd = idd1[0];
    console.log(idd[0]);
    const refuser = collection(db, "users");
    const r = doc(refuser, idd[0]);
    console.log(r);
    return updateDoc(r,{
        password: passw
    })

    
}
async function nn(email) {
    if(divemaiinref.classList == "show"){
        if(email != ""){
            verif(email);
            setTimeout(() => {
            }, 1000);
            console.log(userinfo2);
            divemaiinref.classList.add("hidden");
            divemaiinref.classList.remove("show");
            btnemaenv.classList.add("hidden");
            btnemaenv.classList.remove("show");
            divpass1.classList.add("show");
            divpass2.classList.add("show");
            divbtnenviarpas.classList.add("show");
            divpass1.classList.remove("hidden");
            divpass2.classList.remove("hidden");
            divbtnenviarpas.classList.remove("hidden");
            
        }else{
            alert("Los campos no pueden estar vacios");
        }
    }
    return
}


btnemaenv.addEventListener('click', (e) =>{
    e.preventDefault();
    let ema = emainp.value;
    nn(ema);
});

pass2btn.addEventListener('click', (e) =>{
    e.preventDefault();
    let passn = pass1.value;
    let passCon = pass2.value;
    console.log(passn)

    if(passn == passCon){
        console.log(userinfo2);
        edit(passn);
    }else{
        alert("las contraseñas no coinciden");
    }
});

