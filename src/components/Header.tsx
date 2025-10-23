import React, { useState, useEffect } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
    { id: 'home', label: 'INICIO', icon: '🏠', description: 'Página principal' },
    { id: 'about', label: 'HISTORIA', icon: '📖', description: 'Trayectoria profesional' },
    { id: 'skills', label: 'TECNOLOGÍAS', icon: '⚡', description: 'Stack tecnológico' },
    { id: 'portfolio', label: 'PROYECTOS', icon: '💼', description: 'Portafolio' },
    { id: 'contact', label: 'CONTACTO', icon: '✉️', description: 'Información de contacto' }
  ];
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <div className="logo" onClick={() => scrollToSection('home')}>
            <div className="logo-cube">
              <svg viewBox="0 0 40 40" className="cube-svg">
                <g className="cube-lines">
                  <path d="M 20 5 L 35 12.5 L 35 27.5 L 20 35 L 5 27.5 L 5 12.5 Z" />
                  <path d="M 20 5 L 20 20 M 5 12.5 L 20 20 M 35 12.5 L 20 20" />
                </g>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-brand">Cubeark</span>
              <span className="logo-tagline">by Abraham Rivera</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="header-actions">
            {/* <a 
              href="/public/CV_Angel_Abraham_Rivera.pdf" 
              download="CV_Angel_Abraham_Rivera.pdf" 
              className="action-btn"
              title="Descargar CV"
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span className="btn-label">CV</span>
            </a> */}
            
            <a 
              href="https://github.com/abraham-developer" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="action-btn"
              title="Ver GitHub"
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="btn-label">GitHub</span>
            </a>
            
            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
              <span className="menu-icon"></span>
              <span className="menu-icon"></span>
              <span className="menu-icon"></span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Navigation Menu */}
      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-overlay" onClick={toggleMenu}></div>
        <div className="nav-content">
          <button className="nav-close" onClick={toggleMenu} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="nav-grid">
            {navItems.map((item) => (
              <div 
                key={item.id}
                className={`nav-card ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <h3 className="nav-title">{item.label}</h3>
                <p className="nav-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;