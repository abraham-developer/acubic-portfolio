import React, { useEffect, useState } from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div>
      <style>{`
        .footer-minimal {
          background: linear-gradient(180deg, 
            rgba(6, 10, 18, 0.8) 0%, 
            rgba(10, 15, 26, 0.95) 100%);
          backdrop-filter: blur(15px);
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(64, 224, 255, 0.2);
        }

        .footer-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(64, 224, 255, 0.5) 50%, 
            transparent 100%);
          animation: footerScan 4s ease-in-out infinite;
        }

        @keyframes footerScan {
          0%, 100% { transform: translateX(-100%); opacity: 0; }
          50% { transform: translateX(0%); opacity: 1; }
        }

        .footer-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 25px 2rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .footer-hex-mini {
          width: 24px;
          height: 21px;
          position: relative;
          filter: drop-shadow(0 0 8px rgba(64, 224, 255, 0.4));
        }

        .footer-hex-mini svg {
          width: 100%;
          height: 100%;
        }

        .footer-hex-path {
          fill: none;
          stroke: #40e0ff;
          stroke-width: 1.5;
          animation: hexPulse 3s ease-in-out infinite;
        }

        @keyframes hexPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .footer-a-mini {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #40e0ff;
          font-size: 10px;
          font-weight: bold;
        }

        .footer-brand-mini {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 1.5px;
          opacity: 1;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .footer-center {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .social-orb {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(64, 224, 255, 0.15);
          border: 1px solid rgba(64, 224, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #40e0ff;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-orb::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(64, 224, 255, 0.1) 0%, transparent 70%);
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.3s ease;
          border-radius: 50%;
        }

        .social-orb:hover::before {
          transform: translate(-50%, -50%) scale(1.5);
        }

        .social-orb:hover {
          border-color: #40e0ff;
          background: rgba(64, 224, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(64, 224, 255, 0.2);
        }

        .footer-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.3rem;
        }

        .copyright-minimal {
          color: #b0c4de;
          font-size: 0.9rem;
          opacity: 0.9;
          letter-spacing: 0.5px;
          font-weight: 300;
        }

        .email-link {
          color: #40e0ff;
          text-decoration: none;
          font-size: 0.9rem;
          opacity: 1;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
          text-shadow: 0 0 5px rgba(64, 224, 255, 0.3);
        }

        .email-link:hover {
          opacity: 1;
          text-shadow: 0 0 8px rgba(64, 224, 255, 0.5);
        }

        .footer-particles {
          position: absolute;
          width: 1px;
          height: 1px;
          background: #40e0ff;
          border-radius: 50%;
          opacity: 0.3;
          animation: particleDrift 15s linear infinite;
        }

        @keyframes particleDrift {
          0% {
            transform: translateX(-20px) translateY(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(calc(100vw + 20px)) translateY(-10px);
            opacity: 0;
          }
        }

        .mouse-trail {
          position: absolute;
          width: 2px;
          height: 2px;
          background: radial-gradient(circle, rgba(64, 224, 255, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          transition: all 0.1s ease;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 1rem;
            padding: 15px 1rem;
            text-align: center;
          }

          .footer-right {
            align-items: center;
          }

          .footer-center {
            order: -1;
          }
        }
      `}</style>

      <footer className="footer-minimal">
        {/* Línea de glow superior */}
        <div className="footer-glow"></div>

        {/* Partículas flotantes */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="footer-particles"
            style={{
              top: `${Math.random() * 100}%`,
              left: '-20px',
              animationDelay: `${i * 3}s`
            }}
          />
        ))}

        {/* Trail del mouse */}
        <div 
          className="mouse-trail"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            opacity: 0.2
          }}
        />

        <div className="footer-content">
          {/* Logo y marca */}
          <div className="footer-left">
            <div className="footer-hex-mini">
              <svg viewBox="0 0 24 21">
                <path 
                  className="footer-hex-path" 
                  d="M6 0 L18 0 L24 10.5 L18 21 L6 21 L0 10.5 Z"
                />
              </svg>
              <div className="footer-a-mini">A</div>
            </div>
            <span className="footer-brand-mini">ACUBIC</span>
          </div>

          {/* Redes sociales minimalistas */}
          <div className="footer-center">
            <a href="https://github.com/abrahamdev" className="social-orb" title="GitHub">◆</a>
            <a href="https://linkedin.com/in/abrahamdev" className="social-orb" title="LinkedIn">◇</a>
            <a href="https://twitter.com/abrahamdev" className="social-orb" title="Twitter">◈</a>
            <a href="mailto:desarrollo@abrahamdev.net" className="social-orb" title="Email">◉</a>
          </div>

          {/* Copyright y contacto */}
          <div className="footer-right">
            <div className="copyright-minimal">© {currentYear} Abraham Dev</div>
            <a href="mailto:desarrollo@abrahamdev.net" className="email-link">
              desarrollo@abrahamdev.net
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;