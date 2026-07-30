import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const form = document.getElementById("playerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const player = {
    name: document.getElementById("name").value,
    birth: document.getElementById("birth").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    position: document.getElementById("position").value,
    height: document.getElementById("height").value,
    weight: document.getElementById("weight").value,
    foot: document.getElementById("foot").value,
    clubs: document.getElementById("clubs").value,
    notes: document.getElementById("notes").value,
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "players"), player);

    alert("تم إرسال طلب التسجيل بنجاح");

    form.reset();

  } catch (error) {
    alert("حدث خطأ: " + error.message);
  }
});
