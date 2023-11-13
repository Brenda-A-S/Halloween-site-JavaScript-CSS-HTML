export default class SmashGame {
    constructor(squares, enemy, time, score, btn, modal) {
        this.squares = squares;
        this.enemy = enemy;
        this.time = time;
        this.score = score;
        this.btn = btn;
        this.modal = modal;

        this.gameSpeed = 1000;
        this.hitPosition = 0;
        this.result = 0;
        this.currentTime = 0;

        this.timerId;
        this.countdownTimer;
        this.gameRunning = false;

        this.clearIntervals = this.clearIntervals.bind(this);
        this.resetCurrentInterval = this.resetCurrentInterval.bind(this);
        this.playSound = this.playSound.bind(this);
        this.countdown = this.countdown.bind(this);
        this.selectRandomSquare = this.selectRandomSquare.bind(this);
        this.verifyEnemy = this.verifyEnemy.bind(this);
        this.openResult = this.openResult.bind(this);
        this.startGame = this.startGame.bind(this);
        this.initGame = this.initGame.bind(this);
    }
    clearIntervals() {
        clearInterval(this.countdownTimer);
        clearInterval(this.timerId);
        clearInterval(this.timerId);
    }
    resetCurrentInterval() {
        clearInterval(this.timerId);
        this.timerId = setInterval(this.selectRandomSquare, this.gameSpeed);
    }
    playSound(audioName) {
        let audio = new Audio(`src/assets/sounds/${audioName}.mp3`);
        audio.volume = 0.2;
        audio.play();
    }
    countdown() {
        if (this.currentTime > 0) {
            this.currentTime--;
            this.time.textContent = this.currentTime;
        }
        if (this.currentTime <= 0) {
            this.openResult();
            this.clearIntervals();
            !this.verifyEnemy();
            this.score.textContent = this.result;
            this.gameRunning = false;
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
            return;
        }

        this.gameRunning = true;
        this.squares.forEach(square => {
            square.addEventListener('click', () => {                
                if (this.hitPosition === +square.id) {
                    this.playSound('punch');
                    if (this.currentTime > 0) {
                        this.result++;
                    }
                    this.score.textContent = this.result;
                    this.hitPosition = null;
                    this.selectRandomSquare();
                    this.resetCurrentInterval();
                }
            });
        });
    }
    openResult() {
        this.modal.newHTMLModal("Fim de Jogo", 'Pontuação: ' + this.result, 'Jogar Novamente!')
        this.modal.container.classList.add('active')
    }
    startGame() {
        this.playSound('time');
        this.verifyEnemy();
        this.currentTime = 15;
        score.textContent = 0;
        this.result = 0;
        this.resetCurrentInterval();
        this.countdownTimer = setInterval(this.countdown, this.gameSpeed);
    }
    initGame() {
        this.btn.addEventListener('click', () => {
            if (this.gameRunning) return
            this.startGame();
        });
        this.modal.btnPlay.addEventListener('click', () => {
            this.startGame();
        })
    }
}