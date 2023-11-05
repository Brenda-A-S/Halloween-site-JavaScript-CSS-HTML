export default class SmashGame {
    constructor(squares, enemy, time, score, btnPlay) {

        this.squares = squares;
        this.enemy = enemy;
        this.time = time;
        this.score = score;
        this.btnPlay = btnPlay;

        this.gameSpeed = 1000;
        this.hitPosition = 0;
        this.result = 0;
        this.currentTime = 0;

        this.timerId;
        this.countdownTimer;
        this.gameRunning = false;

        this.countdown = this.countdown.bind(this);
        this.selectRandomSquare = this.selectRandomSquare.bind(this);
        this.verifyEnemy = this.verifyEnemy.bind(this);
        this.startGame = this.startGame.bind(this);
    }
    countdown() {
        if (this.currentTime > 0) {
            this.currentTime--;
            this.time.textContent = this.currentTime;
        }
        if (this.currentTime <= 0) {
            clearInterval(this.countdownTimer);
            clearInterval(this.timerId);
            clearInterval(this.timerId);
            !this.verifyEnemy();
            this.score.textContent = this.result;
        }
    }
    selectRandomSquare() {
        if (this.currentTime > 0) {
            this.squares.forEach(square => square.classList.remove('enemy'));
            let randomNum = Math.floor(Math.random() * 9);
            this.hitPosition = randomNum;
            this.squares[randomNum].classList.add('enemy');
        }
    }
    verifyEnemy() {
        if (this.gameRunning) {
        }

        this.gameRunning = true;
        this.squares.forEach(square => {
            square.addEventListener('click', () => {
                if (this.hitPosition === +square.id) {
                    if (this.currentTime > 0) {
                        this.result++;
                    }
                    this.score.textContent = this.result;
                    this.hitPosition = null;
                    this.selectRandomSquare();
                    clearInterval(this.timerId);
                    this.timerId = setInterval(this.selectRandomSquare, this.gameSpeed);
                }
            });
        });
    }
    
    startGame() {
        this.btnPlay.addEventListener('click', () => { 
            this.verifyEnemy();
            this.currentTime = 5;
            this.score.textContent = 0;
            this.result = 0;
            clearInterval(this.timerId); // limpa intervalo remanescente do click
            this.timerId = setInterval(this.selectRandomSquare, this.gameSpeed);
            this.countdownTimer = setInterval(this.countdown, this.gameSpeed);
        });
    }
}

