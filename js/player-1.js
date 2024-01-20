//Set up audio elements
var soundA_js1 = document.createElement("audio");
//Set audio A src here
soundA_js1.src = "./assets/comp8-linedisconnected_1_mix.flac";
soundA_js1.preload = "auto";
soundA_js1.setAttribute("hidden", "true");
soundA_js1.setAttribute("onplaying", "stepA_js1()");
document.body.append(soundA_js1);

var soundB_js1 = document.createElement("audio");
//Set audio B src here
soundB_js1.src = "./assets/comp8-linedisconnected_2_mstlow.flac";
soundB_js1.preload = "auto";
soundB_js1.setAttribute("hidden", "true");
soundB_js1.setAttribute("onplaying", "stepB_js1()");
document.body.append(soundB_js1);

var soundC_js1 = document.createElement("audio");
//Set audio C src here
soundC_js1.src = "./assets/comp8-linedisconnected_3_mst.flac";
soundC_js1.preload = "auto";
soundC_js1.setAttribute("hidden", "true");
soundC_js1.setAttribute("onplaying", "stepC_js1()");
document.body.append(soundC_js1);


//Get button elements
const aButton_js1 = document.getElementById("a__button_pl1");
const bButton_js1 = document.getElementById("b__button_pl1");
const cButton_js1 = document.getElementById("c__button_pl1");
const playButton_js1 = document.getElementById("play__button_pl1");
const stopButton_js1 = document.getElementById("stop__button_pl1");
const progressFill_js1 = document.getElementById("progress_fill_pl1");
const progress_js1 = document.getElementById("progress_pl1");


const playIcon_js1 = '<i class="fa-solid fa-play"></i>';
const pauseIcon_js1 = '<i class="fa-solid fa-pause"></i>';
const stopIcon_js1 = '<i class="fa-solid fa-stop"></i>';

//Check for mobile to enable audio playback without waiting for download status.
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  playButton_js1.disabled = false;
}

//Default loading state for each sound
var soundA_js1Ready = false;
var soundB_js1Ready = false;
var soundC_js1Ready = false;


//When audio can play through (loaded), run the function to enable buttons
//The canplaythrough event will fire every time the audio switches, so the !soundA_js1/BReady
//prevents additional checks
soundA_js1.oncanplaythrough = function () {
  if (!soundA_js1Ready) {
    soundA_js1Ready = true;
    audioIsReady_js1();
  }
};
soundB_js1.oncanplaythrough = function () {
  if (!soundB_js1Ready) {
    soundB_js1Ready = true;
    audioIsReady_js1();
  }
};
soundC_js1.oncanplaythrough = function () {
  if (!soundC_js1Ready) {
    soundC_js1Ready = true;
    audioIsReady_js1();
  }
};

// Check if both A & B are ready and enable the correct buttons
function audioIsReady_js1() {
  console.log("audioIsReady_1 function called");
  if (soundA_js1Ready && soundB_js1Ready && soundC_js1Ready) {
    console.log("...player 1 audio loaded!");
    aButton_js1.disabled = false;
    bButton_js1.disabled = false;
    cButton_js1.disabled = false;
    playButton_js1.disabled = false;
  } else {
    console.log("Player 1 audio loading...");
  }
}

// Listen for click on entire progress_js1 bar div (to allow skipping ahead)
progress_js1.addEventListener("click", function (event) {
  // Get X coordinate of click in div
  var rect = this.getBoundingClientRect();
  // Convert click position to percentage value
  var percentage = (event.clientX - rect.left) / this.offsetWidth;
  // Seek to the percentage converted to seconds
  soundA_js1.currentTime = percentage * soundA_js1.duration;
  soundB_js1.currentTime = percentage * soundB_js1.duration;
  soundC_js1.currentTime = percentage * soundC_js1.duration;
});

//Frame animations for progress_js1 bar fill - converts to CSS percentage
function stepA_js1() {
  progressFill_js1.style.width =
    ((soundA_js1.currentTime / soundA_js1.duration) * 100 || 0) + "%";
  requestAnimationFrame(stepA_js1);
}
function stepB_js1() {
  progressFill_js1.style.width =
    ((soundB_js1.currentTime / soundB_js1.duration) * 100 || 0) + "%";
  requestAnimationFrame(stepB_js1);
}
function stepC_js1() {
  progressFill_js1.style.width =
    ((soundC_js1.currentTime / soundC_js1.duration) * 100 || 0) + "%";
  requestAnimationFrame(stepC_js1);
}

