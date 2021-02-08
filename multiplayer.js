const rollButton = document.querySelector("#roll-dice-button");
const newGameButton = document.querySelector("#new-game-button");
const holdButton = document.querySelector("#hold-button");
const settingsButton = document.querySelector("#settings-button");
const saveTargetButton = document.querySelector("#save-target-button");
const targetInput = document.querySelector("#target-input");
const dice = document.querySelector("#dice");
const player1NameElement = document.querySelector("#player1 p.player-name");
const player1ScoreElement = document.querySelector("#player1 p.player-score");
const player1CurrentElement = document.querySelector(
  "#player1 p.player-current-score"
);
const player2NameElement = document.querySelector("#player2 p.player-name");
const player2ScoreElement = document.querySelector("#player2 p.player-score");
const player2CurrentElement = document.querySelector(
  "#player2 p.player-current-score"
);
const activeRollerId = document.querySelector("#player-id");
const initialState = {
  status: "ready",
  scoreTarget: 20,
  activeRoller: "player1",
  player1: {
    score: 0,
    current: 0,
    winner: false,
  },
  player2: {
    score: 0,
    current: 0,
    winner: false,
  },
  diceValue: 0,
};
let gameState;
// gameState is populated from initial state using resetState function below

// EVENT HANDLERS ----
newGameButton.addEventListener("click", () => {
  updateGameState("reset");
  updateUi();
});
rollButton.addEventListener("click", () => {
  updateGameState("diceRolled");
  updateUi();
});
holdButton.addEventListener("click", () => {
  updateGameState("hold");
  updateUi();
});
settingsButton.addEventListener("click", () => {
  document.querySelector("#settings").classList.toggle("show");
});
saveTargetButton.addEventListener("click", (event) => {
  document.querySelector("#target-input").classList.remove("error");
  //   css magic to trigger a redraw and second animation
  void targetInput.offsetWidth;

  if (validateTarget(Number(targetInput.value))) {
    gameStatus.scoreTarget = targetInput.value;
    document.querySelector("#settings").classList.toggle("show");
  } else {
    document.querySelector("#target-input").classList.add("error");
  }
});

// END OF EVENT HANDLERS

// GAME LOGIC --------

function updateGameState(action) {
  const { activeRoller } = gameState;
  console.log(activeRoller);
  console.log("test", gameState[activeRoller]);
  switch (action) {
    case "diceRolled":
      gameState.diceValue = Math.floor(Math.random() * 6 + 1);
      if (gameState.diceValue === 1) {
        gameState[activeRoller].current = 0;
        gameState.activeRoller =
          activeRoller === "player1" ? "player2" : "player1";
      } else {
        gameState[activeRoller].current += gameState.diceValue;
      }
      break;
    case "hold":
      gameState[activeRoller].score += gameState[activeRoller].current;
      gameState[activeRoller].current = 0;
      gameState.activeRoller =
        activeRoller === "player1" ? "player2" : "player1";
      break;
    case "reset":
      resetState();
      console.log(gameState);
      break;
    default:
      throw new Error(`Unknown action called: ${action}`);
  }

  if (checkForWinner()) {
    gameState.status = "result";
  }
}

function updateUi() {
  const { player1, player2, diceValue, status, activeRoller } = gameState;
  player1ScoreElement.innerHTML = player1.score;
  player1CurrentElement.innerHTML = player1.current;
  player2ScoreElement.innerHTML = player2.score;
  player2CurrentElement.innerHTML = player2.current;
  dice.className = `rolled-${diceValue}`;
  activeRollerId.className = activeRoller;

  if (status === "playing") {
    holdButton.disabled = false;
    rollButton.disabled = false;
    player1NameElement.innerHTML = "Player1";
    player2NameElement.innerHTML = "Player2";
  }
  if (status === "result") {
    holdButton.disabled = true;
    rollButton.disabled = true;
    if (player1.winner) {
      player1NameElement.innerHTML = "Winner";
    }
    if (player2.winner) {
      player2NameElement.innerHTML = "Winner";
    }
  }
}

function checkForWinner() {
  const { player1, player2, scoreTarget } = gameState;
  for (const player of [player1, player2]) {
    player.winner = player.score >= scoreTarget;
  }
  return player1.winner || player2.winner;
}

window.addEventListener("load", () => {
  resetState();
  updateUi();
});

function resetState() {
  gameState = {
    ...initialState,
    player1: { ...initialState.player1 },
    player2: { ...initialState.player2 },
  };
}
//  END OF GAME LOGIC
