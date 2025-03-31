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
        const days = 'dias';
        const hours = 'horas';
        const minutes = 'minutos';
        const seconds = 'segundos';
        return [
            days,
            hours,
            minutes,
            seconds,
        ]
    }
    updateCountdown() {
        this.updateTimer = setInterval(this.buildCountdown, 1000);
    }
    buildCountdown() {
        if (this._timeStampDiff <= 0) {
            this.incrementYear();
        } else {
            this.countdown.forEach((item, index) => {
                const number = this.total[index];
                let unit = this.units[index];
                number === 1 ? unit = unit.replace(/s$/, '') : unit;
                item.innerHTML = `${number} <span class="subtitle">${unit}</span> `;
            })
        }
    }
    incrementYear() {
        const currentDate = new Date(this.futureDate);
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        this.futureDate = currentDate.toISOString();

        this.buildCountdown();
    }
    init() {
        if (this.futureDate) {
            this.buildCountdown();
            this.updateCountdown();
        }
        return this;
    }
}