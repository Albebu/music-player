// audioVisualizer.js
export const setupVisualizer = (canvas, sound) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    // Get the media element source from Howler
    const mediaElement = sound._sounds[0]._node; // Accede al nodo de audio de Howler
    const source = audioContext.createMediaElementSource(mediaElement);
  
    // Connect the source to the analyser
    source.connect(analyser);
    analyser.connect(audioContext.destination);
  
    // Configure the analyser
    analyser.fftSize = 2048;
  
    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
  
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgba(200, 200, 200, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
  
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
        x += barWidth + 1;
      }
    };
  
    draw();
  };
  