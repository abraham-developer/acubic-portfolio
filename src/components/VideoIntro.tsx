import React, { useState, useRef, useEffect } from 'react';
import './VideoIntro.css';

interface VideoIntroProps {
  onVideoEnd: () => void;
}

const VideoIntro: React.FC<VideoIntroProps> = ({ onVideoEnd }) => {
  const [isClicked, setIsClicked] = useState(false);
  // Nuevo estado para controlar la animación de salida
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    setIsClicked(true);
  };

  // Esta función se ejecuta cuando el video termina
  const handleVideoFinish = () => {
    // 1. Activa el estado de fade-out para que la clase CSS se aplique
    setIsFadingOut(true);

    // 2. Espera a que la animación de 1 segundo termine
    setTimeout(() => {
      // 3. Llama a la función original para mostrar el portafolio
      onVideoEnd();
    }, 1000); // IMPORTANTE: Este tiempo debe coincidir con la transición en el CSS
  };

  useEffect(() => {
    if (isClicked && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error al intentar reproducir el video:", error);
      });
    }
  }, [isClicked]);

  return (
    // Aplicamos la clase de 'fading-out' condicionalmente
    <div className={`video-intro-container ${isFadingOut ? 'fading-out' : ''}`}>
      {!isClicked ? (
        // Aplicamos la clase 'clicked' para que el texto desaparezca con una transición
        <div className={`start-overlay ${isClicked ? 'clicked' : ''}`} onClick={handleStart}>
          <h1 className="start-text">INICIAR VIAJE</h1>
          <p className="sub-text">[ Haz clic para explorar ]</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="video-element"
          src="/video/ACUBIC.mp4"
          playsInline
          // Usamos la nueva función para la transición de salida
          onEnded={handleVideoFinish}
          controls={false}
          controlsList="nodownload"
        />
      )}
    </div>
  );
};

export default VideoIntro;