const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400; // Canvas width
canvas.height = 400; // Canvas height

let snake = [{ x: 10, y: 10 }];
let food = { x: 0, y: 0 };
let score = 0;
let direction = { x: 0, y: 0 };
let gameOver = false;

const colors = ['#8A2BE2', '#7FFF00', '#FF00FF', '#00FFFF', '#FF4500'];
let currentFoodColor = 0;

function randomPosition() {
    return Math.floor(Math.random() * 20) * 20;
}

function spawnFood() {
    food.x = randomPosition();
    food.y = randomPosition();
}

function changeFoodColor() {
    currentFoodColor = (currentFoodColor + 1) % colors.length;
}

function drawSnake() {
    snake.forEach((segment) => {
        ctx.fillStyle = 'blue';
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });
}

function drawFood() {
    ctx.fillStyle = colors[currentFoodColor];
    ctx.fillRect(food.x, food.y, 20, 20);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x * 20, y: snake[0].y + direction.y * 20 };
    
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').textContent = score;
        spawnFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || 
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
        document.getElementById('game-over').style.display = 'block';
    }
}

function update() {
    if (gameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    moveSnake();
    checkCollision();
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            direction = { x: 1, y: 0 };
            break;
    }
});

function startGame() {
    spawnFood();
    setInterval(() => {
        if (!gameOver) {
            update();
        }
    }, 100);
    setInterval(changeFoodColor, 3000); // Change food color every 3 seconds
}

startGame();
