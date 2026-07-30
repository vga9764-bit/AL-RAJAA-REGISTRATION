import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    alert("رقم اللاعب غير موجود");
    throw new Error("Missing player id");
}

async function loadPlayer() {

    const playerRef = doc(db, "players", id);
    const playerSnap = await getDoc(playerRef);

    if (!playerSnap.exists()) {
        alert("اللاعب غير موجود");
        return;
    }

    const player = playerSnap.data();

    document.getElementById("playerName").textContent = player.name;
    document.getElementById("playerId").textContent = player.playerId;
    document.getElementById("position").textContent = player.position;
    document.getElementById("phone").textContent = player.phone;

    let status = "🟡 قيد المراجعة";

    if (player.status === "accepted") {
        status = "🟢 مقبول";
    }

    if (player.status === "rejected") {
        status = "🔴 مرفوض";
    }

    document.getElementById("status").textContent = status;
}

loadPlayer();
