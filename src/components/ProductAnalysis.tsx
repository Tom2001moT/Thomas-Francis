import React, { useState } from 'react';
import { 
  Cpu, 
  Server, 
  Database, 
  Network, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Sparkles, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Code2,
  ExternalLink
} from 'lucide-react';

export default function ProductAnalysis() {
  const [simStep, setSimStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  // Simulation handler for Quickie
  const triggerQuickieSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);
    setSimLogs(["[CLIENT] Initializing checkout payload on quickie.food..."]);
    
    setTimeout(() => {
      setSimStep(2);
      setSimLogs(prev => [
        ...prev,
        "[API_GATEWAY] Pre-authorized transaction. Order locked in Redis cache.",
        "[GEO_SERVICE] Geofencing user at (9.6582° N, 76.9211° E) against Dark Kitchen Cluster."
      ]);
    }, 1200);

    setTimeout(() => {
      setSimStep(3);
      setSimLogs(prev => [
        ...prev,
        "[DISPATCH_ENGINE] Matching closest active riders... Greedy constraint check active.",
        "[FIRESTORE] Real-time state created. WebSocket channel established: channel_quick_89a"
      ]);
    }, 2400);

    setTimeout(() => {
      setSimStep(4);
      setSimLogs(prev => [
        ...prev,
        "[RIDER_APP] Order accepted by Rider #204 (Distance: 1.1km).",
        "[SYSTEM] Active tracking loop running. Target delivery ETA: 14 minutes."
      ]);
      setIsSimulating(false);
    }, 3800);
  };

  const resetSimulation = () => {
    setSimStep(0);
    setSimLogs([]);
    setIsSimulating(false);
  };

  return (
    <section 
      id="product-analysis" 
      className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden"
    >
      {/* Background radial effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold">CASE_STUDY_&_ARCHITECTURE</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Commercial <span className="text-emerald-400">Product</span> Deep-Dive
          </h2>
          <p className="font-sans text-sm text-zinc-400 mt-4 leading-relaxed">
            Deep-dive technical review of the live quick-commerce system engineered for hyper-local performance, 
            instant dispatch, and transactional stability at scale.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Block: Deep Technical Analysis (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Overview */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-2xl font-bold text-zinc-100">
                  Quickie.food platform
                </h3>
                <a 
                  href="https://quickie.food/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 font-mono text-[11px] text-zinc-400 hover:text-emerald-400 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 transition-all"
                >
                  <span>LIVE_SITE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              
              <p className="font-sans text-sm text-zinc-400 mt-3 leading-relaxed">
                Quickie is a high-speed, on-demand quick-commerce app enabling customers to order food, groceries, and essential snacks with sub-15 minute delivery times. The application relies heavily on decentralized local hubs, real-time micro-logistics, and a state-of-the-art dispatch matching service.
              </p>
            </div>

            {/* Architecture Highlights (2x2 Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-5 bg-zinc-900/30 border border-zinc-900 rounded-lg">
                <div className="flex items-center space-x-2.5 mb-3">
                  <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans text-xs font-bold text-zinc-200">
                    Hyper-Local Geofencing
                  </h4>
                </div>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  Automated polygon-bounding coordinates lock users to exact dark-kitchen boundaries, preventing order commits outside the delivery zone.
                </p>
              </div>

              <div className="p-5 bg-zinc-900/30 border border-zinc-900 rounded-lg">
                <div className="flex items-center space-x-2.5 mb-3">
                  <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400">
                    <Network className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans text-xs font-bold text-zinc-200">
                    WebSocket Dispatch Engine
                  </h4>
                </div>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  Ultra-low latency duplex socket channels broadcast dispatch requests and stream real-time driver coordinates with predictive ETAs.
                </p>
              </div>

              <div className="p-5 bg-zinc-900/30 border border-zinc-900 rounded-lg">
                <div className="flex items-center space-x-2.5 mb-3">
                  <div className="p-1.5 rounded bg-purple-500/10 text-purple-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans text-xs font-bold text-zinc-200">
                    Reactive Sync Firestore
                  </h4>
                </div>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  Bypasses standard REST overheads by maintaining persistent reactive listeners, allowing immediate multi-client checkout state updates.
                </p>
              </div>

              <div className="p-5 bg-zinc-900/30 border border-zinc-900 rounded-lg">
                <div className="flex items-center space-x-2.5 mb-3">
                  <div className="p-1.5 rounded bg-amber-500/10 text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans text-xs font-bold text-zinc-200">
                    Double-Route Validation
                  </h4>
                </div>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  Authenticates delivery paths both pre-dispatch and mid-route to securely prevent spoofing of rider distance trackers.
                </p>
              </div>

            </div>

            {/* Architecture Stack Details */}
            <div className="p-6 bg-zinc-900/20 border border-zinc-900 rounded-lg">
              <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-3">SYSTEM_TECHNOLOGY_STACK</h4>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "Node.js", "Socket.io", "Cloud Firestore", "TailwindCSS", "Google Maps Matrix API", "Express.js", "TypeScript"].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Block: Live Simulation Engine (5 Columns) */}
          <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-900 rounded-xl p-6 relative flex flex-col justify-between min-h-[480px]">
            
            {/* Top decorative dot */}
            <div className="absolute top-4 right-4 flex items-center space-x-1">
              <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
              <span className="font-mono text-[9px] text-zinc-500">{isSimulating ? 'EXECUTING_SIM' : 'IDLE_WAIT'}</span>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold text-zinc-400 mb-1 flex items-center space-x-1.5">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>INTERACTIVE_SYSTEM_SIMULATOR</span>
              </h4>
              <p className="font-sans text-xs text-zinc-500 mb-6 leading-relaxed">
                Step inside the transactional pipeline. Run a live simulation to observe microservice and protocol communications.
              </p>

              {/* Simulated Flow Graphic */}
              <div className="relative border-l border-zinc-800 pl-4 py-1 space-y-6">
                
                {/* Step 1 */}
                <div className={`relative transition-all duration-300 ${simStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                  <span className={`absolute -left-[22px] top-0.5 w-3 h-3 rounded-full border ${
                    simStep >= 1 ? 'bg-emerald-500 border-emerald-400' : 'bg-zinc-950 border-zinc-800'
                  }`}></span>
                  <p className="font-mono text-[10px] text-zinc-500">PHASE_01</p>
                  <p className="font-sans text-xs font-bold text-zinc-200">
                    Client Checkout Init
                  </p>
                </div>

                {/* Step 2 */}
                <div className={`relative transition-all duration-300 ${simStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                  <span className={`absolute -left-[22px] top-0.5 w-3 h-3 rounded-full border ${
                    simStep >= 2 ? 'bg-emerald-500 border-emerald-400' : 'bg-zinc-950 border-zinc-800'
                  }`}></span>
                  <p className="font-mono text-[10px] text-zinc-500">PHASE_02</p>
                  <p className="font-sans text-xs font-bold text-zinc-200">
                    Geofence Routing Check
                  </p>
                </div>

                {/* Step 3 */}
                <div className={`relative transition-all duration-300 ${simStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                  <span className={`absolute -left-[22px] top-0.5 w-3 h-3 rounded-full border ${
                    simStep >= 3 ? 'bg-emerald-500 border-emerald-400' : 'bg-zinc-950 border-zinc-800'
                  }`}></span>
                  <p className="font-mono text-[10px] text-zinc-500">PHASE_03</p>
                  <p className="font-sans text-xs font-bold text-zinc-200">
                    Dispatch Rider Matching
                  </p>
                </div>

                {/* Step 4 */}
                <div className={`relative transition-all duration-300 ${simStep >= 4 ? 'opacity-100' : 'opacity-30'}`}>
                  <span className={`absolute -left-[22px] top-0.5 w-3 h-3 rounded-full border ${
                    simStep >= 4 ? 'bg-emerald-500 border-emerald-400' : 'bg-zinc-950 border-zinc-800'
                  }`}></span>
                  <p className="font-mono text-[10px] text-zinc-500">PHASE_04</p>
                  <p className="font-sans text-xs font-bold text-zinc-200">
                    Real-Time WebSocket Stream
                  </p>
                </div>

              </div>
            </div>

            {/* Execution Screen Logs */}
            <div className="mt-8">
              <div className="bg-zinc-950 rounded-lg border border-zinc-900 p-4 font-mono text-[10px] h-32 overflow-y-auto space-y-1.5 scrollbar-thin text-zinc-400">
                {simLogs.length === 0 ? (
                  <span className="text-zinc-600 block italic">// Click the dispatch trigger below to run simulation.</span>
                ) : (
                  simLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-emerald-500 mr-1.5 flex-shrink-0">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Simulator Action Buttons */}
              <div className="flex space-x-3 mt-4">
                {simStep === 0 ? (
                  <button
                    onClick={triggerQuickieSimulation}
                    disabled={isSimulating}
                    className="flex-1 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-850 font-mono text-xs text-zinc-100 font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    <span>LAUNCH_SIMULATION</span>
                  </button>
                ) : (
                  <button
                    onClick={resetSimulation}
                    disabled={isSimulating}
                    className="flex-1 py-2.5 rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 disabled:border-zinc-900 font-mono text-xs text-zinc-300 flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                  >
                    <span>RESET_SIMULATOR</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
