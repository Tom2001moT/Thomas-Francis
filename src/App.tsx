import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import ProductAnalysis from './components/ProductAnalysis';
import InteractiveCV from './components/InteractiveCV';
import TerminalZone from './components/TerminalZone';
import Contact from './components/Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const handleExploreProjects = () => {
    setActiveSection('projects');
    const element = document.getElementById('projects');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div id="root-container" className="bg-zinc-950 text-zinc-100 min-h-screen font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Navigation Header */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Layout sections */}
      <main>
        {/* Terminal/Hero */}
        <Hero onExploreProjects={handleExploreProjects} />

        {/* Profile/Biography & Achievements */}
        <About />

        {/* Dynamic Project explorer */}
        <Projects />

        {/* Commercial Products Case Studies & Architecture Analysis */}
        <ProductAnalysis />

        {/* Integrated Official CV Resumé */}
        <InteractiveCV />

        {/* Certified Hacking playground */}
        <TerminalZone />

        {/* Contact info & channels */}
        <Contact />
      </main>
    </div>
  );
}
