const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

let deck = [];
let player = [];
let dealer = [];
let gameOver = true;

let bankroll = Number(localStorage.getItem("bankroll")) || 1000;

let bet = 0;

document.getElementById("money").textContent="$"+bankroll;

const playerCards = document.getElementById("playerCards");
const dealerCards = document.getElementById("dealerCards");

const playerScore = document.getElementById("playerScore");
const dealerScore = document.getElementById("dealerScore");

const message = document.getElementById("message");

document.getElementById("dealBtn").onclick = deal;
document.getElementById("hitBtn").onclick = hit;
document.getElementById("standBtn").onclick = stand;

function buildDeck(){

    deck = [];

    // 6 deck shoe
    for(let d=0; d<6; d++){

        for(const suit of suits){

            for(const rank of ranks){

                let value;

                if(rank==="A") value=11;
                else if(["J","Q","K"].includes(rank)) value=10;
                else value=parseInt(rank);

                deck.push({
                    rank,
                    suit,
                    value
                });

            }

        }

    }

    shuffle();

}

function shuffle(){

    for(let i=deck.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [deck[i],deck[j]]=[deck[j],deck[i]];

    }

}

function draw(){

    return deck.pop();

}

function handValue(hand){

    let total=0;
    let aces=0;

    for(const card of hand){

        total+=card.value;

        if(card.rank==="A") aces++;

    }

    while(total>21 && aces){

        total-=10;
        aces--;

    }

    return total;

}

function makeCard(card){

    const div=document.createElement("div");

    const red=card.suit==="♥"||card.suit==="♦";

    div.className="card";

    div.innerHTML=`
    <div class="corner ${red?"red":"black"}">
        ${card.rank}<br>${card.suit}
    </div>

    <div class="suit ${red?"red":"black"}">
        ${card.suit}
    </div>

    <div class="corner ${red?"red":"black"}"
         style="transform:rotate(180deg);">
        ${card.rank}<br>${card.suit}
    </div>
    `;

    return div;

}

function makeBack(){

    const div=document.createElement("div");

    div.className="card back";

    div.innerHTML="<div class='suit'>🂠</div>";

    return div;

}

function render(){

    playerCards.innerHTML="";
    dealerCards.innerHTML="";

    player.forEach(card=>{

        playerCards.appendChild(makeCard(card));

    });

    dealer.forEach((card,index)=>{

        if(index===0 && !gameOver){

            dealerCards.appendChild(makeBack());

        }else{

            dealerCards.appendChild(makeCard(card));

        }

    });

    playerScore.textContent="Score: "+handValue(player);

    if(gameOver){

        dealerScore.textContent="Score: "+handValue(dealer);

    }else{

        dealerScore.textContent="Score: ?";

    }

}

function deal(){

    buildDeck();

    player=[];
    dealer=[];

    player.push(draw());
    dealer.push(draw());

    player.push(draw());
    dealer.push(draw());

    gameOver=false;

    render();

    const p=handValue(player);

    if(p===21){

        stand();

    }else{

        message.textContent="Hit or Stand?";

    }

}

function hit(){

    if(gameOver) return;

    player.push(draw());

    render();

    if(handValue(player)>21){

        gameOver=true;

        render();

        message.textContent="💥 Bust! Dealer Wins.";

    }

}

function stand(){

    if(gameOver) return;

    while(handValue(dealer)<17){

        dealer.push(draw());

    }

    gameOver=true;

    render();

    const p=handValue(player);
    const d=handValue(dealer);

    if(d>21){

        message.textContent="🎉 Dealer Busts! You Win!";

    }

    else if(p>d){

        message.textContent="🎉 You Win!";

    }

    else if(d>p){

        message.textContent="😢 Dealer Wins.";

    }

    else{

        message.textContent="🤝 Push";

    }

}
