import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TermIcon, ShieldCheck, Mail, Github, ChevronRight, Server, Globe, Trophy } from 'lucide-react';

interface HeroProps {
  onExploreProjects: () => void;
}

interface TerminalLog {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export default function Hero({ onExploreProjects }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [logs, setLogs] = useState<TerminalLog[]>([
    { text: "Initializing secure terminal core...", type: "success" },
    { text: "Loading CEH v12 security database modules...", type: "success" },
    { text: "Identity Verified: Thomas Francis [Tom2001moT]", type: "output" },
    { text: "Type 'help' or click shortcuts below to query profile.", type: "output" }
  ]);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const fullText = "Full Stack Web Developer & Certified Ethical Hacker";

  // Typing effect for subtitle
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    const newLogs = [...logs, { text: `guest@thomas_portfolio:~$ ${cmd}`, type: 'input' as const }];

    switch (cleanCmd) {
      case 'help':
        newLogs.push(
          { text: "Available Commands:", type: 'success' },
          { text: "  sysinfo   - Display core developer system specs", type: 'output' },
          { text: "  bio       - Retrieve professional narrative", type: 'output' },
          { text: "  security  - Fetch CEH Certification & tools inventory", type: 'output' },
          { text: "  contact   - Get verified connect coordinates", type: 'output' },
          { text: "  clear     - Wipe clean the terminal screen", type: 'output' }
        );
        break;
      case 'sysinfo':
        newLogs.push(
          { text: "--- SYSTEM PROFILE ---", type: 'success' },
          { text: "USER: guest@tom2001mot", type: 'output' },
          { text: "CERTIFICATION: Certified Ethical Hacker (CEH v12)", type: 'output' },
          { text: "LOCATION: India (IST timezone)", type: 'output' },
          { text: "PRIMARY STACK: TypeScript, Python, Node.js, Django, Frappe", type: 'output' },
          { text: "GAMER RANK: Competitive Tier 1 Enthusiast", type: 'output' },
          { text: "SHELL: zsh v5.9 / react-env", type: 'output' }
        );
        break;
      case 'bio':
        newLogs.push(
          { text: "--- BIOGRAPHY ---", type: 'success' },
          { text: "Hi, I'm Thomas Francis. I bridge the gap between high-level application architecture and deep infrastructure security.", type: 'output' },
          { text: "With certifications in ethical hacking and extensive full-stack web engineering experience, I specialize in building offline-first local AI utilities, robust ERP networks, and securing enterprise APIs.", type: 'output' }
        );
        break;
      case 'security':
        newLogs.push(
          { text: "--- ETHICAL HACKING & SECURITY PROTOCOLS ---", type: 'success' },
          { text: "CREDENTIAL: CEH (Certified Ethical Hacker) by EC-Council", type: 'output' },
          { text: "OWASP RANKING: Level 2 Auditing Protocols", type: 'output' },
          { text: "AUDITING ENGINES: Wireshark, Nmap, Metasploit, Burp Suite, OWASP Zap", type: 'output' },
          { text: "SPECIALTY: Web App Penetesting, API vulnerability assessments, Cryptography analyses", type: 'output' }
        );
        break;
      case 'contact':
        newLogs.push(
          { text: "--- SECURE CHANNELS ---", type: 'success' },
          { text: "EMAIL: thomasfrancis27.11.2001@gmail.com", type: 'output' },
          { text: "GITHUB: https://github.com/Tom2001moT", type: 'output' },
          { text: "LINKEDIN: Thomas Francis (CEH / Developer)", type: 'output' }
        );
        break;
      case 'clear':
        setLogs([]);
        setTerminalInput('');
        return;
      default:
        newLogs.push({ text: `bash: command not found: '${cmd}'. Type 'help' for options.`, type: 'error' });
    }

    setLogs(newLogs);
    setTerminalInput('');
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCommand(terminalInput);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 sm:px-6 lg:px-8"
    >
      {/* Visual Accent Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.07),rgba(0,0,0,0))]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Side: Brand Greeting Card */}
        <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 py-1 px-3 rounded-full bg-emerald-950/40 border border-emerald-500/20 w-fit">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-[11px] text-emerald-400 font-semibold tracking-wider uppercase">
              Certified Ethical Hacker
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Real Avatar of the user from GitHub */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <img 
                src="https://github.com/Tom2001moT.png" 
                alt="Thomas Francis Avatar" 
                className="relative w-20 h-20 rounded-full border-2 border-zinc-900 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight leading-none">
                Thomas Francis
              </h1>
              <p className="font-mono text-zinc-500 text-sm mt-1">@Tom2001moT</p>
            </div>
          </div>

          <div className="h-14">
            <p className="font-mono text-sm sm:text-base text-zinc-400 border-l-2 border-emerald-500 pl-3 leading-relaxed">
              {typedText}
              <span className="animate-pulse font-bold text-emerald-400">|</span>
            </p>
          </div>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans max-w-md">
            Full-stack web engineer specialized in python, local computer vision AI utilities, micro-services, and security audits. Securing software pipelines with penetration testing.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onExploreProjects}
              className="px-5 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-zinc-100 font-mono text-xs font-semibold tracking-wider transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-emerald-950/50"
            >
              <span>EXPLORE_PROJECTS</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="https://github.com/Tom2001moT"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-mono text-xs transition-all duration-300 flex items-center space-x-2"
            >
              <Github className="w-4 h-4 text-zinc-400" />
              <span>GITHUB_PROFILE</span>
            </a>
          </div>

