const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 800;

ctx!.fillStyle = 'white';
ctx!.fillRect(0, 0, canvas.width, canvas.height);

const player = {
    x: 50,          // Initial X position
    y: canvas.height - 100,  // Initial Y position (bottom of canvas)
    width: 50,      // Player width
    height: 100,    // Player height
    color: 'blue',  // Player color
    speed: 5,       // Movement speed
    dx: 0,          // Delta X (for horizontal movement)
    dy: 0           // Delta Y (if needed for vertical movement)
};

function drawPlayer() {
    ctx!.fillStyle = player.color;
    ctx!.fillRect(player.x, player.y, player.width, player.height);
}

function updatePlayerPosition() {
    player.x += player.dx

    if (player.x < 0 ) {
        player.x = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width
    }
}

function clearCanvas() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
}

function logCurrentPlayerProperties() {
    console.log(`Player initial position ${player.x}`);
    console.log(`Player position difference ${player.dx}`);
}

function gameLoop() {
    clearCanvas();
    updatePlayerPosition();
    drawPlayer();
    logCurrentPlayerProperties();

    requestAnimationFrame(gameLoop)
}

gameLoop();

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        player.dx = player.speed;
    }

    if (event.key === 'ArrowLeft') {
        player.dx = -player.speed
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        player.dx = 0;
    }
})