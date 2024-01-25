// script.js
document.addEventListener('DOMContentLoaded', () => {
    const fadeDuration = 0.01; // 10ms fade
    const players = document.querySelectorAll('.player');

    function fadeAudioOut(audioElement, callback) {
        let volume = audioElement.volume;
        const fadeOutInterval = setInterval(() => {
            if (volume > 0.1) {
                volume -= 0.1;
                audioElement.volume = volume;
            } else {
                clearInterval(fadeOutInterval);
                audioElement.volume = 0;
                audioElement.pause();
                if (callback) callback();
            }
        }, fadeDuration * 1000);
    }

    function fadeAudioIn(audioElement) {
        let volume = 0;
        audioElement.volume = volume;
        const fadeInInterval = setInterval(() => {
            if (volume < 1) {
                volume += 0.1;
                audioElement.volume = Math.min(volume, 1);
            } else {
                clearInterval(fadeInInterval);
            }
        }, fadeDuration * 1000);
    }

    function stopAllOtherPlayers(exceptPlayer) {
        players.forEach(player => {
            if (player !== exceptPlayer) {
                const otherAudio = player.querySelector('audio');
                const otherStopButton = player.querySelector('.stop-btn');
                fadeAudioOut(otherAudio, () => {
                    otherAudio.currentTime = 0;
                    player.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
                    otherStopButton.classList.add('active');
                });
            }
        });
    }

    players.forEach(player => {
        let currentAudio = null;
        let lastPosition = 0;

        const audioElement = player.querySelector('audio');
        const buttons = player.querySelectorAll('.btn');
        const stopButton = player.querySelector('.stop-btn');
        stopButton.classList.add('active'); // Initially, set stop button as active

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                stopAllOtherPlayers(player); // Stop all other players

                const trackVersion = this.getAttribute('data-version');
                const playerNumber = player.id.replace('player', '');
                const newSource = `assets/${playerNumber}_${trackVersion}.flac`;

                buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                stopButton.classList.remove('active'); // Deactivate stop button when playing

                if (currentAudio && !audioElement.paused) {
                    lastPosition = audioElement.currentTime;
                    fadeAudioOut(audioElement, () => {
                        audioElement.src = newSource;
                        audioElement.currentTime = lastPosition;
                        fadeAudioIn(audioElement);
                        audioElement.play();
                    });
                } else {
                    audioElement.src = newSource;
                    audioElement.currentTime = lastPosition;
                    fadeAudioIn(audioElement);
                    audioElement.play();
                }

                currentAudio = trackVersion;
            });
        });

        stopButton.addEventListener('click', () => {
            fadeAudioOut(audioElement, () => {
                audioElement.currentTime = 0;
                lastPosition = 0;
                buttons.forEach(btn => btn.classList.remove('active'));
                stopButton.classList.add('active'); // Activate stop button when stopped
            });
        });

        audioElement.onended = () => {
            stopButton.classList.add('active'); // Activate stop button when audio ends
        };
    });
});
