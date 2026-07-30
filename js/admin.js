import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const table = document.getElementById("playersTable");

const totalPlayers = document.getElementById("totalPlayers");
const pendingPlayers = document.getElementById("pendingPlayers");
const acceptedPlayers = document.getElementById("acceptedPlayers");
const rejectedPlayers = document.getElementById("rejectedPlayers");

window.acceptPlayer = async function(id){

    await updateDoc(doc(db,"players",id),{
        status:"accepted"
    });

    loadPlayers();

}

window.rejectPlayer = async function(id){

    await updateDoc(doc(db,"players",id),{
        status:"rejected"
    });

    loadPlayers();

}

window.deletePlayer = async function(id){

    if(confirm("هل تريد حذف اللاعب؟")){

        await deleteDoc(doc(db,"players",id));

        loadPlayers();

    }

}

async function loadPlayers(){

    table.innerHTML="";

    const snapshot = await getDocs(collection(db,"players"));

    let number = 1;

    let total = 0;
    let pending = 0;
    let accepted = 0;
    let rejected = 0;

    snapshot.forEach((playerDoc)=>{

        const player = playerDoc.data();

        total++;

        let status = "🟡 قيد المراجعة";

        if(player.status==="pending"){
            pending++;
        }

        if(player.status==="accepted"){
            accepted++;
            status="🟢 مقبول";
        }

        if(player.status==="rejected"){
            rejected++;
            status="🔴 مرفوض";
        }

        table.innerHTML += `
        <tr>

            <td>${player.playerId}</td>

            <td>${player.name}</td>

            <td>${player.position}</td>

            <td>${player.phone}</td>

            <td>${status}</td>

            <td>

                <button class="accept" onclick="acceptPlayer('${playerDoc.id}')">
                    ✅ قبول
                </button>

                <button class="reject" onclick="rejectPlayer('${playerDoc.id}')">
                    ❌ رفض
                </button>

                <button class="delete" onclick="deletePlayer('${playerDoc.id}')">
                    🗑️ حذف
                </button>

            </td>

        </tr>
        `;

        number++;

    });

    totalPlayers.textContent = total;
    pendingPlayers.textContent = pending;
    acceptedPlayers.textContent = accepted;
    rejectedPlayers.textContent = rejected;

}

loadPlayers();
