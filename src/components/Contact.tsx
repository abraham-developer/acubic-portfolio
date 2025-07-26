import React, { useState, useEffect } from 'react';

const Contact: React.FC = () => {
 
  const [pulseIndex, setPulseIndex] = useState(0);

  const contactActions = [
    {
      id: 'validate',
      title: 'Validar Proyecto',
      subtitle: 'Analicemos tu idea',
      message: 'Contacta para validar viabilidad técnica',
      method: 'email',
      value: 'desarrollo@abrahamdev.net',
      icon: '◈',
      color: '#40e0ff',
      action: () => window.open('mailto:desarrollo@abrahamdev.net?subject=Validación de Proyecto - ACUBIC&body=Hola! Me gustaría validar la viabilidad técnica de mi proyecto.', '_blank')
    },
    {
      id: 'quote',
      title: 'Solicitar Cotización',
      subtitle: 'Presupuesto personalizado',
      message: 'Obtén una propuesta técnica detallada',
      method: 'phone',
      value: '55 3889 1487',
      icon: '◇',
      color: '#64b5f6',
      action: () => window.open('tel:+525538891487', '_self')
    },
    {
      id: 'integration',
      title: 'Integración Urgente',
      subtitle: 'Solución rápida',
      message: 'Necesitas conectar sistemas ya mismo',
      method: 'whatsapp',
      value: 'WhatsApp directo',
      icon: '◆',
      color: '#25d366',
      action: () => window.open('https://wa.me/525538891487?text=Hola! Necesito una integración urgente para mi sistema.', '_blank')
    },
    {
      id: 'consultation',
      title: 'Consultoría Tech',
      subtitle: 'Asesoría especializada',
      message: 'Optimiza tu arquitectura actual',
      method: 'email',
      value: 'desarrollo@abrahamdev.net',
      icon: '◉',
      color: '#ff9800',
      action: () => window.open('mailto:desarrollo@abrahamdev.net?subject=Consultoría Técnica - ACUBIC&body=Hola! Me interesa una consultoría para optimizar mi arquitectura tecnológica.', '_blank')
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % contactActions.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [contactActions.length]);

  return (
    <div>
      <style>{`
        .contact-section {
          background: linear-gradient(135deg, #0a0f1a 0%, #1a2744 50%, #0f1928 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 100px 0;
        }

        .contact-particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle-orb {
          position: absolute;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, rgba(64, 224, 255, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          animation: orbFloat 12s infinite ease-in-out;
        }

        @keyframes orbFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-30px) translateX(20px) scale(1.2);
            opacity: 0.8;
          }
          66% {
            transform: translateY(-15px) translateX(-10px) scale(0.8);
            opacity: 0.5;
          }
        }

        .contact-container {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
        }

        .contact-title {
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
          margin-bottom: 2rem;
        }

        .contact-cta {
          font-size: 1.1rem;
          color: #b0c4de;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .action-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }

        .action-card {
          background: rgba(26, 39, 68, 0.3);
          border: 2px solid rgba(64, 224, 255, 0.2);
          border-radius: 25px;
          padding: 2.5rem;
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(15px);
        }

        .action-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
            rgba(var(--card-color), 0.1) 0%, 
            transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .action-card:hover::before {
          opacity: 1;
        }

        .action-card:hover {
          border-color: rgb(var(--card-color));
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(var(--card-color), 0.3);
        }

        .action-card.pulse {
          animation: cardPulse 0.6s ease-in-out;
        }

        @keyframes cardPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); border-color: rgb(var(--card-color)); }
        }

        .action-icon {
          width: 80px;
          height: 80px;
          background: rgba(var(--card-color), 0.15);
          border: 2px solid rgba(var(--card-color), 0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: rgb(var(--card-color));
          margin: 0 auto 1.5rem;
          position: relative;
          transition: all 0.3s ease;
        }

        .action-icon::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120%;
          height: 120%;
          border: 2px solid rgb(var(--card-color));
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .action-card:hover .action-icon::after {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.5;
          animation: iconRipple 1.5s infinite;
        }

        @keyframes iconRipple {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
        }

        .action-content {
          text-align: center;
        }

        .action-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }

        .action-subtitle {
          font-size: 0.9rem;
          color: rgb(var(--card-color));
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.9;
        }

        .action-message {
          font-size: 1rem;
          color: #b0c4de;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .action-method {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          padding: 0.8rem 1.5rem;
          background: rgba(var(--card-color), 0.1);
          border: 1px solid rgba(var(--card-color), 0.3);
          border-radius: 25px;
          font-size: 0.9rem;
          color: rgb(var(--card-color));
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .action-card:hover .action-method {
          background: rgba(var(--card-color), 0.2);
          border-color: rgb(var(--card-color));
          transform: scale(1.05);
        }

        .method-icon {
          font-size: 0.8rem;
        }

        .contact-info {
          margin-top: 4rem;
          padding: 2rem;
          background: rgba(15, 25, 40, 0.4);
          border-radius: 20px;
          border: 1px solid rgba(64, 224, 255, 0.2);
          backdrop-filter: blur(10px);
          text-align: center;
        }

        .info-title {
          font-size: 1.2rem;
          color: #40e0ff;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .contact-details {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .contact-label {
          font-size: 0.8rem;
          color: #8fa8b6;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .contact-value {
          font-size: 1.1rem;
          color: #ffffff;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .contact-value:hover {
          color: #40e0ff;
          text-shadow: 0 0 10px rgba(64, 224, 255, 0.5);
        }

        .availability-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(76, 175, 80, 0.2);
          border: 1px solid rgba(76, 175, 80, 0.4);
          border-radius: 20px;
          font-size: 0.9rem;
          color: #4caf50;
          margin-top: 1rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #4caf50;
          border-radius: 50%;
          animation: statusPulse 2s infinite;
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .title-main {
            font-size: 2.5rem;
            letter-spacing: 2px;
          }
          
          .action-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .contact-details {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .action-card {
            padding: 2rem;
          }
        }
      `}</style>

      <section id="contact" className="contact-section">
        {/* Partículas de fondo */}
        <div className="contact-particles">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="particle-orb"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 12}s`
              }}
            />
          ))}
        </div>

        <div className="contact-container">
          {/* Título */}
          <div className="contact-title">
            <h2 className="title-main">CONECTEMOS</h2>
            <p className="title-subtitle">Transformemos tu idea en realidad</p>
            <p className="contact-cta">
              Cada proyecto es único, como cada solución que creamos. 
              Elige la forma más directa de conectar según tu necesidad.
            </p>
          </div>

          {/* Action cards */}
          <div className="action-grid">
            {contactActions.map((action, index) => (
              <div
                key={action.id}
                className={`action-card ${pulseIndex === index ? 'pulse' : ''}`}
                style={{ 
                  '--card-color': action.color.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ') || '64, 224, 255'
                } as React.CSSProperties}
                onClick={action.action}
                
              >
                <div className="action-icon">
                  {action.icon}
                </div>
                <div className="action-content">
                  <h3 className="action-title">{action.title}</h3>
                  <div className="action-subtitle">{action.subtitle}</div>
                  <p className="action-message">{action.message}</p>
                  <div className="action-method">
                    <span className="method-icon">
                      {action.method === 'email' ? '✉' : action.method === 'phone' ? '📞' : '💬'}
                    </span>
                    {action.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact info */}
          <div className="contact-info">
            <h3 className="info-title">Información Directa</h3>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-label">Email</div>
                <div 
                  className="contact-value"
                  onClick={() => window.open('mailto:desarrollo@abrahamdev.net', '_blank')}
                >
                  desarrollo@abrahamdev.net
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-label">Teléfono</div>
                <div 
                  className="contact-value"
                  onClick={() => window.open('tel:+525538891487', '_self')}
                >
                  55 3889 1487
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-label">Ubicación</div>
                <div className="contact-value">México, CDMX</div>
              </div>
            </div>
            <div className="availability-badge">
              <div className="status-dot"></div>
              Disponible para nuevos proyectos
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;