export default class SmashGame {
    constructor(squares, enemy, time, score, btn, modal) {
        this.squares = document.querySelectorAll(squares);
        this.enemy = document.querySelector(enemy);
        this.time = document.querySelector(time);
        this.score = document.querySelector(score);
        this.btn = document.querySelector(btn);
        this.modal = modal;

        this.gameSpeed = 1000;
        this.hitPosition = 0;
        this.result = 0;
        this.currentTime = 0;

        this.timerId;
        this.countdownTimer;
        this.gameRunning;

        this.countdown = this.countdown.bind(this);
        this.selectRandomSquare = this.selectRandomSquare.bind(this);

        this.startGame = this.startGame.bind(this);
        this.addGameEvents = this.addGameEvents.bind(this);
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
            this.endGame();
        }
    }
    endGame() {
        if (this.modal) this.openResult();
        this.clearIntervals();
        this.removeEnemyEvent();
        this.removeEnemy();
        this.score.textContent = this.result;
        this.gameRunning = false;
    }
    removeEnemy() {
        this.squares.forEach(square => square.classList.remove('enemy'));
    }
    selectRandomSquare() {
        if (this.currentTime > 0) {
            this.removeEnemy();
            let randomNum = Math.floor(Math.random() * 9);
            this.hitPosition = randomNum;
            this.squares[randomNum].classList.add('enemy');
        }
    }
    addEnemyEvent() {
        this.squares.forEach(square => {
            square.addEventListener('click', () => {
                this.verifyEnemy(square);
            });
        });
    }
    removeEnemyEvent() {
        this.squares.forEach(square => {
            square.removeEventListener('click', () => {
                this.verifyEnemy(square);
            });
        });
    }
    verifyEnemy(square) {
        if (!this.gameRunning) return;

        if (this.hitPosition === +square.id) {
            if (this.currentTime > 0) {
                this.playSound('punch');
                this.result++;
            }
            this.hitPosition = null;
            this.score.textContent = this.result;
            this.selectRandomSquare();
            this.resetCurrentInterval();
        }
    }
    openResult() {
        this.modal.newHTMLModal('Fim de jogo!', `Sua pontuação foi de: ${this.result}`, 'Jogar novamente!');
        this.modal.containerModal.classList.add('active');
    }
    startGame() {
        this.playSound('time');
        this.addEnemyEvent();
        this.currentTime = 15;
        this.time.textContent = this.currentTime;
        this.score.textContent = 0;
        this.result = 0;
        this.resetCurrentInterval();
        this.countdownTimer = setInterval(this.countdown, this.gameSpeed);
        this.gameRunning = true;
    }
    addGameEvents() {
        this.btn.addEventListener('click', () => {
            if (this.gameRunning) return
            this.startGame();
        });
        if (this.modal) {
            this.modal.btnPlay.addEventListener('click', () => {
                if (this.gameRunning) return
                this.startGame();
            });
        }
    }
    init() {
        if (this.squares && this.enemy && this.time && this.score) this.addGameEvents();
        return this;
    }
}