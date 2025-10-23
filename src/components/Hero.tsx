import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.3)';
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(drawParticles);
    };

    drawParticles();

    // Mouse move tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <canvas ref={canvasRef} className="hero-canvas"></canvas>
      
      <div className="hero-content">
        <div className="hero-text">
          {/* Teseracto 3D interactivo */}
          <div 
            ref={cubeRef} 
            className="hero-cube"
            style={{
              transform: `perspective(1000px) rotateX(${mousePos.y * 15}deg) rotateY(${mousePos.x * 15}deg)`
            }}
          >
            <div className="tesseract-3d">
              {/* Cubo frontal */}
              <div className="cube-face front">
                <div className="corner tl"></div>
                <div className="corner tr"></div>
                <div className="corner bl"></div>
                <div className="corner br"></div>
              </div>
              
              {/* Cubo trasero */}
              <div className="cube-face back">
                <div className="corner tl"></div>
                <div className="corner tr"></div>
                <div className="corner bl"></div>
                <div className="corner br"></div>
              </div>
              
              {/* Conexiones entre cubos */}
              <div className="hyper-connection tl"></div>
              <div className="hyper-connection tr"></div>
              <div className="hyper-connection bl"></div>
              <div className="hyper-connection br"></div>
              
              {/* Partículas de energía */}
              <div className="energy-orb orb-1"></div>
              <div className="energy-orb orb-2"></div>
              <div className="energy-orb orb-3"></div>
              <div className="energy-orb orb-4"></div>
              <div className="energy-orb orb-5"></div>
              <div className="energy-orb orb-6"></div>
              <div className="energy-orb orb-7"></div>
              <div className="energy-orb orb-8"></div>
            </div>
          </div>
          
          {/* Título con efecto glitch */}
          <h1 className="hero-title">
            <span className="title-main" data-text="Cubeark">Cubeark</span>
            <span className="title-gradient" data-text="Solutions">Solutions</span>
          </h1>
          
          <div className="hero-subtitle">
            <span className="subtitle-primary">Abraham Rivera</span>
            <span className="subtitle-separator">•</span>
            <span className="subtitle-role">Full-Stack Developer</span>
          </div>
          
          <p className="hero-description">
            Arquitecto de soluciones tecnológicas empresariales. Especializado en .NET, React, 
            y arquitecturas cloud que escalan con tu negocio.
          </p>
          
          <div className="hero-tags">
            <span className="tag">C# / .NET</span>
            <span className="tag">TypeScript</span>
            <span className="tag">React / Angular</span>
            <span className="tag">Cloud Architecture</span>
            <span className="tag">Microservices</span>
          </div>
        </div>
        
      
      </div>
    </section>
  );
};

export default Hero;