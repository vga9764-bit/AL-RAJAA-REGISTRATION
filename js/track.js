import { db } from "./firebase.js";

import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

searchBtn.addEventListener("click", async () => {

    const playerId = document.getElementById("playerId").value.trim().toUpperCase();

    if (playerId === "") {
        alert("يرجى إدخال رقم الطلب");
        return;
    }

    result.style.display = "none";

    const q = query(
        collection(db, "players"),
        where("playerId", "==", playerId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {

        result.style.display = "block";
        result.innerHTML = `
            <h3>❌ لم يتم العثور على الطلب</h3>
        `;
        return;

    }

    snapshot.forEach((doc) => {

        const player = doc.data();

        let status = "🟡 قيد المراجعة";

        if (player.status === "accepted") {
            status = "🟢 تم قبول الطلب";
        }

        if (player.status === "rejected") {
            status = "🔴 تم رفض الطلب";
        }

        result.style.display = "block";

        result.innerHTML = `
            <h2>🦁 نادي الرجاء الرياضي</h2>

            <p><strong>رقم الطلب:</strong> ${player.playerId}</p>

            <p><strong>الاسم:</strong> ${player.name}</p>

            <p><strong>المركز:</strong> ${player.position}</p>

            <p><strong>الهاتف:</strong> ${player.phone}</p>

            <p><strong>الحالة:</strong> ${status}</p>
        `;

    });

});
