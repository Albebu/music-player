// src/components/Equalizer.jsx
import React, { useEffect, useRef } from 'react';

const Equalizer = ({ soundRef }) => {
    const canvasRef = useRef(null);
    const analyserRef = useRef(null);
    const animationFrameRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (soundRef.current) {
            const audioContext = soundRef.current._audioNode.context; // Obtener el contexto de audio de Howler
            analyserRef.current = audioContext.createAnalyser();
            analyserRef.current.fftSize = 256; // Establecer el tamaño del FFT para la resolución deseada
            
            // Conectar el Howler al analizador
            soundRef.current._audioNode.connect(analyserRef.current);
            analyserRef.current.connect(audioContext.destination);
        }

        const draw = () => {
            if (!analyserRef.current) return;
            
            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyserRef.current.getByteFrequencyData(dataArray);
            
            // Limpiar el canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const barWidth = (canvas.width / bufferLength) * 2.5; // Ancho de las barras
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2; // Escalar la altura
                ctx.fillStyle = 'blue'; // Cambiar el color según tu preferencia
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1; // Espaciado entre las barras
            }

            animationFrameRef.current = requestAnimationFrame(draw); // Solicitar el siguiente frame
        };

        draw(); // Comenzar el dibujo

        return () => {
            cancelAnimationFrame(animationFrameRef.current); // Limpiar el frame al desmontar
        };
    }, [soundRef]);

    return <canvas ref={canvasRef} width={800} height={300} style={{ background: 'white' }} />;
};

export default Equalizer;
