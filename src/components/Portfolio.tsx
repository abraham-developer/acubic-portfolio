import React, { useState, useEffect, useRef } from 'react';

const Portfolio: React.FC = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 'wms',
      title: 'WMS Enterprise',
      category: 'Warehouse Management',
      description: 'Sistema completo de gestión de almacenes con optimización de rutas, control de inventario en tiempo real y analytics avanzados para maximizar la eficiencia operacional.',
      technologies: ['SQL Server', '.NET APIs', 'React', 'Docker'],
      features: ['Optimización de rutas', 'Inventario en tiempo real', 'Analytics avanzados', 'Integración IoT'],
      impact: '40% mejora en eficiencia',
      color: '#ff6b9d'
    },
    {
      id: 'oms',
      title: 'OMS Platform',
      category: 'Order Management',
      description: 'Plataforma centralizada para gestión de órdenes multicanal con automatización de workflows, seguimiento en tiempo real y sincronización con múltiples sistemas de e-commerce.',
      technologies: ['PostgreSQL', 'n8n', '.NET', 'Angular'],
      features: ['Gestión multicanal', 'Workflows automatizados', 'Seguimiento tiempo real', 'Sincronización multi-sistema'],
      impact: '65% reducción en tiempo de procesamiento',
      color: '#40e0ff'
    },
    {
      id: 'whatsapp-chat',
      title: 'WhatsApp Live Chat',
      category: 'Customer Communication',
      description: 'Sistema de chat en vivo integrado con WhatsApp Business API, gestión automática de conversaciones y dashboard analítico para equipos de soporte al cliente.',
      technologies: ['Webhooks', 'React', 'PostgreSQL', 'WhatsApp API'],
      features: ['Chat en tiempo real', 'Gestión automática', 'Dashboard analítico', 'Integración CRM'],
      impact: '90% satisfacción del cliente',
      color: '#25d366'
    },
    {
      id: 'qdrant-ai',
      title: 'Qdrant AI Integration',
      category: 'Artificial Intelligence',
      description: 'Integración avanzada con Qdrant para búsquedas vectoriales semánticas, procesamiento de lenguaje natural y recomendaciones inteligentes basadas en embedding vectors.',
      technologies: ['Qdrant', 'Python', 'Vector DB', '.NET APIs'],
      features: ['Búsqueda semántica', 'Vector embeddings', 'NLP avanzado', 'Recomendaciones IA'],
      impact: '85% precisión en búsquedas',
      color: '#9c27b0'
    },
    {
      id: 'shipping-apis',
      title: 'Shipping APIs Suite',
      category: 'Logistics Integration',
      description: 'Suite completa de APIs para integración con múltiples paqueterías, seguimiento unificado, cálculo automático de tarifas y optimización de envíos a nivel nacional e internacional.',
      technologies: ['REST APIs', '.NET', 'Docker Swarm', 'IONOS'],
      features: ['Multi-carrier integration', 'Seguimiento unificado', 'Cálculo automático', 'Optimización de rutas'],
      impact: '50+ integraciones activas',
      color: '#ff9800'
    },
    {
      id: 'live-integrations',
      title: 'Live Integrations Hub',
      category: 'Real-time Systems',
      description: 'Hub centralizado de integraciones en tiempo real para múltiples clientes, con monitoreo 24/7, failover automático y escalabilidad horizontal para garantizar alta disponibilidad.',
      technologies: ['n8n', 'Webhooks', 'Docker', 'Monitoring'],
      features: ['Tiempo real', 'Monitoreo 24/7', 'Failover automático', 'Escalabilidad horizontal'],
      impact: '99.9% uptime garantizado',
      color: '#4caf50'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <div>
      <style>{`
        .portfolio-section {
          background: linear-gradient(135deg, #1a2744 0%, #0f1928 50%, #0a0f1a 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 100px 0;
        }

        .portfolio-bg-grid {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.02;
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(64, 224, 255, 0.3) 1px, transparent 0);
          background-size: 30px 30px;
          animation: gridShift 15s ease-in-out infinite;
        }

        @keyframes gridShift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, 15px); }
        }

        .portfolio-container {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
        }

        .portfolio-title {
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

        .projects-showcase {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          align-items: center;
          min-height: 500px;
        }

        .project-selector {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .project-tab {
          padding: 1.5rem;
          background: rgba(26, 39, 68, 0.3);
          border: 1px solid rgba(64, 224, 255, 0.2);
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .project-tab::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--project-color, #40e0ff);
          transform: scaleY(0);
          transition: transform 0.3s ease;
          transform-origin: bottom;
        }

        .project-tab.active::before {
          transform: scaleY(1);
        }

        .project-tab:hover,
        .project-tab.active {
          background: rgba(26, 39, 68, 0.6);
          border-color: rgba(64, 224, 255, 0.5);
          transform: translateX(10px);
          box-shadow: 0 10px 30px rgba(64, 224, 255, 0.1);
        }

        .tab-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .tab-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }

        .tab-category {
          font-size: 0.8rem;
          color: var(--project-color, #40e0ff);
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .tab-impact {
          font-size: 0.9rem;
          color: #b0c4de;
          margin: 0;
          font-weight: 300;
        }

        .project-display {
          position: relative;
          background: rgba(15, 25, 40, 0.4);
          border-radius: 25px;
          border: 1px solid rgba(64, 224, 255, 0.3);
          backdrop-filter: blur(20px);
          overflow: hidden;
          min-height: 500px;
        }

        .project-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            var(--active-color, #40e0ff) 50%, 
            transparent 100%);
          animation: projectScan 3s ease-in-out infinite;
        }

        @keyframes projectScan {
          0%, 100% { transform: translateX(-100%); opacity: 0; }
          50% { transform: translateX(0%); opacity: 1; }
        }

        .project-content {
          padding: 3rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .project-header {
          margin-bottom: 2rem;
        }

        .project-title {
          font-size: 2.5rem;
          font-weight: 300;
          color: #ffffff;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }

        .project-category-display {
          color: var(--active-color, #40e0ff);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .project-description {
          font-size: 1.1rem;
          color: #b0c4de;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .project-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .detail-section {
          margin-bottom: 1.5rem;
        }

        .detail-title {
          font-size: 0.9rem;
          color: var(--active-color, #40e0ff);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.8rem;
          font-weight: 600;
        }

        .tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          padding: 0.3rem 0.8rem;
          background: rgba(64, 224, 255, 0.1);
          border: 1px solid rgba(64, 224, 255, 0.3);
          border-radius: 15px;
          font-size: 0.8rem;
          color: #40e0ff;
          letter-spacing: 0.5px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #b0c4de;
        }

        .feature-item::before {
          content: '◆';
          color: var(--active-color, #40e0ff);
          font-size: 0.7rem;
        }

        .impact-highlight {
          grid-column: 1 / -1;
          text-align: center;
          padding: 1.5rem;
          background: rgba(64, 224, 255, 0.05);
          border-radius: 15px;
          border: 1px solid rgba(64, 224, 255, 0.2);
          margin-top: 1rem;
        }

        .impact-text {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--active-color, #40e0ff);
          text-shadow: 0 0 15px var(--active-color, #40e0ff);
        }

        .floating-indicator {
          position: absolute;
          width: 8px;
          height: 8px;
          background: var(--active-color, #40e0ff);
          border-radius: 50%;
          pointer-events: none;
          transition: all 0.1s ease;
          box-shadow: 0 0 15px var(--active-color, #40e0ff);
          opacity: 0.6;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .title-main {
            font-size: 2.5rem;
            letter-spacing: 2px;
          }
          
          .projects-showcase {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .project-content {
            padding: 2rem;
          }
          
          .project-title {
            font-size: 2rem;
          }
          
          .project-details {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>

      <section id="portfolio" className="portfolio-section" ref={containerRef}>
        {/* Background grid */}
        <div className="portfolio-bg-grid"></div>

        {/* Floating indicator */}
        <div 
          className="floating-indicator"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            '--active-color': projects[activeProject]?.color
          } as React.CSSProperties}
        />

        <div className="portfolio-container">
          {/* Título */}
          <div className="portfolio-title">
            <h2 className="title-main">PORTFOLIO</h2>
            <p className="title-subtitle">Soluciones que transforman negocios</p>
          </div>

          {/* Projects showcase */}
          <div className="projects-showcase">
            {/* Project selector */}
            <div className="project-selector">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`project-tab ${activeProject === index ? 'active' : ''}`}
                  style={{ '--project-color': project.color } as React.CSSProperties}
                  onClick={() => setActiveProject(index)}
                >
                  <div className="tab-header">
                    <h3 className="tab-title">{project.title}</h3>
                    <span className="tab-category">{project.category}</span>
                  </div>
                  <p className="tab-impact">{project.impact}</p>
                </div>
              ))}
            </div>

            {/* Project display */}
            <div 
              className="project-display"
              style={{ '--active-color': projects[activeProject]?.color } as React.CSSProperties}
            >
              <div className="project-glow"></div>
              
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{projects[activeProject]?.title}</h3>
                  <div className="project-category-display">{projects[activeProject]?.category}</div>
                  <p className="project-description">{projects[activeProject]?.description}</p>
                </div>

                <div className="project-details">
                  <div className="detail-section">
                    <h4 className="detail-title">Tecnologías</h4>
                    <div className="tech-list">
                      {projects[activeProject]?.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4 className="detail-title">Características</h4>
                    <ul className="feature-list">
                      {projects[activeProject]?.features.map((feature, index) => (
                        <li key={index} className="feature-item">{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="impact-highlight">
                    <div className="impact-text">{projects[activeProject]?.impact}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;