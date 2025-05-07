import {db} from "./firebase.js";
import { collection, getDocs, query, where, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

let form1 = document.getElementById("log1");
let ema = document.getElementById("email2");
let pass = document.getElementById("pass1");
const rutaimgabierto = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAmpJREFUSEvtlUtIVHEUxn/fzP/vgxaBRYWgVNBzo5ibapMUEbioVU9y1WPZUimqhYuiFtHCTS0zeuzUlhE9RBcWQdAmSyQEraCIIHXufzx5b+MwMz6GAnee3b1893zf+c7jimUOLXN+VgjKOrykRWZWSwgngFakesw2JBmlCcw+A09wrlvS18WYFiQwsxqy2U7MzgPpMjID0IVzlyX9KsXOI7Dp6R2kUk+BWiCDdAcYZGZmGO+HkwRRtIVUaiuwF7NziQhphHS6RVJcWT6KCGxyciPOvQbWAANks22qqvq0VAU2NbWNdPo+sAsYw7lmSV/mvskTmJkjhCGgEXiJcwckRTHQYu+j6AbSQZxrVNyDgjCzakIYBBqAF/J+33yCKGoHrmM2ivdNkn7MgSyTeYh0LHl2rk7SWGlVZlZPCG+Bmlm72uTcvWQe8klCGMFsE9JhOddbpDCKvgFrc+96yGbbqayckPSzCJfJnEG6C7yR983FBFH0HtgZK5Vzj0sIYkvWl6gel/fxIOTDQjiFWTfwTt7HdhVVcByzB7lGNUj6nq8uiq4BHSUEnfL+Sh7zd2dii9YhHZFzPcUEZilC6Ad2A69wLh65bK7JIoSLwIVkdOG2vL9ZkLySEAaAJuCZvN8/r8m5RKsJId6B2L9+Qjit6urRfxjT5zjXKun3ggQ5klWE0Dc7bi05tV1IQ8zMfMD7j/EcEUWbSaW2A3swO5vb9l6cOyppulDQYqciTQhXZ3f2EpBaqoJEhFmHKipuLYQrd+zqCOEkcKjg2BnSeLIvZn14/6hwc0tJVn44ZdpTsGhlkf8JWPYe/AFJGPEZyyClwwAAAABJRU5ErkJggg==";
const rutaimgcerrado = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAtxJREFUSEu1lc2rlVUUxn/PPes9dkshpeyCKIWZWUmINQjxI6JPCCIhVBAuCEHhVCeB/gtCBQ4iCaxB0KCBIEh+3cqkKIIkkwqhUPRiDXRwOe9635X7nH2u58Obgsc93Ofd67fX8zxrH3GXl+5yffoAUZa7MTsgaXpU4FlAtFrvIn0InMVsw6ggNwARD+F+AliZIesk/XOnnfRLFLEY92PAE8DPuL9Bo/Ea0uvA+ACsBRzG7KCky3NdZMjkiHgA9+PAk7d5ewc+wGyPpKuDZ4YBMzPLaTQOZam63+8BjmJ2pr1RlisYG3sMWEfE20AD6U/K8gWNj5/vhfRL1Cn+NTDRPgBBxHKk36nr00ibgHuAY7jvSsViZmYljcanwFoi/qIo1ki60oX0mmy4/wQ8BThmjwA1VXWCiEeH5KrrVZo372zaj4hx3E8BTwPHVRTPDwNarZ1I7/cUOo3Zi8C9uE8BKwYgGzH7UdK1DFmWL7gIabvMDqb9Gx2U5d/AEqRJInbnJH2H2UvA/Gx80r13XVBRLOluRKu1A+kj4AcVxbODgF/ayZE2t31wP5mNPjUASXPSXdMqisU9gEmkA2mOVBSr+gHuW4n4DJjGLP3YpKq+ISJ5kTpJcs2nqqZmPYn4RM3mZJZoIe5/AAuBV1UUh/sBEWO4pwQ9B3yfCy64Hr0ppIeBbzF7Gbgvy/V4nviUrAr3VHAt0n6ZvTNkcr7F/bgfAZ4BzlHXm6nra5glcNI6QTqddJ6VBDlHSpG0FEhybpRU3hSQIQtw/xJIUauBL9oSwXvAImAKs7coyzfz49itdSbBJV2cc9BmzYpo4L43Fx0bmoGbbyTAekn/3hLQA1qK+7brHbyCtIyIifZ0wwXgPBGfU1VfYZY6Xg38itmm3sdvJP9oEfFgjnXy5Lfsw6W+FN2mDHN+Fp2nvjM7ETvUbH48UkAOyARluUXN5r45U3SnnQyeH4kH/3ep/wACYSIowo6tTQAAAABJRU5ErkJggg==";
const showbtn = document.getElementById("show");
const eyeele = document.getElementById("eye");

form1.addEventListener('submit', (e) =>{
    e.preventDefault()
    const emal = ema.value;
    const pas = pass.value;
    console.log( emal + pas);
    regist(emal,pas);
});
showbtn.addEventListener('click', (e) =>{
    
    if(pass.type === "password"){
        pass.type = "text";
        eyeele.src = rutaimgcerrado;
    }else{
        pass.type = "password";
        eyeele.src = rutaimgabierto;
    }
})




async function regist(email1,pass) {
    const user2 = [];
    const userref = collection(db, "users");
    const querySnapshot = await getDocs(userref);
    querySnapshot.forEach((a) => {
        console.log(a.data()); 
        return user2.push(a.data());
    });
    console.log(user2);  

    if(!user2.find(item => item.email == email1)){
        try {
            const docRef = await addDoc(collection(db, "users"), {
              email: email1,
              password: pass
            });
            console.log("Document written with ID: ", docRef.id);
            alert("Cuenta creada con exito");
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("A ocurrido un error al crear la cuenta por favor intenta de nuevo")
        }
    }else{
        alert("El usuario ya existe");
    }
}
