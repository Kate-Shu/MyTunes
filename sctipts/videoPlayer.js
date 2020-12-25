import {addZero} from './supScript.js'
export const videoPlayerInit = () => {
  console.log('Video init');
// export default videoPlayer; - another way to expotr files
// 
const videoPlayer = document.querySelector('.video-player');
const videoButtonPlay = document.querySelector('.video-button__play');
const videoButtonStop = document.querySelector('.video-button__stop');
const videoProgress = document.querySelector('.video-progress');
const videoTimePassed = document.querySelector('.video-time__passed');
const videoTimeTotal  = document.querySelector('.video-time__total');
//  
const toggleIcon = () => {
  if(videoPlayer.paused){
    videoButtonPlay.classList.remove('fa-pause');
    videoButtonPlay.classList.add('fa-play');
  } else {
    videoButtonPlay.classList.add('fa-pause');
    videoButtonPlay.classList.remove('fa-play');
  }
}
// 
const togglePlay = () => {
  if (videoPlayer.paused){
    videoPlayer.play();
  }else{
    videoPlayer.pause();
  }
};
// 
const stopPlay = () => {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
}
 
videoPlayer.addEventListener('click', togglePlay);
videoButtonPlay.addEventListener('click', togglePlay);
 
videoPlayer.addEventListener('play', toggleIcon);
videoPlayer.addEventListener('pause', toggleIcon);
 
videoButtonStop.addEventListener('click', stopPlay);

videoPlayer.addEventListener('timeupdate', () => {
  const currentTime = videoPlayer.currentTime;
  const duration = videoPlayer.duration;

  videoProgress.value = (currentTime / duration) * 100; //to move indicator on video-progress; *100 - remove fractional numbers
  
  let minutePassed = Math.floor(currentTime / 60); //округл до мин.
  let secondPassed = Math.floor(currentTime % 60); //остаток after min, to know how many secons are;

  let minuteTotal = Math.floor(duration / 60);
  let secondsTotal = Math.floor(duration % 60);

  videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`;//addZero(minutePassed) + ':' + addZero(secondPassed); //output time on the screen on the =>
  videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;//addZero(minuteTotal) + ':' + addZero(secondsTotal); //video-progress(stripe)
})
 
videoProgress.addEventListener('change', () => {
  const duration = videoPlayer.duration;
  const value = videoProgress.value;

  videoPlayer.currentTime = (value * duration) / 100; //shows current time in seconds
});

};

