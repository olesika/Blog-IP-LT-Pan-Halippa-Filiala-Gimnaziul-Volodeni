
 const firebaseConfig = {
    apiKey: "AIzaSyAuP5WxHxprzE7NaSlLp2yGM86EvVN-hVg",
    authDomain: "blog-school-687df.firebaseapp.com",
    projectId: "blog-school-687df",
    storageBucket: "blog-school-687df.appspot.com",
    messagingSenderId: "896765296036",
    appId: "1:896765296036:web:07f4757b46830ff7b69531",
    measurementId: "G-TLNQW998MH"
  };

function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}

const yearElement = document.getElementById('year');
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const postareBtn = document.getElementById("postare-btn");
const salutare = document.getElementById("username");

let user = null;
let admins = ["CF5taIgtVNXl8aS3C1HtwyZqTdk1"];

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

const postariDb = db.collection("postari");

const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = function() {
    console.log("logare...");
    auth.signInWithPopup(provider).then(function() { window.location.reload(); });
}
    logoutBtn.onclick = function() {
        auth.signOut();
        window.location.reload();
    }

function isAdmin() {
   let admin;

    if (user == null)
        return false;

    admin = admins.includes(user.uid); //true or false

    return admin;
}

function formatDate(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

    let result = day + " -" + month + " -" + year;

    return result;
}

auth.onAuthStateChanged(function(fuser) {
    user = fuser;
    console.log(user);
    if (user != null) {
        //logat in sistem
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";

        salutare.innerHTML = "Salutare, " + user.displayName;

        if (isAdmin() == true) {
            postareBtn.style.display = "block";
        }
        else {
            postareBtn.style.display = "none"; 
        }
    }
    else {
        //nu e logat in sistem
        logoutBtn.style.display = "none";
        loginBtn.style.display = "block";
        postareBtn.style.display = "none";

    }

    document.querySelector("body").style.display = "block";
})

if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getFullYear() + " ©";
}