//Play/Stop correct audio and toggle A/B, Play/Pause, and Stop buttons
const playPause_pl1 = () => {
    console.log("playPause_pl1 function called");
  if (soundA_js1.paused && soundB_js1.paused && soundC_js1.paused) {
    let soundA_js1Time = soundA_js1.currentTime;
    let soundB_js1Time = soundB_js1.currentTime;
    let soundC_js1Time = soundC_js1.currentTime;

    if (soundA_js1Time >= soundB_js1Time && soundA_js1Time >= soundC_js1Time) {
      soundA_js1.play();
      bButton_js1.disabled = false;
      cButton_js1.disabled = false;
      aButton_js1.disabled = true;
      playButton_js1.innerHTML = pauseIcon_js1;
    } else if (soundB_js1Time >= soundA_js1Time && soundB_js1Time >= soundC_js1Time) {
      soundB_js1.play();
      aButton_js1.disabled = false;
      cButton_js1.disabled = false;
      bButton_js1.disabled = true;
      playButton_js1.innerHTML = pauseIcon_js1;
    } else {
      soundC_js1.play();
      aButton_js1.disabled = false;
      bButton_js1.disabled = false;
      cButton_js1.disabled = true;
      playButton_js1.innerHTML = pauseIcon_js1;
    }

    stopButton_js1.disabled = false;
  } else {
    playButton_js1.innerHTML = playIcon_js1;
    soundA_js1.pause();
    soundB_js1.pause();
    soundC_js1.pause();
  }
};

const playSoundA_pl1 = () => {
  playButton_js1.innerHTML = pauseIcon_js1;
  aButton_js1.disabled = true;
  bButton_js1.disabled = false;
  cButton_js1.disabled = false;
  stopButton_js1.disabled = false;
  if (soundB_js1.currentTime > soundC_js1.currentTime) {
    soundA_js1.currentTime = soundB_js1.currentTime;
    soundA_js1.play();
    soundB_js1.pause();
  } else {
    soundA_js1.currentTime = soundC_js1.currentTime;
    soundA_js1.play();
    soundC_js1.pause();
  }
};

const playSoundB_pl1 = () => {
  playButton_js1.innerHTML = pauseIcon_js1;
  aButton_js1.disabled = false;
  bButton_js1.disabled = true;
  cButton_js1.disabled = false;
  stopButton_js1.disabled = false;
  if (soundA_js1.currentTime > soundC_js1.currentTime) {
    soundB_js1.currentTime = soundA_js1.currentTime;
    soundB_js1.play();
    soundA_js1.pause();
  } else {
    soundB_js1.currentTime = soundC_js1.currentTime;
    soundB_js1.play();
    soundC_js1.pause();
  }
};

const playSoundC_pl1 = () => {
  playButton_js1.innerHTML = pauseIcon_js1;
  aButton_js1.disabled = false;
  bButton_js1.disabled = false;
  cButton_js1.disabled = true;
  stopButton_js1.disabled = false;
  if (soundA_js1.currentTime > soundB_js1.currentTime) {
    soundC_js1.currentTime = soundA_js1.currentTime;
    soundC_js1.play();
    soundA_js1.pause();
  } else {
    soundC_js1.currentTime = soundB_js1.currentTime;
    soundC_js1.play();
    soundB_js1.pause();
  }
};

const stopSounds_pl1 = () => {
  playButton_js1.innerHTML = playIcon_js1;
  aButton_js1.disabled = false;
  bButton_js1.disabled = false;
  cButton_js1.disabled = false;
  playButton_js1.disabled = false;
  stopButton_js1.disabled = true;
  soundA_js1.pause();
  soundA_js1.currentTime = 0;
  soundB_js1.pause();
  soundB_js1.currentTime = 0;
  soundC_js1.pause();
  soundC_js1.currentTime = 0;
};