          {/* Core Badges Row */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-900">
            <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded">
              <Server className="w-5 h-5 text-zinc-500 mb-1" />
              <p className="font-mono text-[11px] text-zinc-500 font-medium">BACKEND</p>
              <p className="font-sans text-xs font-semibold text-zinc-300">Django/Frappe</p>
            </div>
            <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded">
              <Globe className="w-5 h-5 text-zinc-500 mb-1" />
              <p className="font-mono text-[11px] text-zinc-500 font-medium">FRONTEND</p>
              <p className="font-sans text-xs font-semibold text-zinc-300">React/Tailwind</p>
            </div>
            <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded">
              <Trophy className="w-5 h-5 text-zinc-500 mb-1" />
              <p className="font-mono text-[11px] text-zinc-500 font-medium">GAMER</p>
              <p className="font-sans text-xs font-semibold text-zinc-300">Tactical Strategy</p>
            </div>
          </div>
        </div>

        {/* Right Side: Beautiful Interactive Terminal Shell */}
        <div className="lg:col-span-7 flex flex-col h-[420px] w-full rounded-lg bg-zinc-950 border border-zinc-800/80 shadow-2xl shadow-emerald-950/10 overflow-hidden relative group">
          
          {/* Glowing neon shadow behind terminal */}
          <div className="absolute -inset-0.5 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 pointer-events-none"></div>

          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 select-none">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex items-center space-x-1.5 font-mono text-[11px] text-zinc-400">
              <TermIcon className="w-3.5 h-3.5 text-emerald-500" />
              <span>thomas_francis@sec-terminal_v12</span>
            </div>
            <div className="w-12"></div> {/* Spacer for balance */}
          </div>

          {/* Terminal Console Logs */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 select-text bg-zinc-950 scrollbar-thin scrollbar-thumb-zinc-800">
            {logs.map((log, idx) => (
              <div 
                key={idx} 
                className={`leading-relaxed break-all whitespace-pre-wrap ${
                  log.type === 'input' ? 'text-zinc-200 font-bold' :
                  log.type === 'error' ? 'text-red-400 bg-red-950/20 px-1 py-0.5 rounded' :
                  log.type === 'success' ? 'text-emerald-400' : 'text-zinc-400'
                }`}
              >
                {log.text}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>

          {/* Command Shortcuts Tray */}
          <div className="px-4 py-2 bg-zinc-900/30 border-t border-zinc-900 flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] text-zinc-500 mr-1 select-none">QUICK_QUERY:</span>
            {['sysinfo', 'bio', 'security', 'contact'].map((shortcut) => (
              <button
                key={shortcut}
                onClick={() => handleCommand(shortcut)}
                className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-emerald-950/40 border border-zinc-800 hover:border-emerald-500/30 text-[10px] font-mono text-zinc-400 hover:text-emerald-400 transition-all duration-200"
              >
                {shortcut}
              </button>
            ))}
          </div>

          {/* Terminal Interactive Input Form */}
          <form 
            onSubmit={handleFormSubmit}
            className="flex items-center px-4 py-3 bg-zinc-900 border-t border-zinc-800/80"
          >
            <span className="font-mono text-xs text-emerald-400 mr-2 font-bold">guest@thomas_portfolio:~$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="type 'help' and press Enter..."
              className="flex-1 bg-transparent font-mono text-xs text-zinc-100 focus:outline-none placeholder-zinc-600"
              autoFocus
            />
          </form>
        </div>

      </div>
    </section>
  );
}
