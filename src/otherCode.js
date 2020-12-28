


//comon.js
export function addZero(numb) {
  return numb < 10 ? `0${numb}` : numb;
}





//music player
import { addZero } from "./common.js";
import { configureVolumeControl } from "./volume.js";

function musicPlayer() {
  const audioBlock = document.querySelector('.audio');
  const player = document.querySelector('.audio-player');
  const playButton = document.querySelector('.audio-button__play');
  const prevButton = document.querySelector('.audio-button__prev');
  const nextButton = document.querySelector('.audio-button__next');
  const audioProgressBar = document.querySelector('.audio-progress');
  const audioProgress = document.querySelector('.audio-progress__timing');
  const timePassed = document.querySelector('.audio-time__passed');
  const timeTotal = document.querySelector('.audio-time__total');
  const songTitle = document.querySelector('.audio-header');
  const songImage = document.querySelector('.audio-img');
  
  const audioList = ['flow', 'hello', 'speed'];
  let currSongIndex = 0;
  
  setSong();

  player.addEventListener('timeupdate', updateTime);
  player.addEventListener('ended', endSongHandler);
  playButton.addEventListener('click', togglePlay);
  prevButton.addEventListener('click', prev);
  nextButton.addEventListener('click', next);
  audioProgressBar.addEventListener('click', changeSongProgress)

  // volume config for audio

  const volumeConfig = {
    volumeSelector: '.audio-volume',
    volumeMuteSelector: '#audio-mute',
    volumeMaxSelector: '#audio-max-volume',
    player,
    initialVolume: .8
  };

  configureVolumeControl(volumeConfig);


  // ====================
  // only functions below

  function setSong() {
    const isPaused = player.paused; 
    
    player.src = `./audio/${audioList[currSongIndex]}.mp3`;
    songTitle.textContent = audioList[currSongIndex];
    songImage.src = `./audio/${audioList[currSongIndex]}.jpg`;
    
    isPaused ? player.pause() : player.play();
  }

  function next() {
    currSongIndex = (currSongIndex + 1) % audioList.length;
    setSong();
  }

  function prev() {
    currSongIndex ? currSongIndex-- : currSongIndex = audioList.length - 1;
    setSong();
  }

  function endSongHandler() {
    next();
    player.play();
  }

  function togglePlay() {
    if (player.paused) {
      player.play();
      playButton.classList.replace('fa-play', 'fa-pause');
      audioBlock.classList.add('play');
    } else {
      player.pause();
      playButton.classList.replace('fa-pause', 'fa-play');
      audioBlock.classList.remove('play');
    }
  }

  function updateTime() {
    const current = player.currentTime;
    const total = player.duration;
    const minutesPassed = Math.floor(current / 60) || 0;
    const secondsPassed = Math.floor(current % 60) || 0;
    const minutesTotal = Math.floor(total / 60) || 0;
    const secondsTotal = Math.floor(total % 60) || 0;

    timePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    timeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

    audioProgress.style.width = current * 100 / total + '%';
  }

  function changeSongProgress(e) {
    const width = audioProgressBar.clientWidth;
    const percent = e.offsetX / width;
    audioProgress.style.width = percent * 100 + '%';
    player.currentTime = percent * player.duration;
  }

  return player;
}

export default musicPlayer;


//index.js
import videoPlayer from './videoPlayer.js';
import radioPlayer from './radioPlayer.js';
import musicPlayer from './musicPlayer.js';

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.player-btn');
  const tabBlocks = document.querySelectorAll('.player-block');
  const temp = document.querySelector('.temp');

  // initial state for buttons and players
  toggleActiveElement(tabButtons, 1, 'active');
  toggleActiveElement(tabBlocks, 1, 'active');
  temp.style.display = 'none';

  const video = videoPlayer();
  const radio = radioPlayer();
  const audio = musicPlayer();

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      toggleActiveElement(tabButtons, index, 'active');
      toggleActiveElement(tabBlocks, index, 'active');
      
      stopMusicOnClose(audio);
      stopVideoOnClose(video);
      stopRadioOnClose(radio);
    });
  });
});


// ====================
// only functions below

function toggleActiveElement(list, index, activeClass = 'active') {
  list.forEach((item, i) => {
    i === index
      ? item.classList.add(activeClass)
      : item.classList.remove(activeClass);
  });
}

function stopMusicOnClose(player) {
  stopOnClose({
    playerBlockSelector: '.player-block.audio',
    playButtonSelector: '.audio-button__play',
    player,
  });
  document.querySelector('.player-block.audio').classList.remove('play');
}

function stopVideoOnClose(player) {
  stopOnClose({
    playerBlockSelector: '.player-block.video',
    playButtonSelector: '.video-button__play',
    player,
  });
}

function stopRadioOnClose(player) {
  stopOnClose({
    playerBlockSelector: '.player-block.radio',
    playButtonSelector: '.radio-stop',
    player,
  });
  document.querySelector('.player-block.radio').classList.remove('play');
}

function stopOnClose(props) {
  const { playerBlockSelector, playButtonSelector, player } = props;

  const playerBlock = document.querySelector(playerBlockSelector);
  const playButton = playerBlock.querySelector(playButtonSelector);
  const isHidden = window.getComputedStyle(playerBlock).display === 'none';

  playButton.classList.add('fa-play');
  playButton.classList.remove('fa-pause');
  isHidden && player.pause();
}





