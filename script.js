const rollButton = document.querySelector('#roll-btn');
const startAgainButton = document.querySelector('#start-again-btn');
const settingsButton = document.querySelector('#settings-button');
const saveTargetButton = document.querySelector('#save-target-button');
const targetInput = document.querySelector('#target-input');
const dice = document.querySelector('#dice');
let score;
let rollCount;
let scoreTarget;
let gameStatus;

window.addEventListener('load', () => {
  gameReset();
  updateUi();
});

rollButton.addEventListener('click', () => {
  rollDice();
  updateUi();
});
startAgainButton.addEventListener('click', () => {
  gameReset();
  updateUi();
});

settingsButton.addEventListener('click', () => {
  document.querySelector('#settings').classList.toggle('show');
});

saveTargetButton.addEventListener('click', (event) => {
  document.querySelector('#target-input').classList.remove('error');
  //   css magic to trigger a redraw and second animation
  void targetInput.offsetWidth;

  if (validateTarget(Number(targetInput.value))) {
    scoreTarget = targetInput.value;
    document.querySelector('#settings').classList.toggle('show');
  } else {
    document.querySelector('#target-input').classList.add('error');
  }
});

function disableButtons(isDisabled) {
  rollButton.disabled = isDisabled;
  startAgainButton.disabled = isDisabled;
}

function rollDice() {
  const diceNumber = Math.floor(Math.random() * 6 + 1);
  dice.className = `rolled-${diceNumber}`;
  updateGameState(diceNumber);
}

function updateGameState(diceNumber) {
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

function updateUi() {
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

function gameReset() {
  score = 0;
  rollCount = 0;
  scoreTarget = 20;
  gameStatus = 'ready';
  dice.className = `rolled-0`;
}

function validateTarget(targetScore) {
  return 100 > targetScore && targetScore < 1;
}
