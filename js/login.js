import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAn4jMJGdj3EM6J6rg-gRTakETybQpGUVE",
  authDomain: "alrajjaapp.firebaseapp.com",
  projectId: "alrajjaapp",
  storageBucket: "alrajjaapp.firebasestorage.app",
  messagingSenderId: "702047164548",
  appId: "1:702047164548:web:2fc02fd3612b3a61e88ad1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

loginBtn.addEventListener("click", async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = "admin.html";

  } catch (error) {

    message.innerHTML = "البريد الإلكتروني أو كلمة المرور غير صحيحة";

  }

});
