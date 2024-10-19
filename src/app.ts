const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

ctx!.fillStyle = 'white';
ctx!.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;
const jumpSpeed = -10;
const dashDistance = 100;
let isJumping = false;
let isGrounded = true;
let isDashing = false;


const player = {
    x: 50,                      // Initial X position
    y: canvas.height - 100,     // Initial Y position (bottom of canvas)
    width: 50,                  // Player width
    height: 100,                // Player height
    color: 'blue',              // Player color
    speed: 5,                   // Movement speed
    dashSpeed: 20,              // Dash speed
    facingDirection: 'right',   // Track which direction player is facing
    dashTargetX: 0,             // Where dash ends
    dx: 0,                      // Delta X (for horizontal movement)
    dy: 0                       // Delta Y (if needed for vertical movement)
};

function drawPlayer() {
    ctx!.fillStyle = player.color;
    ctx!.fillRect(player.x, player.y, player.width, player.height);
}

function updatePlayerPosition() {
    if (isDashing) {
        if ((player.facingDirection === 'right' && player.x < player.dashTargetX) ||
            (player.facingDirection === 'left' && player.x > player.dashTargetX)) {
            player.x += (player.facingDirection === 'right' ? player.dashSpeed : -player.dashSpeed);
        } else {
            // Stop dashing when the target position is reached
            isDashing = false;
            player.dx = 0;  // Stop horizontal movement
        }
    }

    if (!isDashing) {
        player.x += player.dx;
        player.y += player.dy;

        if (!isGrounded) {
            player.dy += gravity;
        }
    }

    if (player.x < 0 ) {
        player.x = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width
    }

    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        isGrounded = true;
        isJumping = false;
    }
}

function clearCanvas() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
}

function logCurrentPlayerProperties() {
    document.getElementById('x-position')!.textContent = player.x.toString();
    document.getElementById('y-position')!.textContent = player.y.toString();
    document.getElementById('dx-position')!.textContent = player.dx.toString();
    document.getElementById('dy-position')!.textContent = player.dy.toString();
}

function gameLoop() {
    clearCanvas();
    updatePlayerPosition();
    drawPlayer();
    logCurrentPlayerProperties();

    requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        player.dx = player.speed;
        player.facingDirection = 'right';
    }

    if (event.key === 'ArrowLeft') {
        player.dx = -player.speed;
        player.facingDirection = 'left';
    }

    if (event.key === 'Shift' && !isDashing) {
        isDashing = true;
        player.dashTargetX = player.x + (player.facingDirection === 'right' ? dashDistance : -dashDistance);
    }

    if (event.key === ' ') {
        if (!isJumping) {
            player.dy = jumpSpeed;
            isJumping = true;
            isGrounded = false;
        }
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        player.dx = 0;
    }
});
