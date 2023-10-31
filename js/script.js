import Countdown from './modules/countdown.js'

const halloweenTime = new Countdown('31 October 2024 00:00:00 GMT-0300')

function updateCountdown() {
    const units = {
        days: 'dia',
        hours: 'hora',
        minutes: 'minuto',
        seconds: 'segundo'
    }
    function formatTime(number, unit) {
        const unitString = number === 1 ? unit : unit + 's'
        return `${number} <span class="subtitle">${unitString}</span>`
    }
    const daysElement = document.querySelector('.days')
    const hoursElement = document.querySelector('.hours')
    const minutesElement = document.querySelector('.minute')
    const secondsElement = document.querySelector('.second')
    daysElement.innerHTML = formatTime(halloweenTime.total.days, units.days)
    hoursElement.innerHTML = formatTime(halloweenTime.total.hours, units.hours)
    minutesElement.innerHTML = formatTime(halloweenTime.total.minutes, units.minutes)
    secondsElement.innerHTML = formatTime(halloweenTime.total.seconds, units.seconds)
}

updateCountdown()

setInterval(updateCountdown, 1000)


