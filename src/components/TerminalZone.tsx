import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { ShieldCheck, Play, Server, AlertTriangle, CheckCircle, RefreshCw, Terminal, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

interface AuditLog {
  text: string;
  type: 'info' | 'warning' | 'success' | 'danger';
}

interface SecurityResult {
  score: string;
  color: string;
  percent: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'F';
  findings: { title: string; desc: string; severity: 'low' | 'medium' | 'high' | 'info'; solution: string }[];
}

export default function TerminalZone() {
  const [target, setTarget] = useState('example.com');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [result, setResult] = useState<SecurityResult | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const testLogs = [
    { text: "Initializing cyber auditing engine on host socket 127.0.0.1...", type: "info" },
    { text: "Resolving DNS nameservers for audit target: [TARGET]...", type: "info" },
    { text: "Target resolved to IPv4: 93.184.216.34 (Geographic node: US-East)", type: "success" },
    { text: "Spawning multi-threaded port scanner (syn-packet protocol)...", type: "info" },
    { text: "Port 22 (SSH) - FILTERED / SECURE", type: "success" },
    { text: "Port 80 (HTTP) - OPEN (Redirecting to HTTPS)", type: "info" },
    { text: "Port 443 (HTTPS) - OPEN (TLS 1.3 Negotiation active)", type: "success" },
    { text: "Port 3306 (MySQL) - CLOSED / TIMEOUT", type: "success" },
    { text: "Retrieving remote HTTP response headers...", type: "info" },
    { text: "HEADER CHECK: 'X-Frame-Options' -> MISSING. SUSCEPTIBLE TO CLICKJACKING.", type: "warning" },
    { text: "HEADER CHECK: 'Content-Security-Policy' (CSP) -> SECURE. Properly constrained rules found.", type: "success" },
    { text: "HEADER CHECK: 'Strict-Transport-Security' (HSTS) -> SECURE. 31536000 max-age set.", type: "success" },
    { text: "HEADER CHECK: 'X-Content-Type-Options' -> MISSING. Sniffing attacks possible.", type: "warning" },
    { text: "Auditing cipher suites for weak SSL/TLS protocols...", type: "info" },
    { text: "WARNING: Legacy TLS 1.0/1.1 accepted by peer socket. Decryption threat verified.", type: "danger" },
    { text: "OWASP Top 10 automated vector validation complete.", type: "success" },
    { text: "Auditing complete. Compiling secure executive assessment...", type: "info" }
  ];

  const scanReport: SecurityResult = {
    score: "82/100",
    percent: 82,
    color: "text-emerald-400",
    grade: "B",
    findings: [
      {
        title: "Legacy TLS Versions Permitted (TLS 1.0 / 1.1)",
        desc: "The remote server negotiates handshakes using deprecated TLS protocols, rendering clients susceptible to cipher suite downgrades and decryption vectors.",
        severity: "high",
        solution: "Disable TLS 1.0 and 1.1 handshakes in your web server configurations (nginx/apache). Restrict handshakes exclusively to TLS 1.2 and TLS 1.3."
      },
      {
        title: "Missing 'X-Frame-Options' Header",
        desc: "The HTTP response header is missing, permitting malicious actors to load the target domain inside nested iframes, making users vulnerable to clickjacking overlay scams.",
        severity: "medium",
        solution: "Append 'X-Frame-Options: SAMEORIGIN' or 'frame-ancestors' CSP rules to all serving headers."
      },
      {
        title: "Missing 'X-Content-Type-Options' Sniffing Protection",
        desc: "Lacking 'nosniff' parameters allows browsers to bypass official Content-Type headers, executing files under mislabeled MIME types (e.g. stylesheet acting as executable script).",
        severity: "low",
        solution: "Configure the server to respond with header 'X-Content-Type-Options: nosniff'."
      },
      {
        title: "Sanitized Input Validation (OWASP Shield Active)",
        desc: "Input forms on the domain correctly escape query strings, blocking potential cross-site scripting (XSS) and SQL injection attempts.",
        severity: "info",
        solution: "No mitigation required. System configuration is fully optimized."
      }
    ]
  };

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleStartAudit = (e: FormEvent) => {
    e.preventDefault();
    if (isRunning) return;

    setIsRunning(true);
    setProgress(0);
    setLogs([]);
    setResult(null);

    let logIndex = 0;
    const intervalTime = 300; // time between logs

    const logTimer = setInterval(() => {
      if (logIndex < testLogs.length) {
        const templateLog = testLogs[logIndex];
        const formattedText = templateLog.text.replace('[TARGET]', target);
        
        setLogs(prev => [...prev, { text: formattedText, type: templateLog.type as any }]);
        setProgress(Math.round(((logIndex + 1) / testLogs.length) * 100));
        logIndex++;
      } else {
        clearInterval(logTimer);
        setIsRunning(false);
        setResult(scanReport);
      }
    }, intervalTime);
  };

  const getSeverityBadgeColor = (sev: 'low' | 'medium' | 'high' | 'info') => {
    switch (sev) {
      case 'high': return 'bg-red-950/45 border-red-500/20 text-red-400';
      case 'medium': return 'bg-amber-950/45 border-amber-500/20 text-amber-400';
      case 'low': return 'bg-yellow-950/45 border-yellow-500/20 text-yellow-500';
      default: return 'bg-blue-950/45 border-blue-500/20 text-blue-400';
    }
  };

  return (
    <section 
      id="cyber" 
      className="py-20 bg-zinc-950 border-t border-zinc-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Certified Hacking <span className="text-emerald-400">Playground</span>
          </h2>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-2">
            SIMULATE AN OWASP SECURITY PORT & CIPHER AUDIT
          </p>
          <div className="w-12 h-1 bg-emerald-500 mx-auto mt-4 rounded"></div>
        </div>

        {/* Audit Form and Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form & Progress (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-lg">
              <h3 className="font-sans text-base font-bold text-zinc-100 flex items-center space-x-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Trigger Port & Header Scan</span>
              </h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-6">
                Enter any domain name or server IP below. Certified Ethical Hacker (CEH) automated algorithms will check server configuration, SSL handshakes, and headers.
              </p>

              <form onSubmit={handleStartAudit} className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] text-zinc-500 uppercase mb-2">TARGET DOMAIN / HOSTNAME</label>
                  <div className="relative">
                    <Server className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      placeholder="e.g. targetdomain.com"
                      disabled={isRunning}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500/50 rounded-md py-2.5 pl-9 pr-4 font-mono text-xs text-zinc-100 focus:outline-none transition-colors disabled:opacity-55"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isRunning}
                  className="w-full py-3 rounded bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:border-zinc-900 text-zinc-100 font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/20"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>AUDITING_ACTIVE_({progress}%)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>INITIATE PENETRATION AUDIT</span>
                    </>
                  )}
                </button>
              </form>

              {/* Live progress indicators */}
              {isRunning && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between font-mono text-[10px] text-zinc-500">
                    <span>SECURITY CORE BUSY</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Hacking certification badge info */}
            <div className="p-5 bg-zinc-900/10 border border-zinc-900 rounded-lg flex items-start space-x-3">
              <ShieldAlert className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">CEH POLICY NOTE</p>
                <p className="font-sans text-[11px] text-zinc-400 mt-1 leading-normal">
                  This tool operates fully client-side and simulated. No malicious exploits are triggered. Live auditing adheres to OWASP guidelines and EC-Council standards.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Logging Output & Executive Results (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Live Terminal Output Console */}
            <div className="rounded-lg bg-zinc-950 border border-zinc-900 shadow-2xl h-[330px] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-900">
                <span className="font-mono text-[10px] text-zinc-400 flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                  <span>CEH_AUDITOR://{target}</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>

              <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] space-y-2 scrollbar-thin scrollbar-thumb-zinc-800">
                {logs.length === 0 ? (
                  <div className="text-zinc-600 h-full flex flex-col items-center justify-center space-y-2 select-none">
                    <Cpu className="w-8 h-8 text-zinc-700 animate-pulse" />
                    <span>SYSTEM IDLE. INITIATE AUDIT TO RECORD DEPLOYED VECTORS.</span>
                  </div>
                ) : (
                  logs.map((log, idx) => (
                    <div 
                      key={idx}
                      className={`leading-relaxed ${
                        log.type === 'danger' ? 'text-red-400 bg-red-950/20 border-l border-red-500 pl-2 py-0.5 rounded-r' :
                        log.type === 'warning' ? 'text-amber-400 bg-amber-950/20 border-l border-amber-500 pl-2 py-0.5 rounded-r' :
                        log.type === 'success' ? 'text-emerald-400' : 'text-zinc-500'
                      }`}
                    >
                      {log.text}
                    </div>
                  ))
                )}
                <div ref={logsEndRef} />
              </div>
            </div>

            {/* Dynamic Security Executive Report Card */}
            {result && (
              <div className="p-6 bg-zinc-900/35 border border-zinc-900 rounded-lg animate-fadeIn duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-zinc-900 gap-4">
                  <div>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/20 text-emerald-400">
                      EXECUTIVE ASSESSMENT GENERATED
                    </span>
                    <h3 className="font-sans text-xl font-extrabold text-zinc-100 mt-2">
                      Security Profile: <span className="text-emerald-400">{target}</span>
                    </h3>
                  </div>

                  {/* Rating Grade circle */}
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className="font-mono text-xs text-zinc-400 block">HEALTH INDEX</span>
                      <span className="font-mono text-sm font-extrabold text-zinc-200">{result.score}</span>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-emerald-500/50 flex items-center justify-center font-mono text-lg font-extrabold text-emerald-400 bg-emerald-950/20 shadow-md">
                      {result.grade}
                    </div>
                  </div>
                </div>

                {/* Audit findings bullet layout */}
                <div className="mt-6 space-y-4">
                  <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">THREAT_LOG_FINDINGS ({result.findings.length})</h4>
                  
                  <div className="space-y-3">
                    {result.findings.map((find, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-zinc-950 border border-zinc-900 rounded-md hover:border-zinc-800 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="font-sans text-xs font-extrabold text-zinc-200">
                            {find.title}
                          </span>
                          <span className={`px-2 py-0.5 rounded border font-mono text-[8px] uppercase font-bold tracking-wider w-fit ${getSeverityBadgeColor(find.severity)}`}>
                            {find.severity}_severity
                          </span>
                        </div>
                        <p className="font-sans text-xs text-zinc-400 mt-2 leading-relaxed">
                          {find.desc}
                        </p>
                        <div className="mt-3 pt-3 border-t border-zinc-900/60 font-sans text-xs text-zinc-400 flex items-start space-x-1.5">
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-zinc-300 font-medium">Mitigation:</strong> {find.solution}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
