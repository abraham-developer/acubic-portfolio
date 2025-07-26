import React, { useEffect } from 'react';

const Hero: React.FC = () => {
  useEffect(() => {
    // Generar estrellas aleatorias
    const createStars = () => {
      const starsContainer = document.getElementById('stars');
      if (!starsContainer) return;
      
      const numStars = 150;
      starsContainer.innerHTML = ''; // Limpiar estrellas existentes

      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.opacity = (Math.random() * 0.8 + 0.2).toString();
        starsContainer.appendChild(star);
      }
    };

    createStars();

    // Efecto de parallax suave en las partículas
    const handleMouseMove = (e: MouseEvent) => {
      const particles = document.querySelectorAll('.particle');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.02;
        const moveX = (x - 0.5) * 20 * speed;
        const moveY = (y - 0.5) * 20 * speed;
        
        (particle as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      {/* Estilos CSS */}
      <style>{`
        /* Reset global styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        /* Hero Section Styles */
        .hero-section {
          background: radial-gradient(ellipse at center, #1a2744 0%, #0f1928 50%, #0a0f1a 100%);
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        /* Animaciones */
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes rotate {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(360deg); }
        }

        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }

        @keyframes glow {
          0% { 
            stroke-width: 3;
            filter: drop-shadow(0 0 5px #40e0ff);
          }
          100% { 
            stroke-width: 4;
            filter: drop-shadow(0 0 15px #40e0ff);
          }
        }

        @keyframes pulse {
          0% { 
            transform: translate(-50%, -50%) scale(1);
            text-shadow: 0 0 20px rgba(64, 224, 255, 0.8);
          }
          100% { 
            transform: translate(-50%, -50%) scale(1.05);
            text-shadow: 0 0 30px rgba(64, 224, 255, 1);
          }
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.2);
            opacity: 1;
          }
          50% {
            transform: translateY(-15px) translateX(-5px) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-25px) translateX(15px) scale(1.1);
            opacity: 0.8;
          }
        }

        /* Aplicar animaciones */
        .star {
          animation: twinkle 3s infinite;
        }

        .hexagon {
          width: 120px;
          height: 104px;
          animation: float 6s ease-in-out infinite;
          position: relative;
          margin: 0 auto;
        }

        .hexagon-container {
          filter: drop-shadow(0 0 30px rgba(64, 224, 255, 0.4));
          position: relative;
          margin-bottom: 40px;
        }

        .hexagon-inner {
          animation: rotate 20s linear infinite;
          width: 100%;
          height: 100%;
          position: relative;
        }

        .hexagon-path {
          fill: none;
          stroke: #40e0ff;
          stroke-width: 3;
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: drawPath 3s ease-in-out forwards, glow 2s ease-in-out infinite alternate;
        }

        .letter-a {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 48px;
          font-weight: bold;
          color: #40e0ff;
          text-shadow: 0 0 20px rgba(64, 224, 255, 0.8);
          animation: pulse 2s ease-in-out infinite alternate;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #40e0ff, #64b5f6);
          border-radius: 50%;
          opacity: 0.6;
          animation: particleFloat 8s infinite ease-in-out;
        }

        .particle-1 {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }

        .particle-2 {
          top: 60%;
          left: 80%;
          animation-delay: 2s;
        }

        .particle-3 {
          top: 30%;
          left: 70%;
          animation-delay: 4s;
        }

        .particle-4 {
          top: 80%;
          left: 25%;
          animation-delay: 1s;
        }

        .particle-5 {
          top: 15%;
          left: 85%;
          animation-delay: 3s;
        }

        /* Estilos de texto */
        .main-text {
          font-size: 56px;
          font-weight: 300;
          letter-spacing: 12px;
          color: #ffffff;
          margin-bottom: 20px;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
        }

        .subtext {
          font-size: 18px;
          color: #40e0ff;
          letter-spacing: 3px;
          margin-bottom: 10px;
          opacity: 0.8;
        }

        .developer-text {
          font-size: 14px;
          color: #8fa8b6;
          letter-spacing: 1px;
          opacity: 0.7;
        }

        .logo-container {
          text-align: center;
          position: relative;
          z-index: 10;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .main-text {
            font-size: 36px !important;
            letter-spacing: 8px;
          }
          
          .hexagon {
            width: 100px;
            height: 87px;
          }
          
          .letter-a {
            font-size: 36px !important;
          }
        }
      `}</style>

      <section id="home" className="hero-section">
        {/* Estrellas de fondo */}
        <div 
          id="stars" 
          className="absolute w-full h-full overflow-hidden"
        />

        {/* Partículas flotantes */}
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
        <div className="particle particle-5" />

        <div className="logo-container">
          {/* Hexágono con letra A */}
          <div className="hexagon-container">
            <div className="hexagon">
              <div className="hexagon-inner">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 120 104">
                  <path 
                    className="hexagon-path" 
                    d="M30 0 L90 0 L120 52 L90 104 L30 104 L0 52 Z"
                  />
                </svg>
              </div>
              <div className="letter-a">A</div>
            </div>
          </div>

          {/* Texto principal */}
          <h1 className="main-text">ACUBIC</h1>
          
          {/* Subtextos */}
          <p className="subtext">SOFTWARE DEVELOPMENT</p>
          <p className="developer-text">Abraham Rivera • abrahamdev.net</p>
        </div>
      </section>
    </div>
  );
};

export default Hero;