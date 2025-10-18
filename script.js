let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// New elements for the welcome screen
let welcomeScreen = document.querySelector(".welcome-screen");
let playBtn = document.querySelector("#play-btn");
let gameScreen = document.querySelector(".game-screen"); // The container for your actual game

let turnO = true; // playerX, playerO
let count = 0; // To track draw condition

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { // playerO
            box.innerText = "O";
            box.classList.add("o");
            turnO = false;
        } else { // playerX
            box.innerText = "X";
            box.classList.add("x");
            turnO = true;
        }
        box.disabled = true;
        count++;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x", "o");
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return; // Stop checking if a winner is found
            }
        }
    }

    // If the loop completes and no winner is found, check for a draw
    if (count === 9) {
        gameDraw();
    }
};

// Event listener for the Play button
playBtn.addEventListener("click", () => {
    welcomeScreen.style.opacity = '0'; // Start fading out
    setTimeout(() => {
        welcomeScreen.classList.add("hide"); // Hide completely after fade
        gameScreen.style.display = 'block'; // Show the game screen
    }, 500); // Match this timeout to the CSS transition duration
});


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);