
const gameState = {
    level: 1,
    gameOver: false,
    isPaused: false,
    player: {
        x: 5,
        y: 5,
        velocityX: 0,
        velocityY: 0,
        isMoving: false,
        lives: 3,
        bombsPlaced: 0,
        bombPower: 1,
        speed: 5,
        isDead: false,
        direction: 'up',
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
        grid: [
            ['W', 'W', 'W', ' ', 'B', 'B', 'B'],
            ['W', ' ', ' ', ' ', 'B', ' ', ' '],
            ['W', 'W', 'W', ' ', 'B', 'B', 'B'],
            [' ', ' ', 'W', ' ', ' ', ' ', 'B'],
            ['W', 'W', 'W', ' ', 'B', 'B', 'B'],
        ],
        timeElapsed: 0
    }

};


function test() {
    let app = document.getElementById('game');
    let test = document.createElement('div');
    app.appendChild(test);

    addEventListener('keydown', (e) => {
        console.log(e);
        if (e.key === 'ArrowUp') {
            console.log('ArrowUp');
            test.textContent = 'ArrowUp';
        } else if (e.key === 'ArrowRight') {
            console.log('ArrowRight');
            test.textContent = 'ArrowRight';
        } else if (e.key === 'ArrowDown') {
            console.log('ArrowDown');
            test.textContent = 'ArrowDown';
        } else if (e.key === 'ArrowLeft') {
            console.log('ArrowLeft');
            test.textContent = 'ArrowLeft';
        }
    });
}

test();
