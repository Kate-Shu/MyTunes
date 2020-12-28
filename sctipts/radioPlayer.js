export const radioPlayerInit = () => {
  console.log('Radio Init');

 const radio = document.querySelector('.radio');
 const radioCoverImg = document.querySelector('.radio-cover__img');
 const radioHeaderBig = document.querySelector('.radio-header__big');
 const radioNavigation = document.querySelector('.radio-navigation');
 const radioItem = document.querySelectorAll('.radio-item');
 const radioStop = document.querySelector('.radio-stop');
 const radioVolume = document.querySelector('.radio-volume');
 const radioMute = document.querySelector('.radio-mute');

const audio = new Audio();
audio.type = 'audio/aac';//aac-format/type, like mp3, but for streaming radio;
let prevVolume = audio.volume;

radioStop.disabled = true;

const changeIconPlay = () => {
  if(audio.paused){ // .paused - property, = true/false
    radio.classList.remove('play');
    radioStop.classList.add('fa-play');
    radioStop.classList.remove('fa-stop')
  } else {
    radio.classList.add('play');
    radioStop.classList.add('fa-stop');
    radioStop.classList.remove('fa-play');
  }
}

const selectItem = elem => { //elem will be parrent
  radioItem.forEach(item => item.classList.remove('select'));
elem.classList.add('select');
};


radioNavigation.addEventListener('change', event => { //using 'change' event, type'radio',common name'radioStation' for all stations=>
const target = event.target;

const parrent = target.closest('.radio-item');//.closest() finds the closest parent with indiceted class, id, selector;
selectItem(parrent);

const title = parrent.querySelector('.radio-name').textContent;

radioHeaderBig.textContent = title;

const urlImg = parrent.querySelector('.radio-img').src;
radioCoverImg.src = urlImg;


radioStop.disabled = false;

audio.src = target.dataset.radioStantion; //allows to check only One station (like radio-button)
//in event is 'target' - property that calls event(here-input - radio-btn)
//we take station address from event.target attribut;
//event->target->dataset->radioStantion:http:...;
//data-radio-station in html, radioStation in console, JS makes camel style itself;
audio.play();
changeIconPlay();

});

radioStop.addEventListener('click', () => {
  if(audio.paused){
    audio.play();
  } else {
    audio.pause();// .pause() - method
  }
changeIconPlay();
});

radioVolume.addEventListener('input', () => {
  audio.volume = radioVolume.value / 100;
  audio.muted = false; //volume != 0;
});
radioMute.addEventListener('click', () => {
  audio.muted = !audio.muted; //mute when volume>0; if volume=0 => volume=mute;
});

radioVolume.value = audio.volume * 100;

radioPlayerInit.stop = () => {
  audio.pause();
  changeIconPlay();
}
};