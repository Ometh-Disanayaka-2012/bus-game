const busElm = document.getElementById('bus');
let topDiv = document.getElementById('top-div');
let bottomDiv = document.getElementById('bottom-div');
const hornElm = document.getElementById('hornelm');
const gameOverElm = document.getElementById('game-over-banner');
const scoreElm = document.getElementById('score');
const speed0Elm = document.getElementById('speed0Div');
const speed80Elm = document.getElementById('speed80Div');
const steeringWheel = document.getElementById('steering-wheel-div');

// const bgDivs = document.getElementsByClassName('background-div');
let score = 0;
let dx = 10;

let dy = 5;

let gameRunning = true;

addEventListener('keydown', (e) => {
    if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
        moveLeftOrRight(e.code === "ArrowLeft");
    }
    if (e.key === "ArrowUp") {
        moveForward();
    }
    if (e.code === "Space") {
        horn();
    }
});
let currentAngle = 0;

addEventListener('keyup', (e) => {

    if (e.key === "ArrowUp") {
        speed80Elm.style.visibility = 'hidden';
        speed0Elm.style.visibility = 'visible';
    }
    if(e.key==="ArrowLeft" || e.key==="ArrowRight"){
        currentAngle = 0;
        rotateSteeringWheel(currentAngle);
    }
});

function horn() {
    hornElm.play();
}

function moveLeftOrRight(left) {
    if (!gameRunning) return;
    if (left) {
        dx = -10;
        //rotate
        currentAngle -= 15; // Turn left
        rotateSteeringWheel(currentAngle);

    } else {
        dx = 10;
        //rotate
        currentAngle += 15; // Turn right
        rotateSteeringWheel(currentAngle);
    }
    busElm.style.left = `${busElm.offsetLeft + dx}px`;
    console.log(busElm.offsetLeft)
    if (busElm.offsetLeft < 620 || busElm.offsetLeft > 800) {
        gameOverElm.style.visibility = 'visible';
        gameRunning = false;
    }
}

function moveForward() {
    if (!gameRunning) return;
    topDiv.style.top = `${topDiv.offsetTop + dy}px`;
    bottomDiv.style.top = `${bottomDiv.offsetTop + dy}px`;

    scoreElm.innerText = `Score is ${score++}`

    speed80Elm.style.visibility = 'visible';
    speed0Elm.style.visibility = 'hidden';


    if (bottomDiv.offsetTop >= innerHeight) {
        bottomDiv.style.top = 0;
    }
    if (topDiv.offsetTop >= innerHeight) {
        topDiv.style.top = 0;
    }

}
// Function to rotate the steering wheel
function rotateSteeringWheel(angle) {
    steeringWheel.style.transform = `rotate(${angle}deg)`;
}