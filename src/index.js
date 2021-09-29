let playerCards = [];
let playerSum = 0;

let dealerCards = [];
let dealerSum = 0;

let hasBlackjack = false;
let isAlive = false;

let message = "";
let messageEl = document.querySelector("#message-el");

let startEl = document.querySelector("#start-el");

let playerCardsEl = document.querySelector("#cards-el");
let playerSumEl = document.querySelector("#sum-el");

let dealerCardsEl = document.querySelector("#dealer-cards-el");
let dealerSumEl = document.querySelector("#dealer-sum-el");

let coins = 100;
let coinsEl = document.querySelector("#coins-el");

function startGame() {
    if (coins !== 0) {
        console.log("SYSTEM: Starting the game.")
        isAlive = true;
        coinsEl.textContent = "Coins: $" + coins;
        hasBlackjack = false;
        // player
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        playerCards = [firstCard, secondCard];
        playerSum = firstCard + secondCard;
        // ----------------------
        // dealer (background)
        let dealerFirstCard = getRandomCard();
        let dealerSecondCard = getRandomCard();
        dealerCards = [dealerFirstCard, dealerSecondCard];
        dealerSum = dealerFirstCard + dealerSecondCard;
        dealerCardsEl.textContent = null;
        dealerSumEl.textContent = null;
        // ---------------------
        renderGame();
    } else {
        message = "You don't have enough coins to start a new game. Try again later!";
        messageEl.textContent = message;
    }

}

// d-Logic
function renderGame() {
    console.log("SYSTEM: Rendering the game.")
    startEl.textContent = "NEW GAME";
    // player
    for (let i = 0; i < playerCards.length; i++) {
        if (i === 0) {
            playerCardsEl.textContent = "Cards: " + playerCards[i];
        } else {
            playerCardsEl.textContent += " ";
            playerCardsEl.textContent += playerCards[i];
        }
    }
    playerSumEl.textContent = "Sum: " + playerSum;
    if (playerSum < 21) {
        message = "Do you want to draw a new card?";
    } else if (playerSum === 21) {
        message = "Wohoo! You've got Blackjack!";
        hasBlackjack = true;
        coins += 10;
        coinsEl.textContent = "Coins: $" + coins;
    } else {
        message = "You're out of the game!";
        isAlive = false;
        coins -= 10;
        coinsEl.textContent = "Coins: $" + coins;
    }
    messageEl.textContent = message;
}

function hit() {
    if (isAlive === true && hasBlackjack === false) {
        console.log("SYSTEM: Drawing a new card from the deck.");
        let playerCard = getRandomCard();
        playerSum += playerCard;
        playerCards.push(playerCard);
        let dealerCard = getRandomCard();
        dealerSum += dealerCard;
        dealerCards.push(dealerCard);
        renderGame();
    }
}

function stand() {
    if (isAlive === true && hasBlackjack === false) {
        console.log("SYSTEM: Stand.");
        isAlive = false;
        // dealer (background)
        for (let i = 0; i < dealerCards.length; i++) {
            if (i === 0) {
                dealerCardsEl.textContent = "Dealer's Cards: " + dealerCards[i];
            } else {
                dealerCardsEl.textContent += " ";
                dealerCardsEl.textContent += dealerCards[i];
            }
        }
        dealerSumEl.textContent = "Dealer's Sum: " + dealerSum;
        // ---------------------
        if (dealerSum > 21) {
            message = "You won!";
            coins += 10;
            coinsEl.textContent = "Coins: $" + coins;
        } else if (dealerSum > playerSum) {
            message = "You're out of the game!";
            coins -= 10;
            coinsEl.textContent = "Coins: $" + coins;
        } else if (dealerSum === playerSum) {
            message = "Draw!"
        } else {
            message = "You won!";
            coins += 10;
            coinsEl.textContent = "Coins: $" + coins;
        }
        messageEl.textContent = message;
    }
}

function getRandomCard() {
    console.log("SYSTEM: Getting random card.")
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}