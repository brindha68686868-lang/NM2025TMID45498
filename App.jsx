// Function to create and play a simple rhythmic click
function playRhythmicClick(tempoBPM, durationBeats) {
    // 1. Set up the Audio Context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // 2. Calculate the interval between beats
    // Time per beat in seconds = 60 / BPM
    const timePerBeat = 60 / tempoBPM;
    let currentTime = audioContext.currentTime;

    // 3. Schedule the beats
    for (let i = 0; i < durationBeats; i++) {
        // Create an oscillator (sound source) for the click
        const oscillator = audioContext.createOscillator();
        // Create a gain node (volume control)
        const gainNode = audioContext.createGain();

        // Connect the nodes: oscillator -> gain -> destination (speakers)
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Set the sound characteristics
        oscillator.type = 'sine'; // A sine wave for a clean tone
        oscillator.frequency.setValueAtTime(440, currentTime); // A tone at 440 Hz (A4)

        // Set the volume envelope (a very short click)
        gainNode.gain.setValueAtTime(1, currentTime); // Start at full volume
        gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.05); // Fade out quickly (0.05s)

        // Start and stop the oscillator
        oscillator.start(currentTime);
        oscillator.stop(currentTime + 0.05); // Stop after 0.05 seconds

        // Advance the time for the next beat
        currentTime += timePerBeat;
    }
}

// Example usage: play 8 clicks at 120 BPM
// You would typically call this function via a button click in an HTML page
// playRhythmicClick(120, 8);

/*
To make this work in a browser:
1. Create an HTML file.
2. Add a button that calls this function.
3. Browsers often require a user gesture (like a click) to start the AudioContext.
*/
