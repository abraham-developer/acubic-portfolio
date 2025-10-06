import React, { useState, useEffect } from 'react';
const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPlane, setShowPlane] = useState(true);
  const [menuReady, setMenuReady] = useState(false);
  const [showCrash, setShowCrash] = useState(false);
  const [planePosition, setPlanePosition] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { id: 'home', label: 'INICIO', icon: '🏠', description: 'Volver al origen' },
    { id: 'about', label: 'HISTORIA', icon: '📖', description: 'Mi trayectoria' },
    { id: 'skills', label: 'SKILLS', icon: '⚡', description: 'Stack tecnológico' },
    { id: 'portfolio', label: 'PORTFOLIO', icon: '💼', description: 'Proyectos destacados' },
    { id: 'contact', label: 'CONTACTO', icon: '✉️', description: 'Conectemos' }
  ];
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    handleCloseMenu();
  };
  
  const handleToggleMenu = () => {
    if (!isMenuOpen && !isAnimating) {
      setIsAnimating(true);
      
      const planeButton = document.querySelector('.plane-button');
      if (planeButton) {
        const rect = planeButton.getBoundingClientRect();
        setPlanePosition({
          top: rect.top + rect.height / 2,
          left: rect.left + rect.width / 2
        });
      }
      
      setTimeout(() => {
        setShowPlane(false);
      }, 1600);
      
      setTimeout(() => {
        setShowCrash(true);
      }, 1700);
      
      setTimeout(() => {
        setMenuReady(true);
        setShowCrash(false);
      }, 1900);
      
      setTimeout(() => {
        setIsMenuOpen(true);
        setIsAnimating(false);
      }, 2000);
    }
  };
  
  const handleCloseMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setMenuReady(false);
      setTimeout(() => {
        setShowPlane(true);
      }, 600);
    }
  };
  
  return (
    <div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .header-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          pointer-events: none;
        }
        .header-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(180deg, 
            rgba(10, 15, 26, 0.95) 0%, 
            rgba(10, 15, 26, 0.8) 50%, 
            rgba(10, 15, 26, 0) 100%);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          opacity: 0;
        }
        .header-container.scrolled .header-backdrop {
          opacity: 1;
        }
        .header-content {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
          pointer-events: auto;
        }
        .logo-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10002;
          position: relative;
        }
        .logo-section:hover {
          transform: scale(1.05);
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
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawLogo 2s ease-in-out forwards;
        }
        @keyframes drawLogo {
          to { stroke-dashoffset: 0; }
        }
        .logo-a {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #40e0ff;
          font-size: 16px;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(64, 224, 255, 0.8);
        }
        .logo-text {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 300;
          letter-spacing: 3px;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        .actions-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          z-index: 10002;
        }
        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.2rem;
          background: rgba(64, 224, 255, 0.1);
          border: 2px solid rgba(64, 224, 255, 0.3);
          border-radius: 25px;
          color: #40e0ff;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .action-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(64, 224, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }
        .action-btn:hover::before {
          width: 200%;
          height: 200%;
        }
        .action-btn:hover {
          background: rgba(64, 224, 255, 0.2);
          border-color: #40e0ff;
          transform: translateY(-2px);
          box-shadow: 
            0 10px 30px rgba(64, 224, 255, 0.3),
            0 0 20px rgba(64, 224, 255, 0.2);
        }
        .btn-icon {
          width: 20px;
          height: 20px;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 0 5px rgba(64, 224, 255, 0.6));
        }
        .btn-label {
          position: relative;
          z-index: 1;
          text-shadow: 0 0 10px rgba(64, 224, 255, 0.5);
        }
        .cv-btn:hover {
          animation: cvPulse 0.6s ease-in-out;
        }
        @keyframes cvPulse {
          0%, 100% { transform: translateY(-2px) scale(1); }
          50% { transform: translateY(-2px) scale(1.05); }
        }
        .github-btn:hover .btn-icon {
          animation: githubRotate 0.6s ease-in-out;
        }
        @keyframes githubRotate {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        .plane-trigger {
          position: relative;
          width: 60px;
          height: 60px;
          z-index: 10002;
        }
        .plane-button {
          width: 60px;
          height: 60px;
          background: rgba(64, 224, 255, 0.1);
          border: 2px solid rgba(64, 224, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: absolute;
          top: 0;
          right: 0;
        }
        .plane-button:hover {
          background: rgba(64, 224, 255, 0.2);
          border-color: #40e0ff;
          transform: scale(1.1);
          box-shadow: 0 0 30px rgba(64, 224, 255, 0.3);
        }
        .paper-plane {
          position: relative;
          z-index: 10003;
        }
        .paper-plane svg {
          width: 28px;
          height: 28px;
          fill: none;
          stroke: #40e0ff;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 8px rgba(64, 224, 255, 0.8));
        }
        .paper-plane.flying {
          position: fixed;
          animation: straightToCenter 1.7s ease-in-out forwards;
        }
        @keyframes straightToCenter {
          0% {
            top: var(--start-top, 50px);
            left: var(--start-left, calc(100vw - 80px));
            transform: rotate(150deg) scale(1);
            opacity: 1;
          }
          70% {
            top: 50vh;
            left: 50vw;
            transform: rotate(150deg) scale(1);
            opacity: 1;
          }
          80% {
            transform: rotate(155deg) scale(1.3);
            opacity: 0.9;
          }
          90% {
            transform: rotate(145deg) scale(0.7);
            opacity: 0.7;
          }
          95% {
            transform: rotate(150deg) scale(1.1);
            opacity: 0.4;
          }
          100% {
            top: 50vh;
            left: 50vw;
            transform: rotate(150deg) scale(0);
            opacity: 0;
          }
        }
        .crash-effect {
          position: fixed;
          top: 50vh;
          left: 50vw;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(64, 224, 255, 0.9) 0%, transparent 70%);
          pointer-events: none;
          opacity: 0;
          transform: translate(-50%, -50%);
          z-index: 10004;
        }
        .crash-effect.active {
          animation: crashExplosion 0.6s ease-out;
        }
        @keyframes crashExplosion {
          0% {
            width: 0;
            height: 0;
            opacity: 0;
            box-shadow: 0 0 0 0 rgba(64, 224, 255, 0.8);
          }
          50% {
            width: 200px;
            height: 200px;
            opacity: 0.9;
            box-shadow: 0 0 40px 20px rgba(64, 224, 255, 0.6);
          }
          100% {
            width: 400px;
            height: 400px;
            opacity: 0;
            box-shadow: 0 0 60px 30px rgba(64, 224, 255, 0);
          }
        }
        .particles-container {
          position: fixed;
          top: 50vh;
          left: 50vw;
          pointer-events: none;
          z-index: 10005;
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #40e0ff;
          border-radius: 50%;
          opacity: 0;
          filter: drop-shadow(0 0 5px rgba(64, 224, 255, 0.8));
        }
        .particles-container.active .particle {
          animation: particleFly 0.8s ease-out forwards;
        }
        @keyframes particleFly {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          30% {
            opacity: 1;
            transform: translate(var(--particle-x), var(--particle-y)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--particle-x), var(--particle-y)) scale(0.3);
          }
        }
        .shockwave {
          position: fixed;
          top: 50vh;
          left: 50vw;
          width: 0;
          height: 0;
          border: 2px solid rgba(64, 224, 255, 0.5);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transform: translate(-50%, -50%);
          z-index: 10003;
        }
        .shockwave.active {
          animation: shockwaveExpand 0.8s ease-out;
        }
        @keyframes shockwaveExpand {
          0% {
            width: 0;
            height: 0;
            opacity: 0.8;
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(10, 15, 26, 0.98);
          backdrop-filter: blur(20px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10000;
          pointer-events: none;
        }
        .menu-overlay.ready {
          visibility: visible;
          pointer-events: auto;
        }
        .menu-overlay.open {
          opacity: 1;
        }
        .menu-explosion {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50px;
          height: 50px;
          transform: translate(-50%, -50%);
          opacity: 0;
        }
        .menu-overlay.open .menu-explosion {
          animation: explode 0.6s ease-out forwards;
        }
        @keyframes explode {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
            box-shadow: 0 0 100px 50px rgba(64, 224, 255, 0.8);
          }
          100% {
            width: 200vw;
            height: 200vh;
            opacity: 0;
            box-shadow: 0 0 200px 100px rgba(64, 224, 255, 0);
          }
        }
        .menu-grid {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(64, 224, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(64, 224, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        .menu-content {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10001;
          padding: 2rem;
        }
        .menu-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          background: transparent;
          border: 2px solid rgba(64, 224, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #40e0ff;
          font-size: 24px;
          z-index: 10003;
        }
        .menu-close:hover {
          background: rgba(64, 224, 255, 0.1);
          border-color: #40e0ff;
          transform: rotate(90deg) scale(1.1);
          box-shadow: 0 0 30px rgba(64, 224, 255, 0.5);
        }
        .nav-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          width: 100%;
          animation: menuItemsAppear 0.8s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
        @keyframes menuItemsAppear {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .nav-card {
          background: rgba(26, 39, 68, 0.2);
          border: 1px solid rgba(64, 224, 255, 0.2);
          border-radius: 20px;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        .nav-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            transparent, 
            rgba(64, 224, 255, 0.1), 
            transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .nav-card:hover::before {
          transform: translateX(100%);
        }
        .nav-card:hover {
          background: rgba(26, 39, 68, 0.4);
          border-color: #40e0ff;
          transform: translateY(-10px) scale(1.05);
          box-shadow: 
            0 20px 40px rgba(64, 224, 255, 0.3),
            0 0 60px rgba(64, 224, 255, 0.1);
        }
        .nav-card.active {
          background: rgba(64, 224, 255, 0.1);
          border-color: #40e0ff;
          box-shadow: 
            0 0 30px rgba(64, 224, 255, 0.4),
            inset 0 0 30px rgba(64, 224, 255, 0.1);
        }
        .nav-card-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
          animation: iconFloat 3s ease-in-out infinite;
        }
        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .nav-card:hover .nav-card-icon {
          animation-duration: 1s;
        }
        .nav-card-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
          letter-spacing: 2px;
        }
        .nav-card-description {
          font-size: 0.9rem;
          color: #8fa8b6;
          line-height: 1.4;
        }
        .nav-card:hover .nav-card-title {
          background: linear-gradient(45deg, #40e0ff, #64dcff, #40e0ff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: holographic 2s linear infinite;
        }
        @keyframes holographic {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        @media (max-width: 768px) {
          .header-content {
            padding: 1rem;
          }
          .logo-text {
            font-size: 1rem;
            letter-spacing: 2px;
          }
          .actions-container {
            gap: 0.5rem;
          }
          .action-btn {
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
          }
          .btn-icon {
            width: 18px;
            height: 18px;
          }
          .btn-label {
            display: none;
          }
          .plane-button {
            width: 50px;
            height: 50px;
          }
          .paper-plane svg {
            width: 24px;
            height: 24px;
          }
          .nav-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
          .nav-card {
            padding: 1.5rem;
          }
          .nav-card-icon {
            font-size: 2rem;
          }
          .nav-card-title {
            font-size: 1.2rem;
          }
          .menu-close {
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
      <header className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-backdrop"></div>
        <div className="header-content">
          <div className="logo-section" onClick={() => scrollToSection('home')}>
            <div className="logo-hex">
              <svg viewBox="0 0 40 35">
                <path className="logo-path" d="M10 0 L30 0 L40 17.5 L30 35 L10 35 L0 17.5 Z"/>
              </svg>
              <div className="logo-a">A</div>
            </div>
            <span className="logo-text">ACUBIC</span>
          </div>
          <div className="actions-container">
            <a href="/CV_Angel_Abraham_Rivera.pdf" download="CV_Angel_Abraham_Rivera.pdf" className="action-btn cv-btn" title="Descargar CV">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span className="btn-label">CV</span>
            </a>
            <a href="https://github.com/abraham-developer" target="_blank" rel="noopener noreferrer" className="action-btn github-btn" title="Ver GitHub">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="btn-label">GitHub</span>
            </a>
            <div className="plane-trigger">
              {showPlane && (
                <div className="plane-button" onClick={handleToggleMenu}>
                  <div className="paper-plane">
                    <svg viewBox="0 0 24 24">
                      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                    </svg>
                  </div>
                </div>
              )}
              {isAnimating && (
                <div className="paper-plane flying" style={{'--start-top': `${planePosition.top}px`, '--start-left': `${planePosition.left}px`} as React.CSSProperties}>
                  <svg viewBox="0 0 24 24">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
        {showCrash && (
          <>
            <div className="crash-effect active"></div>
            <div className="shockwave active"></div>
            <div className="particles-container active">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="particle" style={{'--particle-x': `${Math.cos((i*30)*Math.PI/180)*80}px`, '--particle-y': `${Math.sin((i*30)*Math.PI/180)*80}px`, animationDelay: `${i*0.05}s`} as React.CSSProperties}></div>
              ))}
            </div>
          </>
        )}
      </header>
      <div className={`menu-overlay ${menuReady ? 'ready' : ''} ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-explosion"></div>
        <div className="menu-grid"></div>
        <div className="menu-content">
          <button className="menu-close" onClick={handleCloseMenu}>×</button>
          <div className="nav-grid">
            {navItems.map((item) => (
              <div key={item.id} className={`nav-card ${activeSection === item.id ? 'active' : ''}`} onClick={() => scrollToSection(item.id)}>
                <span className="nav-card-icon">{item.icon}</span>
                <h3 className="nav-card-title">{item.label}</h3>
                <p className="nav-card-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;