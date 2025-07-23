const words = [
  { word: "javascript", hint: "Popular programming language" },
  { word: "hangman", hint: "This game's name" },
  { word: "elephant", hint: "A large animal" },
  { word: "guitar", hint: "A musical instrument with strings" },
  { word: "pizza", hint: "Cheesy Italian dish" }
];

let selectedWord, correctLetters, wrongAttempts, maxTries;

const wordContainer = document.getElementById("word");
const keyboardContainer = document.getElementById("keyboard");
const hintEl = document.getElementById("hint");
const messageEl = document.getElementById("message");
const hangmanImg = document.getElementById("hangman-img");

// Pick a random word from the list
function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Create A-Z buttons dynamically
function createKeyboard() {
  keyboardContainer.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const btn = document.createElement("button");
    btn.textContent = String.fromCharCode(i);
    btn.onclick = () => handleGuess(btn.textContent.toLowerCase(), btn);
    keyboardContainer.appendChild(btn);
  }
}

// Display the current word with _ for missing letters
function displayWord() {
  wordContainer.innerHTML = selectedWord
    .split("")
    .map(letter => (correctLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

// Handle guess: check and update for correct or wrong guess
function handleGuess(letter, btn) {
  btn.disabled = true;

  if (selectedWord.includes(letter)) {
    correctLetters.push(letter);
  } else {
    wrongAttempts++;
    updateHangmanImage();
  }

  displayWord();
  checkGameOver();
}

// Update the hangman image based on number of wrong attempts
function updateHangmanImage() {
  hangmanImg.src = `./hangman/images/hangman-${wrongAttempts}.svg`;
}

// Check if the game is won or lost
function checkGameOver() {
  const isWin = selectedWord.split("").every(l => correctLetters.includes(l));
  const isLose = wrongAttempts >= maxTries;

  if (isWin) {
    messageEl.textContent = "  😊 You Won!";
    disableAllButtons();
  } else if (isLose) {
    messageEl.textContent = `😢 You Lost! Word was: ${selectedWord}`;
    disableAllButtons();
  }
}

// Disable all keyboard buttons after game over
function disableAllButtons() {
  const buttons = document.querySelectorAll("#keyboard button");
  buttons.forEach(btn => (btn.disabled = true));
}

// Reset the game state
function resetGame() {
  const newWord = randomWord();
  selectedWord = newWord.word;
  hintEl.textContent = newWord.hint;
  correctLetters = [];
  wrongAttempts = 0;
  maxTries = 6;
  messageEl.textContent = "";
  hangmanImg.src = "./hangman/images/hangman-0.svg";
  createKeyboard();
  displayWord();
}

// Start the game for the first time
resetGame();
