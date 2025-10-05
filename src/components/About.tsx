import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStory, setActiveStory] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStory((prev) => (prev + 1) % 4);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const storySteps = [
    {
      year: "2018",
      title: "El Inicio del Código",
      description: "Todo comenzó con C# y la pasión por resolver problemas complejos. Desde el primer 'Hello World', supe que escribir código sería mi forma de crear impacto en el mundo digital.",
      icon: "💻",
      color: "#40e0ff"
    },
    {
      year: "2020",
      title: "Arquitecturas Escalables",
      description: "Profundicé en .NET, APIs REST, microservicios y bases de datos. Cada proyecto me enseñó que el buen código no solo funciona, sino que evoluciona con las necesidades del negocio.",
      icon: "🚀",
      color: "#64b5f6"
    },
    {
      year: "2022",
      title: "ACUBIC Nace",
      description: "Fundé ACUBIC como mi sello personal: Abraham Cubic. Un espacio donde convergen automatización, integraciones y soluciones cloud que realmente transforman operaciones empresariales.",
      icon: "⭐",
      color: "#81c784"
    },
    {
      year: "2025",
      title: "Full-Stack Evolution",
      description: "De C# a TypeScript, de SQL a NoSQL, de monolitos a microservicios. Hoy domino el stack completo y creo sistemas que escalan, se integran y evolucionan con el negocio.",
      icon: "🌟",
      color: "#ffb74d"
    }
  ];

  return (
    <div>
      <style>{`
        .about-section {
          background: linear-gradient(135deg, #0a0f1a 0%, #1a2744 50%, #0f1928 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 100px 0;
        }

        .floating-code {
          position: absolute;
          font-family: 'Courier New', monospace;
          color: rgba(64, 224, 255, 0.1);
          font-size: 14px;
          pointer-events: none;
          animation: floatCode 20s linear infinite;
        }

        @keyframes floatCode {
          0% { transform: translateY(100vh) translateX(-50px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
        }

        .neural-network {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.05;
        }

        .neural-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #40e0ff;
          border-radius: 50%;
          animation: neuralPulse 3s ease-in-out infinite;
        }

        @keyframes neuralPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        .story-container {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-title {
          text-align: center;
          margin-bottom: 4rem;
        }

        .title-main {
          font-size: 3.5rem;
          font-weight: 300;
          color: #ffffff;
          margin-bottom: 1rem;
          letter-spacing: 4px;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
        }

        .title-subtitle {
          font-size: 1.2rem;
          color: #40e0ff;
          letter-spacing: 2px;
          opacity: 0.8;
        }

        .timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, #40e0ff, transparent);
          transform: translateX(-50%);
        }

        .story-step {
          display: flex;
          align-items: center;
          opacity: 0.4;
          transition: all 0.6s ease;
          position: relative;
        }

        .story-step.active {
          opacity: 1;
        }

        .story-step:nth-child(even) {
          flex-direction: row-reverse;
        }

        .story-content {
          flex: 1;
          padding: 2rem;
          background: rgba(26, 39, 68, 0.3);
          border-radius: 20px;
          border: 1px solid rgba(64, 224, 255, 0.2);
          backdrop-filter: blur(10px);
          margin: 0 2rem;
          position: relative;
          transition: all 0.6s ease;
          overflow: hidden;
        }

        .story-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent,
            rgba(64, 224, 255, 0.1),
            transparent
          );
          transition: all 0.6s ease;
        }

        .story-step:hover .story-content::before,
        .story-step.active .story-content::before {
          left: 100%;
        }
        
        .story-step.active .story-content {
          background: rgba(26, 39, 68, 0.6);
          border-color: rgba(64, 224, 255, 0.8);
          transform: scale(1.02);
          box-shadow: 
            0 20px 40px rgba(64, 224, 255, 0.2),
            inset 0 0 60px rgba(64, 224, 255, 0.1),
            0 0 80px rgba(64, 224, 255, 0.15);
        }
        
        .story-step:hover .story-content {
          background: rgba(26, 39, 68, 0.5);
          border-color: rgba(64, 224, 255, 0.6);
          box-shadow: 
            0 15px 35px rgba(64, 224, 255, 0.15),
            inset 0 0 40px rgba(64, 224, 255, 0.08),
            0 0 60px rgba(64, 224, 255, 0.1);
        }

        .story-year {
          font-size: 3rem;
          font-weight: bold;
          color: #40e0ff;
          text-shadow: 0 0 20px rgba(64, 224, 255, 0.8);
          margin-bottom: 1rem;
          display: block;
        }

        .story-title {
          font-size: 1.8rem;
          color: #ffffff;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .story-description {
          font-size: 1.1rem;
          color: #b0c4de;
          line-height: 1.8;
          text-align: justify;
        }

        .story-icon {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 60px;
          height: 60px;
          background: rgba(15, 25, 40, 0.95);
          border: 2px solid #40e0ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          z-index: 10;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.4s ease;
        }

        .story-step:hover .story-icon,
        .story-step.active .story-icon {
          opacity: 1;
          transform: scale(1);
          box-shadow: 0 0 20px rgba(64, 224, 255, 0.4);
        }

        .story-step.active .story-icon {
          animation: iconPulse 2s ease-in-out infinite alternate;
        }

        @keyframes iconPulse {
          0% { box-shadow: 0 0 20px rgba(64, 224, 255, 0.4); }
          100% { box-shadow: 0 0 30px rgba(64, 224, 255, 0.7); }
        }

        .developer-quote {
          text-align: center;
          margin-top: 4rem;
          padding: 2rem;
          background: rgba(64, 224, 255, 0.05);
          border-radius: 20px;
          border: 1px solid rgba(64, 224, 255, 0.1);
        }

        .quote-text {
          font-size: 1.3rem;
          color: #ffffff;
          font-style: italic;
          margin-bottom: 1rem;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .quote-author {
          color: #40e0ff;
          font-weight: 600;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .title-main {
            font-size: 2.5rem;
            letter-spacing: 2px;
          }
          
          .timeline-line {
            left: 2rem;
          }
          
          .story-step, .story-step:nth-child(even) {
            flex-direction: row;
          }
          
          .story-content {
            margin-left: 4rem;
            margin-right: 1rem;
          }
          
          .story-icon {
            top: 10px;
            right: 10px;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }
        }
      `}</style>

      <section ref={sectionRef} id="about" className="about-section">
        {/* Código flotante de fondo */}
        <div className="floating-code" style={{ left: '10%', animationDelay: '0s' }}>
          const developer = new Abraham();
        </div>
        <div className="floating-code" style={{ left: '80%', animationDelay: '5s' }}>
          while(coding) &#123; createMagic(); &#125;
        </div>
        <div className="floating-code" style={{ left: '30%', animationDelay: '10s' }}>
          function buildFuture() &#123; return innovation; &#125;
        </div>
        <div className="floating-code" style={{ left: '70%', animationDelay: '15s' }}>
          ACUBIC.initialize(passion, code);
        </div>

        {/* Red neuronal de fondo */}
        <div className="neural-network">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="neural-dot"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="story-container">
          {/* Título de la sección */}
          <div className="section-title">
            <h2 className="title-main">MI TRAYECTORIA</h2>
            <p className="title-subtitle">De las primeras líneas de código a arquitecturas empresariales</p>
          </div>

          {/* Timeline */}
          <div className="timeline">
            <div className="timeline-line"></div>
            
            {storySteps.map((step, index) => (
              <div 
                key={index}
                className={`story-step ${activeStory === index ? 'active' : ''}`}
              >
                <div className="story-content">
                  <span className="story-year">{step.year}</span>
                  <h3 className="story-title">{step.title}</h3>
                  <p className="story-description">{step.description}</p>
                </div>
                <div className="story-icon">
                  {step.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;