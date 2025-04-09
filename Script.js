const gameBoard = document.getElementById("gameBoard");
const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");
const player1El = document.getElementById("player1");
const player2El = document.getElementById("player2");

const cards = ['🍎', '🍌', '🍇', '🍓', '🍍'];
let deck = [...cards, ...cards];

let flippedCards = [];
let matched = [];
let currentPlayer = 1;
let scores = { 1: 0, 2: 0 };

deck = deck.sort(() => 0.5 - Math.random());

deck.forEach((item, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = item;
  card.dataset.index = index;
  card.innerText = item;
  card.style.opacity = "1";
  gameBoard.appendChild(card);
  card.addEventListener("click", handleFlip);
});

function handleFlip(e) {
  const card = e.currentTarget;

  if (
    flippedCards.length >= 2 ||
    card.classList.contains("flipped") ||
    card.classList.contains("matched")
  ) return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add("matched");
    card2.classList.add("matched");

    scores[currentPlayer]++;
    updateScores();
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    togglePlayer();
  }

  flippedCards = [];

  if (document.querySelectorAll(".matched").length === deck.length) {
    setTimeout(() => {
      alert(`Jogo encerrado!\nPlayer 1: ${scores[1]} | Player 2: ${scores[2]}`);
    }, 500);
  }
}

function updateScores() {
  score1El.innerText = scores[1];
  score2El.innerText = scores[2];
}

function togglePlayer() {
  player1El.classList.toggle("active");
  player2El.classList.toggle("active");
}
