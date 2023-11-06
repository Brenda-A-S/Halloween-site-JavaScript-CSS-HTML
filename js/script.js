import Countdown from './modules/countdown.js';
import Tooltip from './modules/tooltip.js';
import SmashGame from './modules/engine.js';
import Modal from './modules/modal.js'

Tooltip()

if (window.location.pathname.includes('countdown')) {
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
}

if (window.location.pathname.includes('smashpumpkin')){
const squares = document.querySelectorAll('.square');
const enemy = document.querySelector('.enemy');
const time = document.querySelector('#time');
const score = document.querySelector('#score');
const btn = document.querySelector('#play');

const title = document.querySelector('#title');
const text = document.querySelector('#text');

const btnOpen = document.querySelector('#open');
const btnClose = document.querySelector('#close');
const btnPlay = document.querySelector('#modalPlay');
const containerModal = document.querySelector('.container-modal');

const modal = new Modal(btnOpen, btnClose, btnPlay, containerModal, title, text);
const game = new SmashGame(squares, enemy, time, score, btn, modal);

game.initGame();

modal.initModal();}
