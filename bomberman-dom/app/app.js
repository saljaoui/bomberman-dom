function test() {
    let app = document.getElementById('app');
    let test = document.createElement('div');
    app.appendChild(test);

    addEventListener('keydown', (e) => {
        console.log(e);
        if (e.key === 'ArrowUp') {
            console.log('ArrowUp');
            test.textContent = 'ArrowUp';
            test.style.backgroundImage = 'ArrowDown.png'
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
