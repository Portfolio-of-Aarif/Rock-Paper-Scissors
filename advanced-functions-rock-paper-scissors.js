let scores = {
    win: 0,
    lose: 0,
    tie: 0,
    rounds: 0,
};

let totalRounds =''; // Default to 10 rounds

updatescore();

function setTotalRounds(rounds) {
    totalRounds = rounds;
    scores.rounds = 0;
    reset();
}

function playermove(usermove) {
    if (scores.rounds === totalRounds) {
        // Game over after the specified number of rounds
        showOverallResult();
        return;
    }

    let compare = move();
    let result;

    if (usermove === compare) {
        result = "Tie";
        scores.tie++;
    } else if (
        (usermove === "rock" && compare === "scissors") ||
        (usermove === "scissors" && compare === "paper") ||
        (usermove === "paper" && compare === "rock")
    ) {
        result = "You won";
        scores.win++;
    } else {
        result = "You lose";
        scores.lose++;
    }

    scores.rounds++;

    localStorage.setItem("scores", JSON.stringify(scores));

    updatescore();
    showResult(result, usermove, compare);

    if (scores.rounds === totalRounds) {
        // Game over after the specified number of rounds
        showOverallResult();
    }
}

function move() {
    const random = Math.random();
    let compare;
    if (random >= 0 && random < 1 / 3) {
        compare = "rock";
    } else if (random >= 1 / 3 && random < 2 / 3) {
        compare = "scissors";
    } else {
        compare = "paper";
    }
    return compare;
}

function reset() {
    scores.win = 0;
    scores.lose = 0;
    scores.tie = 0;
    scores.rounds = 0;

    localStorage.removeItem("scores");

    updatescore();
    document.querySelector(".js-output").style.display = "none";
    document.querySelector(".js-result").style.display = "none";


}
  


function updatescore() {
    document.querySelector(".js-score").innerHTML = `Wins: ${scores.win}, Losses: ${scores.lose}, Ties: ${scores.tie}, Rounds: ${scores.rounds}/${totalRounds}`;
}

function showResult(result, usermove, compare) {
    document.querySelector(".js-output").style.display = "block";
    document.querySelector(".js-result").style.display = "block";

    document.querySelector(".js-result").innerHTML = result;
    document.querySelector(
        ".js-output"
    ).innerHTML = `You <img class="imageicon" src="${usermove}-emoji.png"> &nbsp; Computer <img class="imageicon" src="${compare}-emoji.png">`;
}

function showOverallResult() {
    let overallResult;
    if (scores.win > scores.lose) {
        overallResult = "You won overall!";
    } else if (scores.win < scores.lose) {
        overallResult = "You lost overall.";
    } else {
        overallResult = "It's a tie overall.";
    }

    document.querySelector(".js-result").style.display = "block";
    document.querySelector(".js-output").style.display = "none";
    document.querySelector(".js-result").innerHTML = overallResult;
}

function playAgain() {
    scores.win = 0;
    scores.lose = 0;
    scores.tie = 0;
    scores.rounds = 0;

    localStorage.removeItem("scores");

    updatescore();

    document.querySelector(".js-output").style.display = "none";
    document.querySelector(".js-result").style.display = "none";
}

function startGame() {
    const roundsInput = document.getElementById("roundsInput");
    const rounds = parseInt(roundsInput.value, 10);
    if (!isNaN(rounds) && rounds > 0) {
        setTotalRounds(rounds);
    } else {
        alert("Please enter a valid number of rounds.");
    }
    document.querySelector(".js-round").value = "";
}


function enterkey(event) {
    if(event.key==='Enter')
    startGame();
}
