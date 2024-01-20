function createAudioElement(src, onPlayingCallback) {
    const audio = document.createElement("audio");
    audio.src = src;
    audio.preload = "auto";
    audio.setAttribute("hidden", "true");
    audio.setAttribute("onplaying", onPlayingCallback);
    document.body.append(audio);
    return audio;
  }