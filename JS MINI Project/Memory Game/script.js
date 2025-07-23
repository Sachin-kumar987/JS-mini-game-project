const board = document.getElementById('game-board');
const winMessage = document.getElementById('win-message');
const winText = document.getElementById('win-text');
const timerDisplay = document.getElementById('timer');

const emojis = ['🐶', '🐱', '🐭', '🐹', '🦊', '🐻', '🐼', '🐨'];
let cards = [...emojis, ...emojis];
cards.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matched = 0;
let started = false;
let seconds = 0;
let timerInterval = null;

cards.forEach(emoji => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;
  card.textContent = '❓';

  card.addEventListener('click', () => {
    if (lockBoard || card === firstCard || card.classList.contains('matched')) return;

    if (!started) {
      startTimer();
      started = true;
    }

    card.textContent = emoji;
    card.classList.add('flipped');

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      lockBoard = true;

      if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matched += 2;
        resetTurn();

        if (matched === cards.length) {
          setTimeout(() => {
            clearInterval(timerInterval);
            winText.innerText = `🎉 You Win in ${seconds} seconds!`;
            winMessage.classList.remove('hidden');
          }, 500); // wait for last flip animation
        }
      } else {
        setTimeout(() => {
          firstCard.textContent = '❓';
          secondCard.textContent = '❓';
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          resetTurn();
        }, 800);
      }
    }
  });

  board.appendChild(card);
});

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = seconds;
  }, 1000);
}

function restartGame() {
  clearInterval(timerInterval);
  location.reload();
}
