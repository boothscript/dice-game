const rollButton = document.querySelector('#roll-btn');
const startAgainButton = document.querySelector('#start-again-btn');
const dice = document.querySelector('#dice');
let score;
let rollCount;
let scoreTarget;
let gameStatus;

window.addEventListener('load', () => {
  gameReset();
  updateUi();
});

rollButton.addEventListener('click', async () => {
  await rollDice();
  await updateUi();
});
startAgainButton.addEventListener('click', async () => {
  await gameReset();
  await updateUi();
});

function disableButtons(isDisabled) {
  rollButton.disabled = isDisabled;
  startAgainButton.disabled = isDisabled;
}

async function rollDice() {
  const diceNumber = Math.floor(Math.random() * 6 + 1);
  dice.className = `rolled-${diceNumber}`;
  updateGameState(diceNumber);
}

async function updateGameState(diceNumber) {
  rollCount++;
  if (diceNumber == 1) {
    gameStatus = 'looser';
  } else {
    score += diceNumber;
    if (score > 20) {
      gameStatus = 'winner';
    } else {
      gameStatus = 'ready';
    }
  }
}

async function updateUi() {
  switch (gameStatus) {
    case 'ready':
      document.querySelector('#score').innerHTML = `score: ${score}`;
      document.querySelector('#game-message').innerHTML = 'Roll the dice';
      startAgainButton.disabled = true;
      rollButton.disabled = false;
      break;
    case 'winner':
      document.querySelector('#score').innerHTML = `score: ${score}`;
      document.querySelector('#game-message').innerHTML =
        'You did it! Nice one';
      startAgainButton.disabled = false;
      rollButton.disabled = true;
      break;
    case 'looser':
      document.querySelector('#score').innerHTML = `score: ${score}`;
      document.querySelector('#game-message').innerHTML = 'Unlucky chump!';
      startAgainButton.disabled = false;
      rollButton.disabled = true;
      break;
  }
}

async function gameReset() {
  score = 0;
  rollCount = 0;
  scoreTarget = 20;
  gameStatus = 'ready';
  dice.className = `rolled-0`;
}
