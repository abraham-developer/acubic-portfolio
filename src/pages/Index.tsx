import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';

const Index = () => {
  const [ ] = useState('home');

  useEffect(() => {
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
  }, []);

  return (
  <div className="min-h-screen">
    <Header />
    <main>
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      
      {/* ...otras secciones... */}
    </main>
    <Footer />
  </div>
);
};

export default Index;