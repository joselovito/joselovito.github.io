//Set up audio elements
var soundA_js2 = document.createElement("audio");
//Set audio A src here
soundA_js2.src = "./assets/comp8-themomentiknew_1_mix.flac";
soundA_js2.preload = "auto";
soundA_js2.setAttribute("hidden", "true");
soundA_js2.setAttribute("onplaying", "stepA_js2()");
document.body.append(soundA_js2);

var soundB_js2 = document.createElement("audio");
//Set audio B src here
soundB_js2.src = "./assets/comp8-themomentiknew_2_mstlow.flac";
soundB_js2.preload = "auto";
soundB_js2.setAttribute("hidden", "true");
soundB_js2.setAttribute("onplaying", "stepB_js2()");
document.body.append(soundB_js2);

var soundC_js2 = document.createElement("audio");
//Set audio C src here
soundC_js2.src = "./assets/comp8-themomentiknew_3_mst.flac";
soundC_js2.preload = "auto";
soundC_js2.setAttribute("hidden", "true");
soundC_js2.setAttribute("onplaying", "stepC_js2()");
document.body.append(soundC_js2);


//Get button elements
const aButton_js2 = document.getElementById("a__button_pl2");
const bButton_js2 = document.getElementById("b__button_pl2");
const cButton_js2 = document.getElementById("c__button_pl2");
const playButton_js2 = document.getElementById("play__button_pl2");
const stopButton_js2 = document.getElementById("stop__button_pl2");
const progressFill_js2 = document.getElementById("progress_fill_pl2");
const progress_js2 = document.getElementById("progress_pl2");


const playIcon_js2 = '<i class="fa-solid fa-play"></i>';
const pauseIcon_js2 = '<i class="fa-solid fa-pause"></i>';
const stopIcon_js2 = '<i class="fa-solid fa-stop"></i>';

//Check for mobile to enable audio playback without waiting for download status.
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  playButton_js2.disabled = false;
}

//Default loading state for each sound
var soundA_js2Ready = false;
var soundB_js2Ready = false;
var soundC_js2Ready = false;


//When audio can play through (loaded), run the function to enable buttons
//The canplaythrough event will fire every time the audio switches, so the !soundA_js2/BReady
//prevents additional checks
soundA_js2.oncanplaythrough = function () {
  if (!soundA_js2Ready) {
    soundA_js2Ready = true;
    audioIsReady_js2();
  }
};
soundB_js2.oncanplaythrough = function () {
  if (!soundB_js2Ready) {
    soundB_js2Ready = true;
    audioIsReady_js2();
  }
};
soundC_js2.oncanplaythrough = function () {
  if (!soundC_js2Ready) {
    soundC_js2Ready = true;
    audioIsReady_js2();
  }
};

// Check if both A & B are ready and enable the correct buttons
function audioIsReady_js2() {
  if (soundA_js2Ready && soundB_js2Ready && soundC_js2Ready) {
    console.log("...player 2 audio loaded!");
    aButton_js2.disabled = false;
    bButton_js2.disabled = false;
    cButton_js2.disabled = false;
    playButton_js2.disabled = false;
  } else {
    console.log("Player 2 audio loading...");
  }
}

// Listen for click on entire progress_js2 bar div (to allow skipping ahead)
progress_js2.addEventListener("click", function (event) {
  // Get X coordinate of click in div
  var rect = this.getBoundingClientRect();
  // Convert click position to percentage value
  var percentage = (event.clientX - rect.left) / this.offsetWidth;
  // Seek to the percentage converted to seconds
  soundA_js2.currentTime = percentage * soundA_js2.duration;
  soundB_js2.currentTime = percentage * soundB_js2.duration;
  soundC_js2.currentTime = percentage * soundC_js2.duration;
});

//Frame animations for progress_js2 bar fill - converts to CSS percentage
function stepA_js2() {
  progressFill_js2.style.width =
    ((soundA_js2.currentTime / soundA_js2.duration) * 100 || 0) + "%";
  requestAnimationFrame(stepA_js2);
}
function stepB_js2() {
  progressFill_js2.style.width =
    ((soundB_js2.currentTime / soundB_js2.duration) * 100 || 0) + "%";
  requestAnimationFrame(stepB_js2);
}
function stepC_js2() {
  progressFill_js2.style.width =
    ((soundC_js2.currentTime / soundC_js2.duration) * 100 || 0) + "%";
  requestAnimationFrame(stepC_js2);
}

