import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const table = document.getElementById("playersTable");

async function loadPlayers() {

    table.innerHTML = "";

    const snapshot = await getDocs(collection(db, "players"));

    let number = 1;

    snapshot.forEach((doc) => {

        const player = doc.data();

        table.innerHTML += `
        <tr>

        <td>ALR-${String(number).padStart(5,"0")}</td>

        <td>${player.name}</td>

        <td>${player.position}</td>

        <td>${player.phone}</td>

        <td>
        🟡 قيد المراجعة
        </td>

        <td>

        <button class="accept">
        قبول
        </button>

        <button class="reject">
        رفض
        </button>

        <button class="delete">
        حذف
        </button>

        </td>

        </tr>
        `;

        number++;

    });

}

loadPlayers();
