const playerCards = document.getElementById("playerCards");
const dealerCards = document.getElementById("dealerCards");

function createCard(text){

const div=document.createElement("div");

div.className="card";

div.textContent=text;

return div;

}

playerCards.appendChild(createCard("A♠"));
playerCards.appendChild(createCard("K♦"));

dealerCards.appendChild(createCard("🂠"));
dealerCards.appendChild(createCard("9♣"));
