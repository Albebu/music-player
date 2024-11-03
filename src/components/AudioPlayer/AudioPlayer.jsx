// src/components/AudioPlayer.jsx
import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

const AudioPlayer = ({ src, isPaused, setCurrentTime, volume, currentTime, soundRef }) => {
    

    useEffect(() => {
        const cleanup = () => {
            if (soundRef.current) {
                soundRef.current.stop();
                soundRef.current.unload();
                soundRef.current = null;
            }
        };

        cleanup();

        if (src) {
            soundRef.current = new Howl({
                src: [src],
                html5: true,
                volume: volume / 100,
            });

            // Comenzamos desde currentTime
            soundRef.current.seek(currentTime);

            if (!isPaused) {
                soundRef.current.play();
            }
        }

        return () => {
            cleanup();
        };
    }, [src]);

    // Manejar play/pause
    useEffect(() => {
        if (soundRef.current) {
            if (isPaused) {
                soundRef.current.pause();
            } else {
                soundRef.current.play();
            }
        }
    }, [isPaused]);

    // Actualizar volumen
    useEffect(() => {
        if (soundRef.current) {
            soundRef.current.volume(volume / 100);
        }
    }, [volume]);

    // Buscar en la canción cuando currentTime cambie
    useEffect(() => {
        if (soundRef.current) {
            const soundCurrentTime = soundRef.current.seek();
            if (Math.abs(soundCurrentTime - currentTime) > 0.5) {
                soundRef.current.seek(currentTime);
            }
        }
    }, [currentTime]);

    // Actualizar currentTime cada segundo
    useEffect(() => {
        let interval = null;

        if (soundRef.current) {
            interval = setInterval(() => {
                if (soundRef.current.playing()) {
                    const time = soundRef.current.seek();
                    setCurrentTime(time);
                }
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [setCurrentTime]);

    return null;
};

export default AudioPlayer;