import {addZero} from './supScript.js'
export const musicPlayerInit = () => {
  const audio = document.querySelector('.audio');
  const audioImg = document.querySelector('.audio-img');
  const audioHeader = document.querySelector('.audio-header');
  const audioPlayer = document.querySelector('.audio-player');
  const audioNavigation = document.querySelector('.audio-navigation');
  const audioButtonPlay = document.querySelector('.audio-button__play');
  const audioProgress = document.querySelector('.audio-progress');
  const audioProgressTiming = document.querySelector('.audio-progress__timing');
  const audioTimePassed = document.querySelector('.audio-time__passed');
  const audioTimeTotal = document.querySelector('.audio-time__total');
  const audioButtonPrev = document.querySelector('.audio-button__prev');

  const playlist = ['hello', 'flow', 'speed'];
  let trackIndex = 0;

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused; //checks if pause is on the player or track was playind then;if playing than 
    //isPlayed-false;if not playing - true, than audioPlayer .pause(); and when new track , prew - become paused
    const track = playlist[trackIndex]; 
    audioImg.src = `./audio/${track}.jpg`;  
    audioHeader.textContent = track.toUpperCase();//name of track puts in header 
    audioPlayer.src = `./audio/${track}.mp3`;
      if(isPlayed){
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
  }

const prevTrack = () => {
  if(trackIndex !== 0){
    trackIndex--; //decrement
  } else {
    trackIndex = playlist.length - 1;
  }
  loadTrack();
};

const nextTrack = () => { //automatically swich to the next track
  if(trackIndex === playlist.length - 1){
    trackIndex = 0;
  } else {
    trackIndex++; //increment
  }
  loadTrack(); 
};

  audioNavigation.addEventListener('click', event => {
    const target = event.target;

       if(target.classList.contains('audio-button__play')){ //.contain is method like .add or .remove. 
      //it check if target contains class'audio-button__play' // if contains than true, than realize next function in {}
      audio.classList.toggle('play');//.toggle()-meth. that check if audio contains class 'play'
      //if contains - than remove this class, if doesn't contain - add.
      audioButtonPlay.classList.toggle('fa-play'); 
      audioButtonPlay.classList.toggle('fa-pause'); //change sign play > on pause ||;

         if(audioPlayer.paused){
        audioPlayer.play()
        } else {
        audioPlayer.pause();
         }
         const track = playlist[trackIndex]; 
        audioHeader.textContent = track.toUpperCase();
    }

    if(target.classList.contains('audio-button__prev')){
      prevTrack();
    }

    if(target.classList.contains('audio-button__next')){
      nextTrack();
    }  
  });

audioPlayer.addEventListener('ended', () => {//ended - when track come to end. then we want automatically swich next track;
  nextTrack();
  audioPlayer.play();//write .play() when swich next track immidiatly without pause; 
});

 audioPlayer.addEventListener('timeupdate', () => {
   const duration = audioPlayer.duration;
   const currentTime = audioPlayer.currentTime;
   const progress = (currentTime / duration) * 100;
   audioProgressTiming.style.width = progress + '%' ; //since width is css property than concat. with %;s

  const minutesPassed = Math.floor(currentTime / 60) || '0'; //add 0, cos when swich track appears Nan.
  const secondsPassed = Math.floor(currentTime % 60) || '0';   

  const minutesTotal = Math.floor(duration / 60) || '0';
  const secondsTotal = Math.floor(duration % 60) || '0';

  audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
  audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
 });

audioProgress.addEventListener('click', event => {
  const x = event.offsetX;//create coordinates where we clicked on the progress stripe; count from the LEFTest point to the place of click; left-point.______.click = +20px;
  const allWidth = audioProgress.clientWidth;//clientWidth - to get the lenth of rogress stripe;
  const progress = (x / allWidth) * audioPlayer.duration;// duration define seconds(time) where to switch; x/allWidth - spot on the stripe
  audioPlayer.currentTime = progress;//fefinite current time of track;
});

};
