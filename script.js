const landingScreen = document.getElementById("landing-screen");
const infoScreen = document.getElementById("info-screen");
const welcomeScreen = document.getElementById("welcome-screen");
const menuScreen = document.getElementById("menu-screen");
const customScreen = document.getElementById("custom-screen");
const clockScreen = document.getElementById("clock-screen");
const gameoverScreen = document.getElementById("gameover-screen");

const landingClockBtn = document.getElementById("landing-clock-btn");
const landingInfoBtn = document.getElementById("landing-info-btn");

const infoBackBtn = document.getElementById("info-back-btn");

const welcomeContinueBtn = document.getElementById("welcome-continue-btn");

const customTimeBtn = document.getElementById("custom-time-btn");
const menuBackBtn = document.getElementById("menu-back-btn");

const customStartBtn = document.getElementById("custom-start-btn");
const customBackBtn = document.getElementById("custom-back-btn");

const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

const gameoverResetBtn = document.getElementById("gameover-reset-btn");
const gameoverMenuBtn = document.getElementById("gameover-menu-btn");

const clock1 = document.getElementById("clock-1");
const clock2 = document.getElementById("clock-2");

const player1 = document.getElementById("player-1");
const player2 = document.getElementById("player-2");

const gameoverMessage = document.getElementById("gameover-message");

const timeButtons = document.querySelectorAll(".time-btn");

let player1Time = 600;
let player2Time = 600;

let increment = 0;
let activePlayer = 1;
let timer = null;
let gameRunning = false;
let gamePaused = false;

function showScreen(screen) {
    document.querySelectorAll(".screen").forEach((item) => {
        item.classList.remove("active");
    });

    screen.classList.add("active");
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );
}

function updateClocks() {
    clock1.textContent = formatTime(player1Time);
    clock2.textContent = formatTime(player2Time);
}

function updateActivePlayer() {
    player1.classList.remove("active-player");
    player2.classList.remove("active-player");

    if (activePlayer === 1) {
        player1.classList.add("active-player");
    } else {
        player2.classList.add("active-player");
    }
}

function startTimer() {
    clearInterval(timer);

    gameRunning = true;
    gamePaused = false;

    timer = setInterval(() => {

        if (!gameRunning || gamePaused) {
            return;
        }

        if (activePlayer === 1) {
            player1Time--;

            if (player1Time <= 0) {
                player1Time = 0;
                endGame(2);
            }
        } else {
            player2Time--;

            if (player2Time <= 0) {
                player2Time = 0;
                endGame(1);
            }
        }

        updateClocks();

    }, 1000);
}

function switchPlayer() {

    if (!gameRunning || gamePaused) {
        return;
    }

    if (activePlayer === 1) {
        player1Time += increment;
        activePlayer = 2;
    } else {
        player2Time += increment;
        activePlayer = 1;
    }

    updateClocks();
    updateActivePlayer();
}

function startGame(minutes, seconds, gameIncrement) {

    clearInterval(timer);

    player1Time = minutes * 60 + seconds;
    player2Time = minutes * 60 + seconds;

    increment = gameIncrement;

    activePlayer = 1;
    gameRunning = true;
    gamePaused = false;

    updateClocks();
    updateActivePlayer();

    showScreen(clockScreen);

    startTimer();
}

function endGame(winner) {

    clearInterval(timer);

    gameRunning = false;
    gamePaused = false;

    gameoverMessage.textContent =
        "Player " + winner + " wins!";

    showScreen(gameoverScreen);
}

landingClockBtn.addEventListener("click", () => {
    showScreen(welcomeScreen);
});

landingInfoBtn.addEventListener("click", () => {
    showScreen(infoScreen);
});

infoBackBtn.addEventListener("click", () => {
    showScreen(landingScreen);
});

welcomeContinueBtn.addEventListener("click", () => {
    showScreen(menuScreen);
});

menuBackBtn.addEventListener("click", () => {
    showScreen(landingScreen);
});

customTimeBtn.addEventListener("click", () => {
    showScreen(customScreen);
});

customBackBtn.addEventListener("click", () => {
    showScreen(menuScreen);
});

timeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const minutes = Number(button.dataset.minutes);

        startGame(minutes, 0, 0);

    });

});

customStartBtn.addEventListener("click", () => {

    const minutes =
        Number(document.getElementById("custom-minutes").value) || 0;

    const seconds =
        Number(document.getElementById("custom-seconds").value) || 0;

    const customIncrement =
        Number(document.getElementById("custom-increment").value) || 0;

    if (minutes < 1 && seconds < 1) {
        return;
    }

    startGame(minutes, seconds, customIncrement);

});

player1.addEventListener("click", () => {

    if (activePlayer === 1) {
        switchPlayer();
    }

});

player2.addEventListener("click", () => {

    if (activePlayer === 2) {
        switchPlayer();
    }

});

pauseBtn.addEventListener("click", () => {

    if (!gameRunning) {
        return;
    }

    gamePaused = !gamePaused;

    pauseBtn.textContent = gamePaused
        ? "Resume"
        : "Pause";

});

resetBtn.addEventListener("click", () => {

    clearInterval(timer);

    player1Time = player1Time;
    player2Time = player2Time;

    activePlayer = 1;
    gameRunning = true;
    gamePaused = false;

    updateClocks();
    updateActivePlayer();

    pauseBtn.textContent = "Pause";

    startTimer();

});

gameoverResetBtn.addEventListener("click", () => {

    showScreen(menuScreen);

});

gameoverMenuBtn.addEventListener("click", () => {

    clearInterval(timer);

    gameRunning = false;
    gamePaused = false;

    showScreen(landingScreen);

});

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

document.addEventListener("touchstart", (event) => {

    if (event.touches.length > 1) {
        event.preventDefault();
    }

}, { passive: false });

document.addEventListener("touchmove", (event) => {
    event.preventDefault();
}, { passive: false });

document.addEventListener("touchend", (event) => {

    if (event.touches.length > 0) {
        event.preventDefault();
    }

}, { passive: false });

updateClocks();
updateActivePlayer();
showScreen(landingScreen);
