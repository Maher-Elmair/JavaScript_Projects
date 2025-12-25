const hole = document.getElementById("hole");
const obstacle = document.getElementById("obstacle");
const bird = document.getElementById("bird");
const scoreElement = document.getElementById("score")
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");
let score = 0;
let isPaused = false;
let isGameStarted = false;
let isJumping = false;

function play() {
    isGameStarted = true;
    playBtn.style.display = "none";
    hole.style.display = "block";
    obstacle.style.display = "block";
    bird.style.display = "block";
    scoreElement.style.display = "block";
    pauseBtn.style.display = "block";
    restartBtn.style.display = "block";
}
function pause() {
    if (!isGameStarted) return
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
    pauseBtn.style.backgroundColor = isPaused ? "darkred" : "#4caf50";
    obstacle.style.animationPlayState = isPaused ? "paused" : "running";
    hole.style.animationPlayState = isPaused ? "paused" : "running";
}
playBtn.addEventListener("click", play)
pauseBtn.addEventListener("click", pause)

restartBtn.addEventListener("click", () => {
    location.reload()
})
//set random hole every animation loop
hole.addEventListener('animationiteration', () => {
    if (!isGameStarted || isPaused) return;
    let rand = Math.random() * (500 - 150);
    hole.style.top = rand + "px";
    score++;
    scoreElement.innerHTML = `Score: ${score}`
})

// Jumping

document.addEventListener("keydown", (event) => {
    if (!isGameStarted || isPaused) return;
    if (event.code === "Space") jump();
});

document.addEventListener("click", () => {
    if (!isGameStarted || isPaused) return;
    jump();
});

function jump() {
    if (!isGameStarted || isPaused) return;

    isJumping = true;
    let jumpTimer = 0;

    let jumpInterval = setInterval(() => {
        if (!isGameStarted || isPaused) return;
        jumpTimer++;
        let birdTop = parseInt(getComputedStyle(bird).getPropertyValue("top"));
        if (birdTop > 0 && jumpTimer < 15) {
            bird.style.top = birdTop - 5 + "px";
        }
        if (jumpTimer > 20) {
            clearInterval(jumpInterval);
            isJumping = false;
            jumpTimer = 0;
        }
    }, 10);
}

setInterval(() => {
    if (!isGameStarted || isPaused) return;
    //apply gravity to bird
    let birdTop = parseInt(getComputedStyle(bird).getPropertyValue("top"));
    if (!isJumping) {
        bird.style.top = birdTop + 3 + "px"
    }
    let obstacleLeft = parseInt(getComputedStyle(obstacle).getPropertyValue("left"))
    let holeTop = parseInt(getComputedStyle(hole).getPropertyValue("top"))
    // game over
    if (
        birdTop > 480 ||
        (obstacleLeft < 29 && (birdTop > holeTop + 150 || birdTop < holeTop))
    ) {
        alert(`Game Over. Your Score: ${score}`)
        bird.style.top = 100 + "px";
        obstacle.style.left = "100%";
        hole.style.left = "100%";
        score = 0;
        location.reload()
    }
}, 10)