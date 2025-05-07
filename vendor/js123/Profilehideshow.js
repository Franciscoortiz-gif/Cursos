let islogged = false;
let profilestat = document.getElementById("NotLogg");
let profile = document.getElementById("Logged");

if(!islogged){
    profilestat.classList.add('show');
    profilestat.classList.remove('hidden');
    profile.classList.remove('show');
    profile.classList.add('hidden');
}else{
    profilestat.classList.add('hidden');
    profilestat.classList.remove('show');
    profile.classList.remove('hidden');
    profile.classList.add('show');
}