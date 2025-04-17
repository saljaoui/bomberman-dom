const gameState = {
    level: 1,
    gameOver: false,
    isPaused: false,

    player: {
        x: 1,
        y: 1,
        bombsPlaced: 0,
        bombPower: 1,
        positionX: 52,
        positionY: 0,
        width: 22,
        height: 40,
        lives: 3,
        speed: 7,
        isMoving: false,
        isDead: false,
        direction: 'up',
        style: new Image().src = "assets/images/playerStyle.png"
    },

    bombs: [
        {
            x: 3,
            y: 3,
            timer: 3,
            power: 1,
            owner: 'player',
        }
    ],

    enemies: [
        {
            // enemie wa7d 1
        }
        // more enemies hna 

    ],

    walls: [
        {
            x: 0,
            y: 0,
            type: 'indestructible' // mat9sch thdmo be bombs
        },
        {
            x: 0,
            y: 0,
            type: 'destructible' // t9d tdmro be bombs
        }
        // more walls hena
    ],

    levelData: {
        template: [
            ['W', 'W', 'W', ' ', 'B', 'B', 'B'],
            ['W', ' ', ' ', ' ', 'B', ' ', ' '],
            ['W', 'W', 'W', ' ', 'B', 'B', 'B'],  // S
            [' ', ' ', 'W', ' ', ' ', ' ', 'B'],
            ['W', 'W', 'W', ' ', 'B', 'B', 'B'],
        ],
        timeElapsed: 0
    }
};

let app = document.getElementById('game');
let player = document.createElement('div');
player.id = 'player'
app.appendChild(player)

gameState.player.style = "assets/images/playerStyle.png"

function game() {
    drwaPlayer()
    requestAnimationFrame(game)
}

game();












function drwaPlayer() {
    let player = document.getElementById('player');
    player.style.position = 'absolute';
    player.style.width = gameState.player.width + 'px';
    player.style.height = gameState.player.height + 'px';
    player.style.backgroundImage = `url(${gameState.player.style})`;
    player.style.backgroundPositionY = gameState.player.positionY + 'px';
    player.style.backgroundPositionX = gameState.player.positionX + 'px';
    player.style.transform = `translate(${gameState.player.x}px, ${gameState.player.y}px)`;
}
function setupPlayerControls() {
    let keysPressed = {};
    let movementStartTime = null;
    let lastUpdateTime = Date.now();

    const spriteMap = {
        up: [
            { x: 55, y: 82 },
            { x: 28, y: 82 },
            { x: 55, y: 82 },
            { x: 81, y: 82 },
        ],
        right: [
            { x: 30, y: 41 },
            { x: 55, y: 41 },
            { x: 30, y: 41 }, // pic 1
            { x: -5, y: 41 },  // pic 2
            
        ],
        down: [
            { x: 52, y: 0 },
            { x: 27, y: 0 },
            { x: 52, y: 0 },
            { x: 78, y: 0 }

        ],
        left: [
            { x: -5, y: 124 },
            { x: 30, y: 124 },
            { x: -5, y: 124 },
            { x: 82, y: 124 },

        ]
    };

    addEventListener('keydown', (e) => {
        keysPressed[e.key] = true;
    });

    addEventListener('keyup', (e) => {
        keysPressed[e.key] = false;
    });

    function updatePlayerMovement() {
        const now = Date.now();
        const deltaTime = (now - lastUpdateTime) / 100; // Convert to seconds
        lastUpdateTime = now;

        const player = gameState.player;
        player.isMoving = false;

        if (keysPressed['ArrowUp']) {
            player.y -= player.speed * deltaTime;
            player.direction = 'up';
            player.isMoving = true;
        }
        if (keysPressed['ArrowRight']) {
            player.x += player.speed * deltaTime;
            player.direction = 'right';
            player.isMoving = true;
        }
        if (keysPressed['ArrowDown']) {
            player.y += player.speed * deltaTime;
            player.direction = 'down';
            player.isMoving = true;
        }
        if (keysPressed['ArrowLeft']) {
            player.x -= player.speed * deltaTime;
            player.direction = 'left';
            player.isMoving = true;
        }

        if (player.isMoving) {
            if (!movementStartTime) movementStartTime = now;
            const elapsed = now - movementStartTime;
            const frameDuration = 200; // Time between animation frames (ms)
            
            const frames = spriteMap[player.direction];
            const frameIndex = Math.floor(elapsed / frameDuration) % frames.length;
            
            player.positionX = frames[frameIndex].x;
            player.positionY = frames[frameIndex].y;
        } else {
            if (movementStartTime) {
                const frames = spriteMap[player.direction];
                player.positionX = frames[0].x;
                player.positionY = frames[0].y;
                movementStartTime = null;
            }
        }

        const playerElement = document.getElementById('player');
        playerElement.style.transform = `translate(${player.x}px, ${player.y}px)`;

        requestAnimationFrame(updatePlayerMovement);
    }

    updatePlayerMovement();
}

setupPlayerControls();