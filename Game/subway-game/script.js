let player = document.getElementById("player")
let block = document.getElementById("block")
let scoreElement = document.getElementById("score")
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let restartBtn = document.getElementById("restartBtn");
score = 0;
let isPaused = false;
let isGameStarted = false;


function moveLeft() {
    if (!isGameStarted || isPaused) return;
    const curLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"))
    if (curLeft <= 0) return
    const nowLeft = curLeft - 100;
    player.style.left = nowLeft + "px";
}
function moveRight() {
    if (!isGameStarted || isPaused) return;
    const curRight = parseInt(window.getComputedStyle(player).getPropertyValue("left"))
    if (curRight >= 200) return
    const nowRight = curRight + 100;
    player.style.left = nowRight + "px"
}

function play() {
    isGameStarted = true;
    playBtn.style.display = "none";
    player.style.display = "block";
    block.style.display = "block";
    scoreElement.style.display = "block";
    pauseBtn.style.display = "block";
    restartBtn.style.display = "block";
}

function pause() {
    if (!isGameStarted) return
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
    block.style.animationPlayState = isPaused ? "paused" : "running";
}

playBtn.addEventListener("click", play);

pauseBtn.addEventListener("click", pause);

restartBtn.addEventListener("click", () => {
    location.reload();
});

document.addEventListener('keydown', (event) => {
    if (!isGameStarted && isPaused) return;
    if (event.key == "ArrowLeft") moveLeft();
    else if (event.key == "ArrowRight") moveRight()
    else if (event.key == "Enter") play()
    else if (event.code == "Space") pause()
})

game.addEventListener("click", (event) => {
    if (!isGameStarted || isPaused) return;
    const gameRect = game.getBoundingClientRect();
    const clickX = event.clientX - gameRect.left;

    if (clickX < gameRect.width / 2) {
        moveLeft(); // Clicked on the left side
    } else {
        moveRight(); // Clicked on the right side
    }
});

block.addEventListener("animationiteration", () => {
    if (isPaused) return;
    const randomPos = Math.floor(Math.random() * 3) * 100
    block.style.left = randomPos + "px"
    score++
    scoreElement.innerHTML = `Score: ${score}`
})

setInterval(() => {
    if (!isGameStarted || isPaused) return;
    let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"))
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"))
    let blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"))
    if (playerLeft == blockLeft && blockTop < 400 && blockTop > 220) {
        alert(`Game Over !!!!!!!!! \n Your Score: ${score}`)
        block.style.top = -100 + "px"
        score = 0;
        location.reload()
    }
}, 1)
