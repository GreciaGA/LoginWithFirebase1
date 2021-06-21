// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAS4X_OuHDpM7vFD-qA5tsiLWWvprWlL8Q",
    authDomain: "testing-431dd.firebaseapp.com",
    projectId: "testing-431dd",
    storageBucket: "testing-431dd.appspot.com",
    messagingSenderId: "694883814541",
    appId: "1:694883814541:web:10109bef932a1ff72d26c4",
    measurementId: "G-8325190QV6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const fs = firebase.firestore();
firebase.analytics();


const registerNewUser = document.getElementById("btnRegisterNewUser");
const loginUser = document.getElementById("btnLoginEmail");
const cerrarSesion = document.getElementById("btnCerrarSesion");
const btnLoginGoogle = document.getElementById("btnLoginGoogle");
const btnLoginFacebook = document.getElementById("btnLoginFacebook");

const divMimuro = document.getElementById("divMimuro");
const divIniciarSesion = document.getElementById('divIniciarSesion');
const divCerrarSesion = document.getElementById('divCerrarSesion');
const auth = firebase.auth();


// // Registra y crea nuevo usuario con firebase
// registerNewUser.addEventListener('click',()=>{
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     console.log(email, password)
// })


registerNewUser.addEventListener('click', ()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        console.log("Bienvenido "+email+" su registro fue exitoso");
        var user = userCredential.user;
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ..
    });
}) 


//   Login de usuario existente con firebase
loginUser.addEventListener('click',()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value; 
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // loginUser.reset();
        // Signed in
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
    });
})


//   Cerrar sesión de usuario con firebase
cerrarSesion.addEventListener('click',()=>{
    firebase.auth().signOut();
    console.log("cerrado de sesión exitoso");  
})


//   Estado del usuario: conectado o desconectado
firebase.auth().onAuthStateChanged(function(user){            
    if(user){               
        const email = user.email;
        // alert("Usuario Activo " + email);  
        console.log("Usuario Activo " + email);  
        console.log(email+ " Te logueaste correctamente");
        divIniciarSesion.classList.remove('show');
        divIniciarSesion.classList.add('hide');
        divCerrarSesion.classList.replace('hide','show');
        divMimuro.classList.replace('hide','show');
        
    }else{               
        // alert("No Active User");
        console.log("No Active User");
        divIniciarSesion.classList.remove('hide');
        divIniciarSesion.classList.add('show');
        divCerrarSesion.classList.replace('show','hide');
        divMimuro.classList.replace('show','hide');
      }           
    });


// IMPORTANTE !!! EJECUTAR EL SIGUIENTE CODIGO CON "OPEN WITH LIVE SERVER"
// ***********************************************************************
// FACEBOOK LOGIN
btnLoginFacebook.addEventListener('click', e => {
    e.preventDefault(); // lo uso por el botón "submit"
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().languageCode = 'es';
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        
        console.log(result);
        console.log("logueado con facebook");
        // loginUser.reset();
    })
    .catch((error) => {
        console.log(error);
    });
})    


// GOOGLE LOGIN 
btnLoginGoogle.addEventListener('click', e => {
    e.preventDefault(); // lo uso por el botón "submit"
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        console.log(result);
        // loginUser.reset();
        console.log("logueado con google");
    })
    .catch((error) => {
        console.log(error);
    });
})



// **********************************
// **********************************

// // POSTS  2
// const postList = document.querySelector('.posts');
// const setupPosts = data => {
//     if (data.length){
//         let html = '';
//         data.forEach(doc => {
//             const post = doc.data()
//             const li = `
//                <li class="list-group-item list-group-item-action"> 
//                     <h5> ${post.title} </h5>
//                     <p> ${post.description} </p>
//                </li>
//             `;
//             html += li;

//         });
//         postList.innerHTML = html;
//     }else{
//         postList.innerHTML ='<p class="text-center"> logueate pare ver las publicaciones </p>'
//     }
// }

// // EVENTS   1
// // Comprueba si está logueado o NO.
// auth.onAuthStateChanged(user => {
//     if(user) {
//         console.log('auth: signin')
//         fs.collection('posts')
//             .get()
//             .then((snapshot)=> {
//                 setupPosts(snapshot.docs);
//             })
//     } else{
//             console.log('auth: cerraste sesión');
//             setupPosts([]);
//     }
// })

