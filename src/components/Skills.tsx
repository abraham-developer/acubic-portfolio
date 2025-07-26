import React, { useEffect, useRef, useState } from 'react';

const Skills: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<{[key: string]: {x: number, y: number}}>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);

  const techNodes = [
    { 
      id: 'n8n', 
      label: 'n8n', 
      category: 'Automatización',
      description: 'Orquestación de workflows e integraciones',
      x: 20, 
      y: 30,
      connections: ['webhooks', 'postgres', 'apis']
    },
    { 
      id: 'webhooks', 
      label: 'Webhooks', 
      category: 'Integración',
      description: 'Comunicación en tiempo real entre sistemas',
      x: 45, 
      y: 20,
      connections: ['n8n', 'apis', 'docker']
    },
    { 
      id: 'sqlserver', 
      label: 'SQL Server', 
      category: 'Base de Datos',
      description: 'Gestión robusta de datos empresariales',
      x: 75, 
      y: 35,
      connections: ['postgres', 'apis']
    },
    { 
      id: 'postgres', 
      label: 'PostgreSQL', 
      category: 'Base de Datos',
      description: 'Potencia y flexibilidad en datos relacionales',
      x: 80, 
      y: 65,
      connections: ['sqlserver', 'apis', 'n8n']
    },
    { 
      id: 'apis', 
      label: '.NET APIs', 
      category: 'Backend',
      description: 'Servicios escalables y de alto rendimiento',
      x: 50, 
      y: 50,
      connections: ['react', 'angular', 'postgres', 'sqlserver', 'webhooks', 'n8n']
    },
    { 
      id: 'react', 
      label: 'React', 
      category: 'Frontend',
      description: 'Interfaces dinámicas y responsivas',
      x: 25, 
      y: 70,
      connections: ['apis', 'angular']
    },
    { 
      id: 'angular', 
      label: 'Angular', 
      category: 'Frontend',
      description: 'Aplicaciones empresariales complejas',
      x: 15, 
      y: 50,
      connections: ['apis', 'react']
    },
    { 
      id: 'docker', 
      label: 'Docker Swarm', 
      category: 'DevOps',
      description: 'Orquestación y escalabilidad de contenedores',
      x: 70, 
      y: 15,
      connections: ['ionos', 'webhooks']
    },
    { 
      id: 'ionos', 
      label: 'IONOS', 
      category: 'Cloud',
      description: 'Despliegues confiables en la nube',
      x: 85, 
      y: 50,
      connections: ['docker']
    }
  ];

  // Inicializar posiciones
  useEffect(() => {
    const initialPositions: {[key: string]: {x: number, y: number}} = {};
    techNodes.forEach(node => {
      initialPositions[node.id] = { x: node.x, y: node.y };
    });
    setNodePositions(initialPositions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawConnections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      techNodes.forEach(node => {
        const nodePos = nodePositions[node.id] || { x: node.x, y: node.y };
        const startX = (nodePos.x / 100) * canvas.width;
        const startY = (nodePos.y / 100) * canvas.height;

        node.connections.forEach(connectionId => {
          const targetNode = techNodes.find(n => n.id === connectionId);
          if (!targetNode) return;

          const targetPos = nodePositions[connectionId] || { x: targetNode.x, y: targetNode.y };
          const endX = (targetPos.x / 100) * canvas.width;
          const endY = (targetPos.y / 100) * canvas.height;

          const isActive = hoveredNode === node.id;

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = isActive ? 
            'rgba(64, 224, 255, 0.6)' : 
            'rgba(64, 224, 255, 0.15)';
          ctx.lineWidth = isActive ? 2 : 1;
          ctx.stroke();

          if (isActive) {
            ctx.shadowColor = '#40e0ff';
            ctx.shadowBlur = 8;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        });
      });
    };

    const animate = () => {
      drawConnections();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [hoveredNode, nodePositions]);

  const handleNodeHover = (nodeId: string) => {
    setHoveredNode(nodeId);
  };

  const handleNodeLeave = () => {
    setHoveredNode(null);
  };

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.preventDefault();
    setDraggedNode(nodeId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedNode || !ecosystemRef.current) return;

    const rect = ecosystemRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Limitar movimiento dentro del contenedor
    const boundedX = Math.max(5, Math.min(95, x));
    const boundedY = Math.max(5, Math.min(95, y));

    setNodePositions(prev => ({
      ...prev,
      [draggedNode]: { x: boundedX, y: boundedY }
    }));
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  return (
    <div>
      <style>{`
        .skills-section {
          background: linear-gradient(135deg, #0f1928 0%, #1a2744 50%, #0a0f1a 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 100px 0;
        }

        .tech-matrix-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.03;
          background-image: 
            linear-gradient(rgba(64, 224, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(64, 224, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: matrixScroll 20s linear infinite;
        }

        @keyframes matrixScroll {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .skills-container {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
        }

        .skills-title {
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

        .tech-ecosystem {
          position: relative;
          width: 100%;
          height: 600px;
          background: rgba(26, 39, 68, 0.2);
          border-radius: 30px;
          border: 1px solid rgba(64, 224, 255, 0.2);
          backdrop-filter: blur(10px);
          overflow: hidden;
          cursor: default;
        }

        .connections-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .tech-node {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: grab;
          transition: all 0.3s ease;
          z-index: 20;
          user-select: none;
        }

        .tech-node:active {
          cursor: grabbing;
        }

        .tech-node.dragging {
          z-index: 30;
          transition: none;
        }

        .node-core {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(64, 224, 255, 0.2) 0%, rgba(15, 25, 40, 0.9) 70%);
          border: 2px solid rgba(64, 224, 255, 0.4);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .node-core::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120%;
          height: 120%;
          background: conic-gradient(from 0deg, transparent, rgba(64, 224, 255, 0.3), transparent);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          animation: nodeRotate 8s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tech-node:hover .node-core::before,
        .tech-node.active .node-core::before {
          opacity: 1;
        }

        @keyframes nodeRotate {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .tech-node:hover .node-core,
        .tech-node.active .node-core {
          transform: scale(1.1);
          border-color: #40e0ff;
          box-shadow: 0 0 30px rgba(64, 224, 255, 0.5);
        }

        .node-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: #ffffff;
          text-align: center;
          line-height: 1;
          margin-bottom: 2px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .node-category {
          font-size: 0.5rem;
          color: #40e0ff;
          text-align: center;
          opacity: 0.8;
          line-height: 1;
        }

        .node-info {
          position: absolute;
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(15, 25, 40, 0.95);
          border: 1px solid rgba(64, 224, 255, 0.3);
          border-radius: 15px;
          padding: 1rem;
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 30;
        }

        .tech-node:hover .node-info,
        .tech-node.active .node-info {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(10px);
        }

        .info-title {
          font-size: 0.9rem;
          color: #40e0ff;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .info-description {
          font-size: 0.8rem;
          color: #b0c4de;
          line-height: 1.4;
        }

        .ecosystem-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .stat-card {
          background: rgba(26, 39, 68, 0.3);
          border: 1px solid rgba(64, 224, 255, 0.2);
          border-radius: 20px;
          padding: 1.5rem;
          text-align: center;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          border-color: rgba(64, 224, 255, 0.5);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(64, 224, 255, 0.1);
        }

        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          color: #40e0ff;
          text-shadow: 0 0 15px rgba(64, 224, 255, 0.6);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #b0c4de;
          font-weight: 300;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .title-main {
            font-size: 2.5rem;
            letter-spacing: 2px;
          }
          
          .tech-ecosystem {
            height: 400px;
          }
          
          .node-core {
            width: 60px;
            height: 60px;
          }
          
          .node-label {
            font-size: 0.6rem;
          }
          
          .node-info {
            min-width: 150px;
            padding: 0.8rem;
          }
        }
      `}</style>

      <section id="skills" className="skills-section">
        {/* Matrix background */}
        <div className="tech-matrix-bg"></div>

        <div className="skills-container">
          {/* Título */}
          <div className="skills-title">
            <h2 className="title-main">NUESTRO STACK</h2>
            <p className="title-subtitle">Tecnologías que dominamos y conectamos</p>
          </div>

          {/* Tech ecosystem */}
          <div 
            className="tech-ecosystem"
            ref={ecosystemRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <canvas ref={canvasRef} className="connections-canvas" />
            
            {techNodes.map(node => {
              const position = nodePositions[node.id] || { x: node.x, y: node.y };
              return (
                <div
                  key={node.id}
                  className={`tech-node ${hoveredNode === node.id ? 'active' : ''} ${draggedNode === node.id ? 'dragging' : ''}`}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`
                  }}
                  onMouseEnter={() => handleNodeHover(node.id)}
                  onMouseLeave={handleNodeLeave}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                >
                  <div className="node-core">
                    <div className="node-label">{node.label}</div>
                    <div className="node-category">{node.category}</div>
                  </div>
                  
                  <div className="node-info">
                    <div className="info-title">{node.label}</div>
                    <div className="info-description">{node.description}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="ecosystem-stats">
            <div className="stat-card">
              <div className="stat-number">9</div>
              <div className="stat-label">Tecnologías Core</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Integraciones Activas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Automatización</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">∞</div>
              <div className="stat-label">Escalabilidad</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;