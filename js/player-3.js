//Set up audio elements
var soundA_js3 = document.createElement("audio");
//Set audio A src here
soundA_js3.src = "./assets/comp8-lastsummerdays_1_mix.flac";
soundA_js3.preload = "auto";
soundA_js3.setAttribute("hidden", "true");
soundA_js3.setAttribute("onplaying", "stepA_js3()");
document.body.append(soundA_js3);

var soundB_js3 = document.createElement("audio");
//Set audio B src here
soundB_js3.src = "./assets/comp8-lastsummerdays_2_mstlow.flac";
soundB_js3.preload = "auto";
soundB_js3.setAttribute("hidden", "true");
soundB_js3.setAttribute("onplaying", "stepB_js3()");
document.body.append(soundB_js3);

var soundC_js3 = document.createElement("audio");
//Set audio C src here
soundC_js3.src = "./assets/comp8-lastsummerdays_3_mst.flac";
soundC_js3.preload = "auto";
soundC_js3.setAttribute("hidden", "true");
soundC_js3.setAttribute("onplaying", "stepC_js3()");
document.body.append(soundC_js3);


//Get button elements
const aButton_js3 = document.getElementById("a__button_pl3");
const bButton_js3 = document.getElementById("b__button_pl3");
const cButton_js3 = document.getElementById("c__button_pl3");
const playButton_js3 = document.getElementById("play__button_pl3");
const stopButton_js3 = document.getElementById("stop__button_pl3");
const progressFill_js3 = document.getElementById("progress_fill_pl3");
const progress_js3 = document.getElementById("progress_pl3");


const playIcon_js3 = '<i class="fa-solid fa-play"></i>';
const pauseIcon_js3 = '<i class="fa-solid fa-pause"></i>';
const stopIcon_js3 = '<i class="fa-solid fa-stop"></i>';

//Check for mobile to enable audio playback without waiting for download status.
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  playButton_js3.disabled = false;
}

//Default loading state for each sound
var soundA_js3Ready = false;
var soundB_js3Ready = false;
var soundC_js3Ready = false;


//When audio can play through (loaded), run the function to enable buttons
//The canplaythrough event will fire every time the audio switches, so the !soundA_js3/BReady
//prevents additional checks
soundA_js3.oncanplaythrough = function () {
  if (!soundA_js3Ready) {
    soundA_js3Ready = true;
    audioIsReady_js3();
  }
};
soundB_js3.oncanplaythrough = function () {
  if (!soundB_js3Ready) {
    soundB_js3Ready = true;
    audioIsReady_js3();
  }
};
soundC_js3.oncanplaythrough = function () {
  if (!soundC_js3Ready) {
    soundC_js3Ready = true;
    audioIsReady_js3();
  }
};

// Check if both A & B are ready and enable the correct buttons
function audioIsReady_js3() {
  if (soundA_js3Ready && soundB_js3Ready && soundC_js3Ready) {
    console.log("...player 3 audio loaded!");
    aButton_js3.disabled = false;
    bButton_js3.disabled = false;
    cButton_js3.disabled = false;
    playButton_js3.disabled = false;
  } else {
    console.log("Player 3 audio loading...");
  }
}

// Listen for click on entire progress_js3 bar div (to allow skipping ahead)
progress_js3.addEventListener("click", function (event) {
  // Get X coordinate of click in div
  var rect = this.getBoundingClientRect();
  // Convert click position to percentage value
  var percentage = (event.clientX - rect.left) / this.offsetWidth;
  // Seek to the percentage converted to seconds
  soundA_js3.currentTime = percentage * soundA_js3.duration;
  soundB_js3.currentTime = percentage * soundB_js3.duration;
  soundC_js3.currentTime = percentage * soundC_js3.duration;
});

//Frame animations for progress_js3 bar fill - converts to CSS percentage
function stepA_js3() {
  progressFill_js3.style.width =
    ((soundA_js3.currentTime / soundA_js3.duration) * 100 || 0) + "%";
  requestAnimationFrame(stepA_js3);
}
function stepB_js3() {
  progressFill_js3.style.width =
    ((soundB_js3.currentTime / soundB_js3.duration) * 100 || 0) + "%";
  requestAnimationFrame(stepB_js3);
}
function stepC_js3() {
  progressFill_js3.style.width =
    ((soundC_js3.currentTime / soundC_js3.duration) * 100 || 0) + "%";
  requestAnimationFrame(stepC_js3);
}

