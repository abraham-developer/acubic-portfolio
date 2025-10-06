import React, { useState, useRef, useEffect } from 'react';
import './VideoIntro.css';

interface VideoIntroProps {
  onVideoEnd: () => void;
}

const VideoIntro: React.FC<VideoIntroProps> = ({ onVideoEnd }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    setIsClicked(true);
  };

  const handleVideoFinish = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onVideoEnd();
    }, 2000); // Tiempo para completar la transición
  };

  useEffect(() => {
    if (isClicked && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error al intentar reproducir el video:", error);
      });
    }
  }, [isClicked]);

  return (
    <div className={`video-intro-container ${isFadingOut ? 'fading-out' : ''}`}>
      {!isClicked ? (
        <div className={`start-overlay ${isClicked ? 'clicked' : ''}`} onClick={handleStart}>
          <h1 className="start-text">INICIAR VIAJE</h1>
          <p className="sub-text">[ Haz clic para explorar ]</p>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            className="video-element"
            src="/video/ACUBIC.mp4"
            playsInline
            onEnded={handleVideoFinish}
            controls={false}
            controlsList="nodownload"
          />
          {/* Overlay que se funde con los colores de la página */}
          <div className={`gradient-overlay ${isFadingOut ? 'active' : ''}`}></div>
        </>
      )}
    </div>
  );
};

export default VideoIntro;