import { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert, Terminal as TermIcon, Github, Mail } from 'lucide-react';
import logoImg from '../assets/images/portfolio_cyber_logo_1782798953685.jpg';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Dynamic India local time calculator (UTC+5.30)
    const updateTime = () => {
      const now = new Date();
      // Convert current system time to IST
      const istDate = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 5.5));
      const hours = istDate.getHours().toString().padStart(2, '0');
      const minutes = istDate.getMinutes().toString().padStart(2, '0');
      const seconds = istDate.getSeconds().toString().padStart(2, '0');
      setIstTime(`${hours}:${minutes}:${seconds} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const menuItems = [
    { id: 'hero', label: 'Terminal' },
    { id: 'about', label: 'Profile' },
    { id: 'projects', label: 'Projects' },
    { id: 'product-analysis', label: 'Case Studies' },
    { id: 'cv', label: 'Resumé / CV' },
    { id: 'cyber', label: 'Hacking Playground' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // height of navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav 
      id="navbar-container" 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-zinc-950/85 backdrop-blur-lg border-b border-zinc-800/80 shadow-lg shadow-zinc-950/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div 
            onClick={() => scrollTo('hero')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded bg-emerald-950/30 border border-emerald-500/20 group-hover:border-emerald-400 group-hover:bg-emerald-900/40 overflow-hidden transition-all duration-300">
              <img 
                src={logoImg} 
                alt="TOM2001moT Logo" 
                className="w-full h-full object-cover rounded group-hover:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -inset-0.5 bg-emerald-500/10 rounded filter blur-sm group-hover:bg-emerald-500/20 pointer-events-none"></div>
            </div>
            <div>
              <span className="font-mono text-base font-bold text-zinc-100 tracking-tight">
                TOM<span className="text-emerald-400">2001</span>MOT
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono py-0.5 px-1.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                CEH v12
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-mono text-xs px-3 py-2 rounded-md transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/20' 
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Local Status Indicators */}
          <div className="hidden lg:flex items-center space-x-4 font-mono text-[11px]">
            <div className="flex items-center space-x-1.5 py-1 px-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>Status: <span className="text-zinc-100">Ready</span></span>
            </div>
            <div className="py-1 px-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
              {istTime}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 focus:outline-none border border-transparent hover:border-zinc-800"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-80 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl' : 'max-h-0'
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex w-full font-mono text-sm px-4 py-2.5 rounded-md ${
                activeSection === item.id 
                  ? 'text-emerald-400 bg-emerald-950/40 border-l-2 border-emerald-400' 
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 px-4 flex justify-between items-center text-[10px] font-mono text-zinc-500 border-t border-zinc-900">
            <span>IST: {istTime.replace(' IST', '')}</span>
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