//Play/Stop correct audio and toggle A/B, Play/Pause, and Stop buttons
const playPause_pl3 = () => {
  if (soundA_js3.paused && soundB_js3.paused && soundC_js3.paused) {
    let soundA_js3Time = soundA_js3.currentTime;
    let soundB_js3Time = soundB_js3.currentTime;
    let soundC_js3Time = soundC_js3.currentTime;

    if (soundA_js3Time >= soundB_js3Time && soundA_js3Time >= soundC_js3Time) {
      soundA_js3.play();
      bButton_js3.disabled = false;
      cButton_js3.disabled = false;
      aButton_js3.disabled = true;
      playButton_js3.innerHTML = pauseIcon_js3;
    } else if (soundB_js3Time >= soundA_js3Time && soundB_js3Time >= soundC_js3Time) {
      soundB_js3.play();
      aButton_js3.disabled = false;
      cButton_js3.disabled = false;
      bButton_js3.disabled = true;
      playButton_js3.innerHTML = pauseIcon_js3;
    } else {
      soundC_js3.play();
      aButton_js3.disabled = false;
      bButton_js3.disabled = false;
      cButton_js3.disabled = true;
      playButton_js3.innerHTML = pauseIcon_js3;
    }

    stopButton_js3.disabled = false;
  } else {
    playButton_js3.innerHTML = playIcon_js3;
    soundA_js3.pause();
    soundB_js3.pause();
    soundC_js3.pause();
  }
};

const playSoundA_pl3 = () => {
  playButton_js3.innerHTML = pauseIcon_js3;
  aButton_js3.disabled = true;
  bButton_js3.disabled = false;
  cButton_js3.disabled = false;
  stopButton_js3.disabled = false;
  if (soundB_js3.currentTime > soundC_js3.currentTime) {
    soundA_js3.currentTime = soundB_js3.currentTime;
    soundA_js3.play();
    soundB_js3.pause();
  } else {
    soundA_js3.currentTime = soundC_js3.currentTime;
    soundA_js3.play();
    soundC_js3.pause();
  }
};

const playSoundB_pl3 = () => {
  playButton_js3.innerHTML = pauseIcon_js3;
  aButton_js3.disabled = false;
  bButton_js3.disabled = true;
  cButton_js3.disabled = false;
  stopButton_js3.disabled = false;
  if (soundA_js3.currentTime > soundC_js3.currentTime) {
    soundB_js3.currentTime = soundA_js3.currentTime;
    soundB_js3.play();
    soundA_js3.pause();
  } else {
    soundB_js3.currentTime = soundC_js3.currentTime;
    soundB_js3.play();
    soundC_js3.pause();
  }
};

const playSoundC_pl3 = () => {
  playButton_js3.innerHTML = pauseIcon_js3;
  aButton_js3.disabled = false;
  bButton_js3.disabled = false;
  cButton_js3.disabled = true;
  stopButton_js3.disabled = false;
  if (soundA_js3.currentTime > soundB_js3.currentTime) {
    soundC_js3.currentTime = soundA_js3.currentTime;
    soundC_js3.play();
    soundA_js3.pause();
  } else {
    soundC_js3.currentTime = soundB_js3.currentTime;
    soundC_js3.play();
    soundB_js3.pause();
  }
};

const stopSounds_pl3 = () => {
  playButton_js3.innerHTML = playIcon_js3;
  aButton_js3.disabled = false;
  bButton_js3.disabled = false;
  cButton_js3.disabled = false;
  playButton_js3.disabled = false;
  stopButton_js3.disabled = true;
  soundA_js3.pause();
  soundA_js3.currentTime = 0;
  soundB_js3.pause();
  soundB_js3.currentTime = 0;
  soundC_js3.pause();
  soundC_js3.currentTime = 0;
};
