import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
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
    { id: 'home', label: 'INICIO', icon: '◆' },
    { id: 'about', label: 'HISTORIA', icon: '◈' },
    { id: 'skills', label: 'SKILLS', icon: '◇' },
    { id: 'portfolio', label: 'PORTFOLIO', icon: '◉' },
    { id: 'contact', label: 'CONTACTO', icon: '◎' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div>
      <style>{`
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

        .nav-container {
          position: relative;
        }

        .nav-trigger {
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
          position: relative;
          overflow: hidden;
        }

        .nav-trigger:hover {
          background: rgba(64, 224, 255, 0.2);
          border-color: #40e0ff;
          transform: scale(1.1);
          box-shadow: 0 0 30px rgba(64, 224, 255, 0.3);
        }

        .nav-trigger::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          background: conic-gradient(from 0deg, transparent, #40e0ff, transparent);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: spin 3s linear infinite;
          opacity: 0.3;
        }

        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .nav-icon {
          color: #40e0ff;
          font-size: 1.5rem;
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .nav-trigger.active .nav-icon {
          transform: rotate(180deg);
        }

        .nav-menu {
          position: absolute;
          top: 70px;
          right: 0;
          background: rgba(15, 25, 40, 0.95);
          border: 1px solid rgba(64, 224, 255, 0.3);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          padding: 1rem 0;
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-20px) scale(0.9);
          transition: all 0.3s ease;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .nav-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .nav-item {
          padding: 0.8rem 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-left: 3px solid transparent;
        }

        .nav-item:hover {
          background: rgba(64, 224, 255, 0.1);
          border-left-color: #40e0ff;
          transform: translateX(5px);
        }

        .nav-item.active {
          background: rgba(64, 224, 255, 0.15);
          border-left-color: #40e0ff;
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: #40e0ff;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
          50% { opacity: 0.5; transform: translateY(-50%) scale(1.2); }
        }

        .nav-item-icon {
          color: #40e0ff;
          font-size: 1.2rem;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .nav-item:hover .nav-item-icon,
        .nav-item.active .nav-item-icon {
          opacity: 1;
          transform: scale(1.2);
        }

        .nav-item-label {
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 300;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .nav-item:hover .nav-item-label,
        .nav-item.active .nav-item-label {
          color: #40e0ff;
          text-shadow: 0 0 10px rgba(64, 224, 255, 0.5);
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .header-content {
            padding: 1rem;
          }
          
          .logo-text {
            font-size: 1rem;
            letter-spacing: 2px;
          }
          
          .nav-trigger {
            width: 50px;
            height: 50px;
          }
          
          .nav-menu {
            right: -1rem;
            min-width: 180px;
          }
        }
      `}</style>

      <header className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-backdrop"></div>
        
        <div className="header-content">
          {/* Logo */}
          <div className="logo-section" onClick={() => scrollToSection('home')}>
            <div className="logo-hex">
              <svg viewBox="0 0 40 35">
                <path 
                  className="logo-path" 
                  d="M10 0 L30 0 L40 17.5 L30 35 L10 35 L0 17.5 Z"
                />
              </svg>
              <div className="logo-a">A</div>
            </div>
            <span className="logo-text">ACUBIC</span>
          </div>

          {/* Navigation */}
          <div className="nav-container">
            <div 
              className={`nav-trigger ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="nav-icon">◊</span>
            </div>

            <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <span className="nav-item-icon">{item.icon}</span>
                  <span className="nav-item-label">{item.label}</span>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;