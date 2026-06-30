import { useState } from 'react';
import { SKILLS, ACHIEVEMENTS } from '../data';
import * as Icons from 'lucide-react';
import { 
  ShieldAlert, 
  Award, 
  Trophy, 
  Code2, 
  Brain, 
  Radar, 
  BarChart2, 
  Compass, 
  Activity, 
  Layers 
} from 'lucide-react';
import GitHubStats from './GitHubStats';

// Radar Chart axes definition (Thomas's multidimensional skill index)
const RADAR_DIMENSIONS = [
  { key: 'offensive', label: 'OFFENSIVE_SECURITY', value: 95, desc: 'CEH Certified. Vulnerability research, network packet auditing, reverse engineering, and threat surface identification.' },
  { key: 'defensive', label: 'DEFENSIVE_CODING', value: 90, desc: 'Building security into line one. Custom input validation filters, cryptographic protocols, and secure cloud policies.' },
  { key: 'uiux', label: 'UI_UX_CRAFT', value: 92, desc: 'Fluid user experiences, highly modular React architectures, custom interactive visualizations, and pixel-precise layout typography.' },
  { key: 'realtime', label: 'REALTIME_SYSTEMS', value: 88, desc: 'Low-latency Socket.io connection logic, sub-second dispatch geofencing, and multi-client transaction synchronization.' },
  { key: 'logistics', label: 'SYSTEM_LOGISTICS', value: 86, desc: 'Tailored enterprise ERP configurations, cron sequence automation, persistent state caching, and fault-tolerant local APIs.' },
  { key: 'ai', label: 'INTEGRATED_AI', value: 84, desc: 'Local ONNX image segmentation models, Google Gemini agent tool calling integration, and custom prompt templates.' }
];