//Play/Stop correct audio and toggle A/B, Play/Pause, and Stop buttons
const playPause_pl2 = () => {
  if (soundA_js2.paused && soundB_js2.paused && soundC_js2.paused) {
    let soundA_js2Time = soundA_js2.currentTime;
    let soundB_js2Time = soundB_js2.currentTime;
    let soundC_js2Time = soundC_js2.currentTime;

    if (soundA_js2Time >= soundB_js2Time && soundA_js2Time >= soundC_js2Time) {
      soundA_js2.play();
      bButton_js2.disabled = false;
      cButton_js2.disabled = false;
      aButton_js2.disabled = true;
      playButton_js2.innerHTML = pauseIcon_js2;
    } else if (soundB_js2Time >= soundA_js2Time && soundB_js2Time >= soundC_js2Time) {
      soundB_js2.play();
      aButton_js2.disabled = false;
      cButton_js2.disabled = false;
      bButton_js2.disabled = true;
      playButton_js2.innerHTML = pauseIcon_js2;
    } else {
      soundC_js2.play();
      aButton_js2.disabled = false;
      bButton_js2.disabled = false;
      cButton_js2.disabled = true;
      playButton_js2.innerHTML = pauseIcon_js2;
    }

    stopButton_js2.disabled = false;
  } else {
    playButton_js2.innerHTML = playIcon_js2;
    soundA_js2.pause();
    soundB_js2.pause();
    soundC_js2.pause();
  }
};

const playSoundA_pl2 = () => {
  playButton_js2.innerHTML = pauseIcon_js2;
  aButton_js2.disabled = true;
  bButton_js2.disabled = false;
  cButton_js2.disabled = false;
  stopButton_js2.disabled = false;
  if (soundB_js2.currentTime > soundC_js2.currentTime) {
    soundA_js2.currentTime = soundB_js2.currentTime;
    soundA_js2.play();
    soundB_js2.pause();
  } else {
    soundA_js2.currentTime = soundC_js2.currentTime;
    soundA_js2.play();
    soundC_js2.pause();
  }
};

const playSoundB_pl2 = () => {
  playButton_js2.innerHTML = pauseIcon_js2;
  aButton_js2.disabled = false;
  bButton_js2.disabled = true;
  cButton_js2.disabled = false;
  stopButton_js2.disabled = false;
  if (soundA_js2.currentTime > soundC_js2.currentTime) {
    soundB_js2.currentTime = soundA_js2.currentTime;
    soundB_js2.play();
    soundA_js2.pause();
  } else {
    soundB_js2.currentTime = soundC_js2.currentTime;
    soundB_js2.play();
    soundC_js2.pause();
  }
};

const playSoundC_pl2 = () => {
  playButton_js2.innerHTML = pauseIcon_js2;
  aButton_js2.disabled = false;
  bButton_js2.disabled = false;
  cButton_js2.disabled = true;
  stopButton_js2.disabled = false;
  if (soundA_js2.currentTime > soundB_js2.currentTime) {
    soundC_js2.currentTime = soundA_js2.currentTime;
    soundC_js2.play();
    soundA_js2.pause();
  } else {
    soundC_js2.currentTime = soundB_js2.currentTime;
    soundC_js2.play();
    soundB_js2.pause();
  }
};

const stopSounds_pl2 = () => {
  playButton_js2.innerHTML = playIcon_js2;
  aButton_js2.disabled = false;
  bButton_js2.disabled = false;
  cButton_js2.disabled = false;
  playButton_js2.disabled = false;
  stopButton_js2.disabled = true;
  soundA_js2.pause();
  soundA_js2.currentTime = 0;
  soundB_js2.pause();
  soundB_js2.currentTime = 0;
  soundC_js2.pause();
  soundC_js2.currentTime = 0;
};
