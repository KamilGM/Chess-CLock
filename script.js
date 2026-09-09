const landingClockBtn = document.getElementById('landing-clock-btn');
const landingInfoBtn = document.getElementById('landing-info-btn');

const landingScreen = document.getElementById('landing-screen');
const infoScreen = document.getElementById('info-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const menuScreen = document.getElementById('menu-screen');
const customTimeScreen = document.getElementById('custom-time-screen');
const clockScreen = document.getElementById('clock-screen');
const gameOverScreen = document.getElementById('game-over-screen');

const startButton = document.getElementById('start-button');
const customTimeButton = document.getElementById('custom-time-button');
const backToMenuButton = document.getElementById('back-to-menu-button');
const backToLandingButton = document.getElementById('back-to-landing-button');

const customMinutesInput = document.getElementById('custom-minutes');
const customSecondsInput = document.getElementById('custom-seconds');

const player1Clock = document.getElementById('player1-clock');
const player2Clock = document.getElementById('player2-clock');

const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');

const gameOverTitle = document.getElementById('game-over-title');
const gameOverMessage = document.getElementById('game-over-message');
const gameOverResetButton = document.getElementById('game-over-reset-button');
const gameOverMenuButton = document.getElementById('game-over-menu-button');

let player1Time = 0;
let player2Time = 0;

let activePlayer = 1;
let timerInterval = null;
let isRunning = false;
let isPaused = false;

let selectedMinutes = 5;
let selectedSeconds = 0;

function showScreen(screen) {
    const screens = [
        landingScreen,
        infoScreen,
        welcomeScreen,
        menuScreen,
        customTimeScreen,
        clockScreen,
        gameOverScreen
    ];

    screens.forEach(function(currentScreen) {
        if (currentScreen) {
            currentScreen.style.display = 'none';
        }
    });

    if (screen) {
        screen.style.display = 'flex';
    }
}

function formatTime(totalSeconds) {
    totalSeconds = Math.max(0, Math.floor(totalSeconds));

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return String(minutes).padStart(2, '0') + ':' +
           String(seconds).padStart(2, '0');
}

function updateClockDisplay() {
    if (player1Clock) {
        player1Clock.textContent = formatTime(player1Time);
    }

    if (player2Clock) {
        player2Clock.textContent = formatTime(player2Time);
    }
}

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    isRunning = false;
}

function startTimer() {
    if (isRunning || isPaused) {
        return;
    }

    isRunning = true;

    timerInterval = setInterval(function() {
        if (activePlayer === 1) {
            player1Time--;

            if (player1Time <= 0) {
                player1Time = 0;
                updateClockDisplay();
                endGame(2);
                return;
            }
        } else {
            player2Time--;

            if (player2Time <= 0) {
                player2Time = 0;
                updateClockDisplay();
                endGame(1);
                return;
            }
        }

        updateClockDisplay();
    }, 1000);
}

function pauseGame() {
    if (!isRunning) {
        return;
    }

    stopTimer();
    isPaused = true;

    if (pauseButton) {
        pauseButton.textContent = 'Resume';
    }
}

function resumeGame() {
    if (!isPaused) {
        return;
    }

    isPaused = false;

    if (pauseButton) {
        pauseButton.textContent = 'Pause';
    }

    startTimer();
}

function resetGame() {
    stopTimer();

    isPaused = false;
    activePlayer = 1;

    player1Time = selectedMinutes * 60 + selectedSeconds;
    player2Time = selectedMinutes * 60 + selectedSeconds;

    updateClockDisplay();

    if (pauseButton) {
        pauseButton.textContent = 'Pause';
    }

    showScreen(clockScreen);
    startTimer();
}

function switchPlayer() {
    if (!isRunning || isPaused) {
        return;
    }

    stopTimer();

    if (activePlayer === 1) {
        activePlayer = 2;
    } else {
        activePlayer = 1;
    }

    startTimer();
}

