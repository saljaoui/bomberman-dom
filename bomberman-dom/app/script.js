
const gameState = {
    level: 1,
    gameOver: false,
    isPaused: false,
    player: {
        x: 1,
        y: 1,
        bombsPlaced: 0,
        bombPower: 1,
        positionX: 0,
        positionY: 0,
        width: 27,
        height: 41,
        lives: 3,
        speed: 2,
        isMoving: false,
        isDead: false,
        direction: 'up',
        style: new Image()
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

    addEventListener('keydown', (e) => {
        keysPressed[e.key] = true;
    });

    addEventListener('keyup', (e) => {
        keysPressed[e.key] = false;
    });

    function updatePlayerMovement() {
        if (keysPressed['ArrowUp']) {
            gameState.player.y -= gameState.player.speed;
            gameState.player.positionX = 56
            gameState.player.positionY = 82
            console.log('ArrowUp');
        }
        if (keysPressed['ArrowRight']) {
            gameState.player.x += gameState.player.speed;
            gameState.player.positionY = 42
            gameState.player.positionX = 30
            console.log('ArrowRight');
        }
        if (keysPressed['ArrowDown']) {
            gameState.player.y += gameState.player.speed;
            gameState.player.positionX = 53
            gameState.player.positionY = 0
            console.log('ArrowDown');
        }
        if (keysPressed['ArrowLeft']) {
            gameState.player.positionY = 124
            gameState.player.positionX = 0
            gameState.player.x -= gameState.player.speed;
            console.log('ArrowLeft');
        }

        let player = document.getElementById('player');
        player.style.transform = `translate(${gameState.player.x}px, ${gameState.player.y}px)`;

        requestAnimationFrame(updatePlayerMovement);
    }

    updatePlayerMovement();
}

setupPlayerControls();






// function test() {
//     let app = document.getElementById('game');
//     let test = document.createElement('div');
//     app.appendChild(test);

//     addEventListener('keydown', (e) => {
//         if (e.key === 'ArrowUp') {
//             console.log('ArrowUp');
//             test.textContent = 'ArrowUp';
//         } else if (e.key === 'ArrowRight') {
//             console.log('ArrowRight');
//             test.textContent = 'ArrowRight';
//         } else if (e.key === 'ArrowDown') {
//             console.log('ArrowDown');
//             test.textContent = 'ArrowDown';
//         } else if (e.key === 'ArrowLeft') {
//             console.log('ArrowLeft');
//             test.textContent = 'ArrowLeft';
//         }
//     });
// }

// test();
