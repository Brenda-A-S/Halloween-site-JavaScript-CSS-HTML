export default class Countdown {
    constructor(futureDate) {
        this.futureDate = futureDate;

        this.countdown = document.querySelectorAll('.countdown li');

        this.updateTimer;
        this.buildCountdown = this.buildCountdown.bind(this)
    }
    get _actualDate() {
        return new Date()
    }
    get _futureDate() {
        return new Date(this.futureDate)
    }
    get _timeStampDiff() {
        return this._futureDate.getTime() - this._actualDate.getTime()
    }
    get days() {
        return Math.floor(this._timeStampDiff / (24 * 60 * 60 * 1000))
    }
    get hours() {
        return Math.floor(this._timeStampDiff / (60 * 60 * 1000))
    }
    get minutes() {
        return Math.floor(this._timeStampDiff / (60 * 1000))
    }
    get seconds() {
        return Math.floor(this._timeStampDiff / 1000)
    }
    get total() {
        const days = this.days;
        const hours = this.hours % 24;
        const minutes = this.minutes % 60;
        const seconds = this.seconds % 60;
        return [
            days,
            hours,
            minutes,
            seconds,
        ]
    }
    get units() {
        const days = 'dia';
        const hours = 'hora';
        const minutes = 'minuto';
        const seconds = 'segundo';
        return [
            days,
            hours,
            minutes,
            seconds,
        ]
    }
    formatTime(number, unit) {
        const unitString = number === 1 ? unit : unit + 's'
        return `${number} <span class="subtitle">${unitString}</span>`
    }
    updateCountdown() {
        this.updateTimer = setInterval(this.buildCountdown, 1000)
    }
    buildCountdown() {
        this.countdown.forEach((unit, index) => {
            unit.innerHTML = this.total[index] && this.formatTime(this.total[index], this.units[index])
        })
    }
    init() {
        this.buildCountdown();
        this.updateCountdown();
    }

}