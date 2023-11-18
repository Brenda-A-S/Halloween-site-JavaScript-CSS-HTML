import Countdown from './modules/countdown.js';
import Tooltip from './modules/tooltip.js';
import SmashGame from './modules/engine.js';
import Modal from './modules/modal.js';

Tooltip();

const halloweenTime = new Countdown('31 October 2024 00:00:00 GMT-0300');
halloweenTime.init();

const modal = new Modal('#open', '#close', '#modalPlay', '.container-modal', '#title', '#text');
const game = new SmashGame('.square', '.enemy', '#time', '#score', '#play', modal);

game.init();
modal.init();
