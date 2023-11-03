const views = {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    time: document.querySelector('#time'),
    score: document.querySelector('#score')
}
const { squares, enemy, time, score } = views;

const values = {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60
}

const { gameVelocity } = values;
let { hitPosition, result, currentTime } = values;

const action = {
    timerId: setInterval(selectRandomSquare, gameVelocity),
    countdownTimer: setInterval(countdown, gameVelocity)
}

let {timerId, countdownTimer} = action;

function countdown() {
    currentTime--;
    time.textContent = currentTime;
    if(currentTime <= 0){
        alert('game over, score: ' + result);
        clearInterval(timerId, gameVelocity);
        clearInterval(countdownTimer, gameVelocity);
        score.textContent = result;
        window.location.reload();
    }
}

function selectRandomSquare() {
    squares.forEach(square => square.classList.remove('enemy'));
    let randomNum = Math.floor(Math.random() * 9);
    hitPosition = randomNum;
    squares[randomNum].classList.add('enemy');
}

function verifyEnemy() {
    squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if (hitPosition === +square.id) {
                result++;
                score.textContent = result;
                hitPosition = null;
                selectRandomSquare();
                clearInterval(timerId);
                timerId = setInterval(selectRandomSquare, gameVelocity);
            }
        });
    });
}

function initGame() {
    verifyEnemy();
}
