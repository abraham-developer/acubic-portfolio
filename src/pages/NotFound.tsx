import React, { useEffect, useState } from 'react';

const NotFound: React.FC = () => {
  const [glitchText, setGlitchText] = useState('404');
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchChars = ['4', '0', '4', '#', '@', '%', '&', '*'];

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      
      let iterations = 0;
      const maxIterations = 10;
      
      const textInterval = setInterval(() => {
        setGlitchText(
          glitchChars.map(() => 
            glitchChars[Math.floor(Math.random() * glitchChars.length)]
          ).join('')
        );
        
        iterations++;
        if (iterations >= maxIterations) {
          clearInterval(textInterval);
          setGlitchText('404');
          setIsGlitching(false);
        }
      }, 100);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <style>{`
        .notfound-container {
          background: linear-gradient(135deg, #0a0f1a 0%, #1a2744 50%, #0f1928 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Arial', sans-serif;
        }

        .digital-rain {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .rain-drop {
          position: absolute;
          color: rgba(64, 224, 255, 0.3);
          font-size: 12px;
          font-family: 'Courier New', monospace;
          animation: fall linear infinite;
        }

        @keyframes fall {
          0% {
            transform: translateY(-100vh);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        .error-content {
          text-align: center;
          z-index: 10;
          max-width: 800px;
          padding: 2rem;
        }

        .error-code {
          font-size: 12rem;
          font-weight: 900;
          color: #40e0ff;
          text-shadow: 
            0 0 20px rgba(64, 224, 255, 0.8),
            0 0 40px rgba(64, 224, 255, 0.6),
            0 0 60px rgba(64, 224, 255, 0.4);
          margin-bottom: 1rem;
          line-height: 1;
          letter-spacing: -0.05em;
          position: relative;
        }

        .error-code.glitch {
          animation: textGlitch 0.3s ease-in-out;
        }

        @keyframes textGlitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }

        .error-code::before,
        .error-code::after {
          content: '404';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        .error-code::before {
          color: #ff0040;
          animation: glitchRed 3s infinite linear alternate-reverse;
        }

        .error-code::after {
          color: #00ff40;
          animation: glitchGreen 3s infinite linear alternate-reverse;
        }

        @keyframes glitchRed {
          0% { transform: translate(0); opacity: 0; }
          2% { transform: translate(2px, 0); opacity: 0.8; }
          4% { transform: translate(0); opacity: 0; }
          98% { transform: translate(0); opacity: 0; }
          100% { transform: translate(-2px, 0); opacity: 0.8; }
        }

        @keyframes glitchGreen {
          0% { transform: translate(0); opacity: 0; }
          1% { transform: translate(-2px, 0); opacity: 0.8; }
          3% { transform: translate(0); opacity: 0; }
          97% { transform: translate(0); opacity: 0; }
          99% { transform: translate(2px, 0); opacity: 0.8; }
          100% { transform: translate(0); opacity: 0; }
        }

        .error-title {
          font-size: 2.5rem;
          font-weight: 300;
          color: #ffffff;
          margin-bottom: 1rem;
          letter-spacing: 2px;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
        }

        .error-subtitle {
          font-size: 1.2rem;
          color: #40e0ff;
          margin-bottom: 2rem;
          opacity: 0.8;
          letter-spacing: 1px;
        }

        .error-message {
          font-size: 1.1rem;
          color: #b0c4de;
          line-height: 1.6;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .action-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .action-button {
          padding: 1rem 2rem;
          border: 2px solid rgba(64, 224, 255, 0.4);
          background: rgba(64, 224, 255, 0.1);
          color: #40e0ff;
          text-decoration: none;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .action-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(64, 224, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
        }

        .action-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .action-button:hover {
          border-color: #40e0ff;
          background: rgba(64, 224, 255, 0.2);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(64, 224, 255, 0.3);
          text-shadow: 0 0 15px rgba(64, 224, 255, 0.8);
        }

        .action-button span {
          position: relative;
          z-index: 2;
        }

        .tech-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .info-card {
          background: rgba(26, 39, 68, 0.3);
          border: 1px solid rgba(64, 224, 255, 0.2);
          border-radius: 15px;
          padding: 1.5rem;
          text-align: center;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .info-card:hover {
          border-color: rgba(64, 224, 255, 0.5);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(64, 224, 255, 0.1);
        }

        .info-icon {
          font-size: 2rem;
          color: #40e0ff;
          margin-bottom: 0.5rem;
          display: block;
        }

        .info-title {
          font-size: 1rem;
          color: #ffffff;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .info-description {
          font-size: 0.9rem;
          color: #b0c4de;
          line-height: 1.4;
        }

        .acubic-logo {
          position: absolute;
          top: 2rem;
          left: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          z-index: 20;
        }

        .logo-hex {
          width: 40px;
          height: 35px;
          position: relative;
          filter: drop-shadow(0 0 10px rgba(64, 224, 255, 0.4));
        }

        .logo-hex svg {
          width: 100%;
          height: 100%;
        }

        .logo-path {
          fill: none;
          stroke: #40e0ff;
          stroke-width: 2;
        }

        .logo-a {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #40e0ff;
          font-size: 16px;
          font-weight: bold;
        }

        .logo-text {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 300;
          letter-spacing: 2px;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .error-code {
            font-size: 8rem;
          }
          
          .error-title {
            font-size: 2rem;
          }
          
          .action-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .action-button {
            width: 100%;
            max-width: 300px;
          }
          
          .acubic-logo {
            position: relative;
            top: auto;
            left: auto;
            justify-content: center;
            margin-bottom: 2rem;
          }
        }
      `}</style>

      <div className="notfound-container">
        {/* Digital rain effect */}
        <div className="digital-rain">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>

        {/* ACUBIC Logo */}
        <div className="acubic-logo">
          <div className="logo-hex">
            <svg viewBox="0 0 40 35">
              <g fill="none" stroke="#40e0ff" strokeWidth="2">
                <line x1="8" y1="4" x2="32" y2="4" />
                <line x1="32" y1="4" x2="40" y2="17.5" />
                <line x1="40" y1="17.5" x2="32" y2="31" />
                <line x1="32" y1="31" x2="8" y2="31" />
              </g>
            </svg>
            <div className="logo-a">A</div>
          </div>
          <span className="logo-text">ACUBIC</span>
        </div>

        <div className="error-content">
          {/* Error code with glitch effect */}
          <div className={`error-code ${isGlitching ? 'glitch' : ''}`}>
            {glitchText}
          </div>

          <h1 className="error-title">PÁGINA NO ENCONTRADA</h1>
          <p className="error-subtitle">Esta ruta no existe en nuestro sistema</p>
          
          <p className="error-message">
            Parece que el enlace que buscas se perdió en el ciberespacio. 
            No te preocupes, nuestros sistemas están funcionando perfectamente. 
            Regresa a un lugar seguro o explora nuestras soluciones tecnológicas.
          </p>

          {/* Action buttons */}
          <div className="action-buttons">
            <button className="action-button" onClick={handleGoHome}>
              <span>◆ Ir al Inicio</span>
            </button>
            <button className="action-button" onClick={handleGoBack}>
              <span>◇ Regresar</span>
            </button>
          </div>

          {/* Tech info cards */}
          <div className="tech-info">
            <div className="info-card">
              <span className="info-icon">⚡</span>
              <div className="info-title">Sistema Activo</div>
              <div className="info-description">Todos nuestros servicios operando al 100%</div>
            </div>
            <div className="info-card">
              <span className="info-icon">🔒</span>
              <div className="info-title">Conexión Segura</div>
              <div className="info-description">Tu navegación está protegida</div>
            </div>
            <div className="info-card">
              <span className="info-icon">🚀</span>
              <div className="info-title">Soporte 24/7</div>
              <div className="info-description">Estamos aquí para ayudarte</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;