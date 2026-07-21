let deck = [];

let player = [];
let dealer = [];

let bankroll = 1000;
let betAmount = 0;

let gameOver = true;


const playerCards = document.getElementById("playerCards");
const dealerCards = document.getElementById("dealerCards");

const playerScore = document.getElementById("playerScore");
const dealerScore = document.getElementById("dealerScore");

const money = document.getElementById("money");
const betDisplay = document.getElementById("bet");

const message = document.getElementById("message");



function createDeck(){

    deck=[];

    const suits=["♠","♥","♦","♣"];

    const ranks=[
        "A","2","3","4","5",
        "6","7","8","9","10",
        "J","Q","K"
    ];


    for(let suit of suits){

        for(let rank of ranks){

            let value;

            if(rank==="A"){
                value=11;
            }
            else if(["J","Q","K"].includes(rank)){
                value=10;
            }
            else{
                value=Number(rank);
            }


            deck.push({
                rank:rank,
                suit:suit,
                value:value
            });

        }

    }


    shuffle();

}



function shuffle(){

    deck.sort(()=>Math.random()-0.5);

}



function drawCard(){

    return deck.pop();

}



function calculateScore(hand){

    let score=0;

    let aces=0;


    for(let card of hand){

        score+=card.value;

        if(card.rank==="A"){
            aces++;
        }

    }


    while(score>21 && aces>0){

        score-=10;

        aces--;

    }


    return score;

}



function showCards(){


    playerCards.innerHTML="";
    dealerCards.innerHTML="";


    player.forEach(card=>{

        playerCards.innerHTML += 
        `<div class="card">
        ${card.rank}${card.suit}
        </div>`;

    });



    dealer.forEach((card,index)=>{

        if(index===0 && !gameOver){

            dealerCards.innerHTML +=
            `<div class="card">
            🂠
            </div>`;

        }
        else{

            dealerCards.innerHTML +=
            `<div class="card">
            ${card.rank}${card.suit}
            </div>`;

        }

    });



    playerScore.textContent =
    "Score: " + calculateScore(player);



    if(gameOver){

        dealerScore.textContent =
        "Score: " + calculateScore(dealer);

    }
    else{

        dealerScore.textContent =
        "Score: ?";

    }

}



function addBet(amount){


    if(!gameOver){
        return;
    }


    if(bankroll>=amount){

        bankroll-=amount;

        betAmount+=amount;


        updateMoney();

    }

}



function updateMoney(){

    money.textContent=bankroll;

    betDisplay.textContent=betAmount;

}



function deal(){


    if(betAmount===0){

        message.textContent="Place a bet first!";

        return;

    }


    createDeck();


    player=[];
    dealer=[];


    player.push(drawCard());
    player.push(drawCard());


    dealer.push(drawCard());
    dealer.push(drawCard());


    gameOver=false;


    showCards();


    message.textContent="Hit or Stand?";



    if(calculateScore(player)===21){

        stand();

    }

}



function hit(){


    if(gameOver){
        return;
    }


    player.push(drawCard());


    showCards();


    if(calculateScore(player)>21){

        gameOver=true;

        lose();

        showCards();

        message.textContent="💥 Bust! Dealer wins.";

    }


}



function stand(){


    if(gameOver){
        return;
    }


    while(calculateScore(dealer)<17){

        dealer.push(drawCard());

    }


    gameOver=true;


    showCards();



    let playerTotal=calculateScore(player);

    let dealerTotal=calculateScore(dealer);



    if(dealerTotal>21){

        win();

        message.textContent="🎉 Dealer busts! You win!";

    }

    else if(playerTotal>dealerTotal){

        win();

        message.textContent="🎉 You win!";

    }

    else if(playerTotal<dealerTotal){

        lose();

        message.textContent="😢 Dealer wins.";

    }

    else{

        bankroll+=betAmount;

        betAmount=0;

        updateMoney();

        message.textContent="🤝 Push.";

    }


}



function win(){

    bankroll+=betAmount*2;

    betAmount=0;

    updateMoney();

}



function lose(){

    betAmount=0;

    updateMoney();

}
