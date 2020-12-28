import { radioPlayerInit } from "./modules/radioPlayer.js";
import { musicPlayerInit } from "./modules/musicPlayer.js";
import { videoPlayerInit } from "./modules/videoPlayer.js";

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivatingPlayer = () => {
  temp.style.display = 'none';
  playerBtn.forEach (item => item.classList.remove('active') );
  playerBlock.forEach (item => item.classList.remove('active') );

  radioPlayerInit.stop();
  videoPlayerInit.stop();
  musicPlayerInit.stop();

};



playerBtn.forEach( (btn, i) => btn.addEventListener('click', () => {
  deactivatingPlayer();
  btn.classList.add('active');
  playerBlock[i].classList.add('active');
}));




videoPlayerInit();
musicPlayerInit();
radioPlayerInit();