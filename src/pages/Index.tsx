import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import VideoIntro from '../components/VideoIntro'; // <-- 1. Importa el nuevo componente

const Index = () => {
  // 2. Estado para controlar si se muestra el video o el contenido principal
  const [showIntro, setShowIntro] = useState(true);

  // El resto de tu lógica de scroll puede permanecer
  useEffect(() => {
    // No queremos activar el listener de scroll durante la intro
    if (showIntro) return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showIntro]); // <-- Se ejecutará cuando showIntro cambie

  // 3. Función que se pasará a VideoIntro para cambiar el estado
  const handleVideoEnd = () => {
    setShowIntro(false); // Oculta el video y muestra la página principal
  };

  // 4. Renderizado condicional
  if (showIntro) {
    return <VideoIntro onVideoEnd={handleVideoEnd} />;
  }

  // Cuando showIntro es false, se renderiza tu portafolio
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;