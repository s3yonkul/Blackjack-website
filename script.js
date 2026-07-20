const suits = ["♠","♥","♦","♣"];
const values = [
"A","2","3","4","5","6","7","8","9","10","J","Q","K"
];

let deck=[];
let player=[];
let dealer=[];
let gameOver=true;

function buildDeck(){

deck=[];

for(let suit of suits){

for(let value of values){

let score;

if(value==="A") score=11;
else if(["J","Q","K"].includes(value)) score=10;
else score=parseInt(value);

deck.push({
text:value+suit,
value:score
});

}

}

shuffle(deck);

}

function shuffle(array){

for(let i=array.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];

}

}

function draw(){
return deck.pop();
}

function score(hand){

let total=0;
let aces=0;

for(let card of hand){

total+=card.value;

if(card.value===11) aces++;

}

while(total>21 && aces){

total-=10;
aces--;

}

return total;

}

function render(){

const playerCards=document.getElementById("player-cards");
const dealerCards=document.getElementById("dealer-cards");

playerCards.innerHTML="";
dealerCards.innerHTML="";

player.forEach(card=>{

playerCards.innerHTML+=`<div class="card">${card.text}</div>`;

});

dealer.forEach(card=>{

dealerCards.innerHTML+=`<div class="card">${card.text}</div>`;

});

document.getElementById("player-score").textContent=
"Score: "+score(player);

document.getElementById("dealer-score").textContent=
gameOver
? "Score: "+score(dealer)
: "Score: ?";

}

function deal(){

buildDeck();

player=[draw(),draw()];
dealer=[draw(),draw()];

gameOver=false;

render();

document.getElementById("message").textContent="Hit or Stand?";

}

function hit(){

if(gameOver) return;

player.push(draw());

render();

if(score(player)>21){

gameOver=true;

render();

document.getElementById("message").textContent="💥 Bust! Dealer Wins.";

}

}

function stand(){

if(gameOver) return;

while(score(dealer)<17){

dealer.push(draw());

}

gameOver=true;

render();

const p=score(player);
const d=score(dealer);

let msg="";

if(d>21) msg="🎉 Dealer Busts! You Win!";
else if(p>d) msg="🎉 You Win!";
else if(d>p) msg="😢 Dealer Wins.";
else msg="🤝 Push.";

document.getElementById("message").textContent=msg;

}

document.getElementById("deal").onclick=deal;
document.getElementById("hit").onclick=hit;
document.getElementById("stand").onclick=stand;
document.getElementById("new").onclick=deal;