export default function About() {
  const [dashboardTab, setDashboardTab] = useState<'radar' | 'bars'>('radar');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Cyber Security' | 'Frontend' | 'Backend' | 'AI & Mobile'>('All');
  const [selectedDim, setSelectedDim] = useState(RADAR_DIMENSIONS[0]);

  // Filter skills for the granular tab
  const filteredSkills = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory);

  // Group achievements by category
  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length;
  const totalXP = ACHIEVEMENTS.reduce((acc, current) => acc + (current.unlocked ? current.points : 0), 0);

  // Helper to dynamically get Lucide Icons
  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent className="w-4 h-4" />;
    }
    return <Icons.Code className="w-4 h-4" />;
  };

  const categories = ['All', 'Cyber Security', 'Frontend', 'Backend', 'AI & Mobile'] as const;

  // Radar Hexagon drawing calculations
  const cx = 150;
  const cy = 150;
  const maxR = 100;

  // Concentric helper grids
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  const getHexPoints = (level: number) => {
    return RADAR_DIMENSIONS.map((_, i) => {
      const angle = (i * Math.PI) / 3 - Math.PI / 2;
      const r = maxR * level;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Active user level coordinates points string
  const activeLevelPoints = RADAR_DIMENSIONS.map((d, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 2;
    const r = maxR * (d.value / 100);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <section 
      id="about" 
      className="py-20 bg-zinc-950 border-t border-zinc-900 relative"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cyan-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Developer Profile & <span className="text-emerald-400">Credentials</span>
          </h2>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-2">
            SECURE. CONSTRUCT. INTEGRATE.
          </p>
          <div className="w-12 h-1 bg-emerald-500 mx-auto mt-4 rounded"></div>
        </div>

        {/* Master Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Narrative bio & achievements (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Biography */}
            <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-lg relative">
              <div className="absolute top-0 left-4 -translate-y-1/2 bg-zinc-950 px-3 py-0.5 border border-zinc-800 rounded font-mono text-[10px] text-emerald-400">
                STORY_LOG
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed font-sans pt-1">
                I am <span className="text-zinc-100 font-semibold">Thomas Francis</span>, a multi-faceted engineer based in India. I hold the <span className="text-emerald-400 font-semibold font-mono">Certified Ethical Hacker (CEH v12)</span> credential by EC-Council. 
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans mt-3">
                My passion lies in bridging software construction with rigorous defensive security. Rather than building insecure apps that are hardened later, I embed threat assessments, privacy filters, and input validation natively from line one.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans mt-3">
                When I am not coding background synchronization protocols, analyzing packet feeds, or writing local AI models, I play competitive tactical multiplayer games, which fuels my analytical strategy and problem-solving speed.
              </p>
            </div>

            {/* Achievements/Trophies board */}
            <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-lg relative">
              <div className="absolute top-0 left-4 -translate-y-1/2 bg-zinc-950 px-3 py-0.5 border border-zinc-800 rounded font-mono text-[10px] text-cyan-400">
                GAMER_CARD_ACHIEVEMENTS
              </div>

              {/* Header Stats */}
              <div className="flex justify-between items-center mb-5 pt-1">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-mono text-xs text-zinc-300 font-bold">GAMIFIED EXP:</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-extrabold text-cyan-400">{totalXP} XP</span>
                  <span className="font-mono text-[10px] text-zinc-500 block">({unlockedCount}/{ACHIEVEMENTS.length} UNLOCKED)</span>
                </div>
              </div>

              {/* List */}
              <div className="space-y-3">
                {ACHIEVEMENTS.map((ach) => (
                  <div 
                    key={ach.id}
                    className="p-3 bg-zinc-950 border border-zinc-900 rounded flex items-start space-x-3 hover:border-zinc-800/80 transition-all duration-300 group"
                  >
                    <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-yellow-500/80 group-hover:text-yellow-400 group-hover:bg-zinc-800/50 transition-colors">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-sans text-xs font-bold text-zinc-200 group-hover:text-zinc-100 transition-colors">
                          {ach.title}
                        </h4>
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-400">
                          +{ach.points} XP
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-zinc-500 mt-1 leading-normal">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Skills Dashboard (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 bg-zinc-900/20 border border-zinc-900/80 rounded-lg">
              
              {/* Tabs selector */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
                <div>
                  <h3 className="font-sans text-base font-bold text-zinc-100 flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <span>Skills Telemetry Dashboard</span>
                  </h3>
                  <p className="font-mono text-[9px] text-zinc-500 mt-0.5 uppercase">CHOOSE TELEMETRY Blueprint REPRESENTATION</p>
                </div>

                <div className="flex items-center space-x-1.5 bg-zinc-950 p-1 border border-zinc-900 rounded">
                  <button
                    onClick={() => setDashboardTab('radar')}
                    className={`px-2.5 py-1 rounded font-mono text-[10px] flex items-center space-x-1 transition-all cursor-pointer ${
                      dashboardTab === 'radar' 
                        ? 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-400' 
                        : 'text-zinc-400 hover:text-zinc-100'
                    }`}
                  >
                    <Radar className="w-3 h-3" />
                    <span>RADAR_GRID</span>
                  </button>
                  <button
                    onClick={() => setDashboardTab('bars')}
                    className={`px-2.5 py-1 rounded font-mono text-[10px] flex items-center space-x-1 transition-all cursor-pointer ${
                      dashboardTab === 'bars' 
                        ? 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-400' 
                        : 'text-zinc-400 hover:text-zinc-100'
                    }`}
                  >
                    <BarChart2 className="w-3 h-3" />
                    <span>STAC_METRICS</span>
                  </button>
                </div>
              </div>

              {/* View 1: Radar Chart View */}
              {dashboardTab === 'radar' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* The SVG Chart itself */}
                  <div className="md:col-span-7 flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-square">
                      <svg viewBox="0 0 300 300" className="w-full h-full">
                        {/* Draw Concentric grids */}
                        {gridLevels.map((level, idx) => (
                          <polygon
                            key={idx}
                            points={getHexPoints(level)}
                            fill="none"
                            stroke="#1f2937"
                            strokeWidth="1"
                            strokeDasharray={idx === 3 ? "none" : "3 3"}
                          />
                        ))}

                        {/* Axis connecting lines */}
                        {RADAR_DIMENSIONS.map((_, i) => {
                          const angle = (i * Math.PI) / 3 - Math.PI / 2;
                          const x = cx + maxR * Math.cos(angle);
                          const y = cy + maxR * Math.sin(angle);
                          return (
                            <line 
                              key={i} 
                              x1={cx} 
                              y1={cy} 
                              x2={x} 
                              y2={y} 
                              stroke="#1f2937" 
                              strokeWidth="1" 
                            />
                          );
                        })}

                        {/* Thomas's actual Level Hexagon area */}
                        <polygon
                          points={activeLevelPoints}
                          fill="rgba(16, 185, 129, 0.12)"
                          stroke="#10b981"
                          strokeWidth="2"
                        />

                        {/* Axis node anchors & click detection handlers */}
                        {RADAR_DIMENSIONS.map((d, i) => {
                          const angle = (i * Math.PI) / 3 - Math.PI / 2;
                          const r = maxR * (d.value / 100);
                          const x = cx + r * Math.cos(angle);
                          const y = cy + r * Math.sin(angle);
                          const isSelected = selectedDim.key === d.key;

                          return (
                            <g 
                              key={d.key}
                              className="cursor-pointer"
                              onClick={() => setSelectedDim(d)}
                              onMouseEnter={() => setSelectedDim(d)}
                            >
                              {/* Pulse wave around active node */}
                              {isSelected && (
                                <circle 
                                  cx={x} 
                                  cy={y} 
                                  r={9} 
                                  fill="none" 
                                  stroke="#34d399" 
                                  strokeWidth="1" 
                                  className="animate-ping opacity-60" 
                                />
                              )}
                              <circle 
                                cx={x} 
                                cy={y} 
                                r={isSelected ? 6 : 4.5} 
                                className={`${
                                  isSelected 
                                    ? 'fill-emerald-400 stroke-zinc-950' 
                                    : 'fill-zinc-950 stroke-emerald-500 hover:fill-emerald-500'
                                } transition-all duration-200`}
                                strokeWidth="2"
                              />
                            </g>
                          );
                        })}

                        {/* Surrounding labels */}
                        {RADAR_DIMENSIONS.map((d, i) => {
                          const angle = (i * Math.PI) / 3 - Math.PI / 2;
                          const r = 120; // safe distance outside grid
                          const x = cx + r * Math.cos(angle);
                          const y = cy + r * Math.sin(angle);

                          let textAnchor = "middle";
                          if (Math.cos(angle) > 0.1) textAnchor = "start";
                          else if (Math.cos(angle) < -0.1) textAnchor = "end";

                          const isSelected = selectedDim.key === d.key;

                          return (
                            <text
                              key={d.key}
                              x={x}
                              y={y + 3}
                              textAnchor={textAnchor}
                              onClick={() => setSelectedDim(d)}
                              onMouseEnter={() => setSelectedDim(d)}
                              className={`font-mono text-[9px] cursor-pointer transition-colors duration-200 select-none ${
                                isSelected 
                                  ? 'fill-emerald-400 font-extrabold' 
                                  : 'fill-zinc-500 hover:fill-zinc-300'
                              }`}
                            >
                              {d.label}
                            </text>
                          );
                        })}
                      </svg>
                    </div>
                  </div>

                  {/* Sidebar Dimension Details card */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg flex flex-col justify-between min-h-[220px]">
                      <div>
                        <div className="flex items-center space-x-2 text-emerald-400 mb-2">
                          <Compass className="w-4 h-4" />
                          <span className="font-mono text-[10px] tracking-wider font-bold">SELECTED_DIMENSION</span>
                        </div>
                        
                        <h4 className="font-sans text-sm font-extrabold text-zinc-100 uppercase tracking-tight">
                          {selectedDim.label.replace('_', ' ')}
                        </h4>
                        
                        <p className="font-sans text-xs text-zinc-400 mt-2.5 leading-relaxed">
                          {selectedDim.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-zinc-900 mt-4 flex items-baseline justify-between">
                        <span className="font-mono text-[10px] text-zinc-500">EFFICIENCY_INDEX:</span>
                        <span className="font-mono text-base font-extrabold text-emerald-400">{selectedDim.value}%</span>
                      </div>
                    </div>

                    <p className="font-mono text-[9px] text-zinc-600 text-center italic">
                      // Hover or click node vertices to rotate dimension logs.
                    </p>
                  </div>

                </div>
              )}

              {/* View 2: Tech Stack Metrics (Animated Bars) */}
              {dashboardTab === 'bars' && (
                <div className="space-y-6">
                  {/* Filters inside content */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-2.5 py-1 rounded font-mono text-[10px] transition-all duration-200 cursor-pointer ${
                          activeCategory === cat
                            ? 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-400'
                            : 'bg-zinc-900/60 border border-transparent text-zinc-400 hover:text-zinc-100 hover:border-zinc-800'
                        }`}
                      >
                        {cat.replace('Cyber ', '').toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Progress bars list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredSkills.map((skill) => (
                      <div 
                        key={skill.name} 
                        className="p-3.5 bg-zinc-950 border border-zinc-900/60 rounded-md hover:border-zinc-800 hover:bg-zinc-900/10 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2 text-zinc-300">
                            <div className="p-1.5 rounded bg-zinc-900 text-emerald-500/80">
                              {getIcon(skill.icon)}
                            </div>
                            <span className="font-sans text-xs font-bold text-zinc-300">{skill.name}</span>
                          </div>
                          <span className="font-mono text-xs text-emerald-400 font-bold">{skill.level}%</span>
                        </div>

                        {/* Progress slider bar */}
                        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skill Badge Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-wrap gap-1.5 items-center">
                <span className="font-mono text-[10px] text-zinc-500 mr-2 flex items-center space-x-1">
                  <Layers className="w-3 h-3 text-zinc-500" />
                  <span>ECOSYSTEM:</span>
                </span>
                {['Linux', 'Docker', 'Git', 'Nginx', 'OWASP Zap', 'Tauri', 'Burp Suite', 'Django', 'React', 'PyTorch'].map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 hover:border-zinc-700/50 hover:text-emerald-400 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Real-time GitHub Stats section spanning full layout width */}
        <div className="pt-6">
          <GitHubStats />
        </div>

      </div>
    </section>
  );
}
