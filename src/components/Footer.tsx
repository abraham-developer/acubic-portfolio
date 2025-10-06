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
          border-top: 1px solid rgba(9, 1, 37, 0.2);
        }

        .footer-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(0, 48, 58, 0.5) 50%, 
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
          stroke: #003d49ff;
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
          color: #002026ff;
          font-size: 10px;
          font-weight: bold;
        }

        .footer-brand-mini {
          color: #000740ff;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 1.5px;
          opacity: 1;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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
          background: rgba(255, 255, 255, 0.15);
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

        .social-icon {
          width: 18px;
          height: 18px;
          position: relative;
          z-index: 2;
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
            <a 
              href="https://github.com/abraham-developer" 
              className="social-orb" 
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/angel-abraham-rivera-2aa977331" 
              className="social-orb" 
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="mailto:desarrollo@abrahamdev.net" 
              className="social-orb" 
              title="Email"
            >
              <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
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