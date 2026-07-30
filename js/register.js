import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const form = document.getElementById("playerForm");

async function generatePlayerId() {

    while (true) {

        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        const playerId = "ALR-" + randomNumber;

        const q = query(
            collection(db, "players"),
            where("playerId", "==", playerId)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return playerId;
        }

    }

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const playerId = await generatePlayerId();

        const player = {

            playerId: playerId,

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

            status: "pending",

            createdAt: serverTimestamp()

        };

        await addDoc(collection(db, "players"), player);

        alert(
            "تم إرسال طلب التسجيل بنجاح\n\nرقم طلبك هو:\n" + playerId
        );

        form.reset();

    } catch (error) {

        alert("حدث خطأ:\n" + error.message);

    }

});
