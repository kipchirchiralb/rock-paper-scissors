// lets get all needed variables
const winner = document.querySelector("#winner");
const computerField = document.querySelector("#computers-play-ground");
const myField = document.querySelector("#my-play-ground");
const scoresEl = document.querySelector(".rounds");
const scoreBoardEl = document.querySelector(".score-board");
const endResult = document.querySelector(".end-result");
const myChoices = document.querySelectorAll(".choice");
const restartBtn = document.querySelector("#restart-btn");
let computerWins = 0;
let myWins = 0;
let isGameOn = false;
let rounds = 0;
let roundWinner = "";
let choices = ["rock", "paper", "scissors"];
const computer = () => choices[Math.floor(Math.random() * 3)];

// listen for choices made by a player through clicks to start game
myChoices.forEach((choice) => {
  choice.addEventListener("click", startGame);
});
// listen for restart button click
restartBtn.addEventListener("click", restartGame);

// the functions
function startGame(e) {
  rounds++;
  if (rounds > 3) {
    restartGame();
  }
  let myChoice = e.target.getAttribute("alt");
  let computersChoice = computer();
  myField.setAttribute("src", "rock-left.png");
  computerField.setAttribute("src", "rock-right.png");
  computerField.classList.add("bounce");
  myField.classList.add("bounce");

  function updateFields() {
    rockPaperScissors(myChoice, computersChoice);
    computerField.classList.remove("bounce");
    myField.classList.remove("bounce");
    if (rounds === 1) {
      document.querySelector("#round-one").textContent = roundWinner;
    } else if (rounds === 2) {
      document.querySelector("#round-two").textContent = roundWinner;
    } else if (rounds === 3) {
      document.querySelector("#round-three").textContent = roundWinner;
      setTimeout(endGame, 500);
      setTimeout(restartGame, 15000);
    }
  }
  setTimeout(updateFields, 1000);
}

function endGame() {
  scoresEl.classList.add("hide");
  scoreBoardEl.classList.add("hide");
  endResult.classList.remove("hide");
  if (myWins > computerWins) {
    document.querySelector("#game-winner").children[0].innerHTML =
      "Congratulations<br> You won";
    document.querySelector("#game-winner-text").style.backgroundColor = "green";
  } else if (computerWins > myWins) {
    document.querySelector("#game-winner").children[0].innerHTML =
      "Sorry<br> You lost";
    document.querySelector("#game-winner-text").style.backgroundColor =
      "#f32d13";
  } else {
    document.querySelector("#game-winner").children[0].innerHTML =
      "That was a Tie<br> Play again";
    document.querySelector("#game-winner-text").style.backgroundColor =
      "#c49e23";
  }
}

function restartGame() {
  isGameOn = false;
  location.reload();
}

function fillChoices(mychoice, computer) {
  myField.setAttribute("src", `${mychoice}-left.png`);
  computerField.setAttribute("src", `${computer}-right.png`);
}

// paper beats rock
// scissors beats paper
// rock beats scissors
function rockPaperScissors(mychoice, computer) {
  if (mychoice === computer) {
    winner.textContent = "DRAW!";
    winner.className = "draw";
    fillChoices(mychoice, computer);
    roundWinner = "draw";
  } else if (mychoice === "rock" && computer === "paper") {
    winner.textContent = "You Lost";
    winner.className = "lost";
    fillChoices(mychoice, computer);
    roundWinner = "computer";
    computerWins++;
  } else if (mychoice === "paper" && computer === "rock") {
    winner.textContent = "You won";
    winner.className = "won";
    fillChoices(mychoice, computer);
    roundWinner = "you";
    myWins++;
  } else if (mychoice === "paper" && computer === "scissors") {
    winner.textContent = "You Lost";
    winner.className = "lost";
    fillChoices(mychoice, computer);
    roundWinner = "computer";
    computerWins++;
  } else if (mychoice === "scissors" && computer === "paper") {
    winner.textContent = "You won";
    winner.className = "won";
    fillChoices(mychoice, computer);
    roundWinner = "you";
    myWins++;
  } else if (mychoice === "scissors" && computer === "rock") {
    winner.textContent = "You Lost";
    winner.className = "lost";
    fillChoices(mychoice, computer);
    roundWinner = "computer";
    computerWins++;
  } else if (mychoice === "rock" && computer === "scissors") {
    winner.textContent = "You win";
    winner.className = "won";
    fillChoices(mychoice, computer);
    roundWinner = "you";
    myWins++;
  } else {
    console.log("error ocured");
    roundWinner = "no winner";
  }
}