function endGame(winner) {
    stopTimer();
    isPaused = false;

    if (winner === 1) {
        if (gameOverTitle) {
            gameOverTitle.textContent = 'Player 1 Wins!';
        }

        if (gameOverMessage) {
            gameOverMessage.textContent = 'Player 2 ran out of time.';
        }
    } else {
        if (gameOverTitle) {
            gameOverTitle.textContent = 'Player 2 Wins!';
        }

        if (gameOverMessage) {
            gameOverMessage.textContent = 'Player 1 ran out of time.';
        }
    }

    showScreen(gameOverScreen);
}

function startGame(minutes, seconds) {
    selectedMinutes = minutes;
    selectedSeconds = seconds;

    player1Time = minutes * 60 + seconds;
    player2Time = minutes * 60 + seconds;

    activePlayer = 1;
    isPaused = false;

    if (pauseButton) {
        pauseButton.textContent = 'Pause';
    }

    updateClockDisplay();
    showScreen(clockScreen);
    startTimer();
}

if (landingClockBtn) {
    landingClockBtn.addEventListener('click', function() {
        showScreen(welcomeScreen);
    });
}

if (landingInfoBtn) {
    landingInfoBtn.addEventListener('click', function() {
        showScreen(infoScreen);
    });
}

if (startButton) {
    startButton.addEventListener('click', function() {
        showScreen(menuScreen);
    });
}

if (customTimeButton) {
    customTimeButton.addEventListener('click', function() {
        showScreen(customTimeScreen);
    });
}

if (backToMenuButton) {
    backToMenuButton.addEventListener('click', function() {
        stopTimer();
        isPaused = false;
        showScreen(menuScreen);
    });
}

if (backToLandingButton) {
    backToLandingButton.addEventListener('click', function() {
        stopTimer();
        isPaused = false;
        showScreen(landingScreen);
    });
}

if (pauseButton) {
    pauseButton.addEventListener('click', function() {
        if (isPaused) {
            resumeGame();
        } else {
            pauseGame();
        }
    });
}

if (resetButton) {
    resetButton.addEventListener('click', function() {
        resetGame();
    });
}

if (gameOverResetButton) {
    gameOverResetButton.addEventListener('click', function() {
        resetGame();
    });
}

if (gameOverMenuButton) {
    gameOverMenuButton.addEventListener('click', function() {
        stopTimer();
        isPaused = false;
        showScreen(menuScreen);
    });
}

if (customTimeScreen) {
    const customStartButton = document.getElementById('custom-start-button');

    if (customStartButton) {
        customStartButton.addEventListener('click', function() {
            let minutes = parseInt(customMinutesInput?.value, 10);
            let seconds = parseInt(customSecondsInput?.value, 10);

            if (isNaN(minutes)) {
                minutes = 0;
            }

            if (isNaN(seconds)) {
                seconds = 0;
            }

            minutes = Math.max(0, minutes);
            seconds = Math.max(0, Math.min(59, seconds));

            if (minutes === 0 && seconds === 0) {
                minutes = 1;
            }

            startGame(minutes, seconds);
        });
    }
}

if (player1Clock) {
    player1Clock.addEventListener('click', function() {
        if (activePlayer === 1) {
            switchPlayer();
        }
    });

    player1Clock.addEventListener('touchstart', function(event) {
        event.preventDefault();

        if (activePlayer === 1) {
            switchPlayer();
        }
    }, { passive: false });
}

if (player2Clock) {
    player2Clock.addEventListener('click', function() {
        if (activePlayer === 2) {
            switchPlayer();
        }
    });

    player2Clock.addEventListener('touchstart', function(event) {
        event.preventDefault();

        if (activePlayer === 2) {
            switchPlayer();
        }
    }, { passive: false });
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (clockScreen && clockScreen.style.display !== 'none') {
            event.preventDefault();

            if (isPaused) {
                resumeGame();
            } else {
                pauseGame();
            }
        }
    }

    if (event.key === 'r' || event.key === 'R') {
        if (clockScreen && clockScreen.style.display !== 'none') {
            resetGame();
        }
    }
});

document.addEventListener('contextmenu', function(event) {
    if (clockScreen && clockScreen.style.display !== 'none') {
        event.preventDefault();
    }
});

document.addEventListener('touchmove', function(event) {
    if (clockScreen && clockScreen.style.display !== 'none') {
        event.preventDefault();
    }
}, { passive: false });

window.addEventListener('load', function() {
    showScreen(landingScreen);
});