//radio
function radioPlayer() {
  const radio = document.querySelector('.radio');
  const radioStations = document.querySelectorAll('.radio-item');
  const radioNavigation = document.querySelector('.radio-navigation');
  const playButton = document.querySelector('.radio-stop');
  const radioTitle = document.querySelector('.radio-header__big');
  const radioImage = document.querySelector('.radio-cover__img');

  // init
  const audio = new Audio();
  audio.type = 'audio/aac';
  playButton.disabled = true;

  radioNavigation.addEventListener('change', chooseStation);
  playButton.addEventListener('click', togglePlay);

  
  // ====================
  // only functions below

  function chooseStation(event) {
    const station = event.target;
    const stationSrc = event.target.getAttribute('data-radio-station');

    audio.src = stationSrc;
    audio.play();
    playButton.disabled = false;

    toggleSelectedStation(station);
    togglePlayDisplay();
  }

  function toggleSelectedStation(station) {
    const stationItem = station.closest('.radio-item');
    const title = stationItem.querySelector('.radio-name').textContent;
    const image = stationItem.querySelector('.radio-img').src;

    radioStations.forEach(station => station.classList.remove('select'));
    stationItem.classList.add('select');

    radioTitle.textContent = title;
    radioImage.src = image;
  }

  function togglePlay() {
    audio.paused ? audio.play() : audio.pause();
    togglePlayDisplay();
  }

  function togglePlayDisplay() {
    if (audio.paused) {
      playButton.classList.replace('fa-pause', 'fa-play');
      radio.classList.remove('play');
    } else {
      playButton.classList.replace('fa-play', 'fa-pause');
      radio.classList.add('play');
    }
  }

  return audio;
}

export default radioPlayer;






//video.js
import { addZero } from './common.js';
import { configureVolumeControl } from './volume.js';

function videoPlayer() {
  const video = document.querySelector('.video-player');
  const playButton = document.querySelector('.video-button__play');
  const stopButton = document.querySelector('.video-button__stop');
  const videoProgress = document.querySelector('.video-progress');;
  const timePassed = document.querySelector('.video-time__passed');
  const timeTotal = document.querySelector('.video-time__total');

  video.addEventListener('click', togglePlay);
  video.addEventListener('timeupdate', updateTime);
  playButton.addEventListener('click', togglePlay);
  stopButton.addEventListener('click', stopVideo);
  videoProgress.addEventListener('input', changeVideoProgress);

  // volume config for video
  const volumeConfig = {
    volumeSelector: '.video-volume',
    volumeMuteSelector: '#video-mute',
    volumeMaxSelector: '#video-max-volume',
    player: video,
    initialVolume: .35
  };

  configureVolumeControl(volumeConfig);


  // ====================
  // only functions below

  function togglePlay() {
    video.paused ? video.play() : video.pause();
    toggleIcon();
  }

  function stopVideo() {
    video.pause();
    video.currentTime = 0;
    toggleIcon();
  }

  function updateTime() {
    const current = video.currentTime;
    const total = video.duration;
    const minutesPassed = Math.floor(current / 60) || 0;
    const secondsPassed = Math.floor(current % 60) || 0;
    const minutesTotal = Math.floor(total / 60) || 0;
    const secondsTotal = Math.floor(total % 60) || 0;

    timePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    timeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

    videoProgress.value = current / total * 100;
  }

  function changeVideoProgress() {
    const value = videoProgress.value;
    video.currentTime = value / 100 * video.duration;
  }

  // additional functions
  function toggleIcon() {
    if (video.paused) {
      playButton.classList.replace('fa-pause', 'fa-play');
    } else {
      playButton.classList.replace('fa-play', 'fa-pause');
    }
  }

  return video;
}

export default videoPlayer;





//volume
export function configureVolumeControl(props) {
  const {
    volumeSelector,
    volumeMuteSelector,
    volumeMaxSelector,
    player,
    initialVolume = .35
  } = props;

  const volumeControl = document.querySelector(volumeSelector);
  const volumeMute = document.querySelector(volumeMuteSelector);
  const volumeMax = document.querySelector(volumeMaxSelector);

  let isMuted = false;
  let isVolumeMax = false;

  const toggleVolume = createVolumeToggle();

  volumeControl.addEventListener('input', changeVolume);
  volumeMute.addEventListener('click', toggleMute);
  volumeMax.addEventListener('click', toggleMaxVolume);

  volumeInit(initialVolume);


  // ====================
  // only functions below

  function volumeInit(initialVolume) {
    volumeControl.value = initialVolume;
    player.volume = initialVolume;
  }

  function changeVolume() {
    player.volume = volumeControl.value;
    isMuted = false;
    isVolumeMax = false;
  }

  function toggleMute() {
    toggleVolume(0);
    isMuted = !isMuted;
    isVolumeMax = false;
  }

  function toggleMaxVolume() {
    toggleVolume(1);
    isVolumeMax = !isVolumeMax;
    isMuted = false;
  }

  function createVolumeToggle() {
    let previousVolume = player.volume;

    // volume value is 1 or 0 (0 for mute, 1 for max volume);
    return (volumeValue = 0) => {
      if ((isVolumeMax && volumeValue) || (isMuted && !volumeValue)) {
        player.volume = previousVolume;
        previousVolume = volumeValue;
      } else {
        previousVolume = player.volume;
        player.volume = volumeValue;
      }

      volumeControl.value = player.volume;
    }
  }
} 
