import React, { useState, FormEvent } from 'react';
import { Mail, Github, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    // Simulate sending progress logs
    setTimeout(() => {
      setIsSending(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="py-20 bg-zinc-950 border-t border-zinc-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Secure <span className="text-emerald-400">Channels</span>
          </h2>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-2">
            DISPATCH SECURE TRANSMISSIONS OR CONNECT DIRECTLY
          </p>
          <div className="w-12 h-1 bg-emerald-500 mx-auto mt-4 rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-lg space-y-6">
              <h3 className="font-sans text-base font-bold text-zinc-100 uppercase tracking-wider font-mono">
                DIRECT_COORDINATES
              </h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Looking to build deep local AI applications, require smart custom modules for your Frappe/ERPNext network, or require a vulnerability audit on your active APIs? Feel free to establish a secure handshake.
              </p>

              {/* Coordinates details */}
              <div className="space-y-4 pt-2">
                <a 
                  href="mailto:thomasfrancis27.11.2001@gmail.com" 
                  className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-md hover:border-emerald-500/20 transition-all duration-300 flex items-center space-x-3.5 group"
                >
                  <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 group-hover:bg-emerald-950/20 transition-colors">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block leading-none">VERIFIED EMAIL</span>
                    <span className="font-sans text-xs text-zinc-300 group-hover:text-emerald-400 transition-colors">thomasfrancis27.11.2001@gmail.com</span>
                  </div>
                </a>

                <a 
                  href="https://github.com/Tom2001moT" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-md hover:border-cyan-500/20 transition-all duration-300 flex items-center space-x-3.5 group"
                >
                  <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-cyan-400 group-hover:bg-cyan-950/20 transition-colors">
                    <Github className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block leading-none">GITHUB SOURCE</span>
                    <span className="font-sans text-xs text-zinc-300 group-hover:text-cyan-400 transition-colors">github.com/Tom2001moT</span>
                  </div>
                </a>
              </div>
            </div>

            {/* PGP keys simulation card */}
            <div className="p-5 bg-zinc-900/10 border border-zinc-900 rounded-lg">
              <span className="font-mono text-[10px] text-emerald-400 flex items-center space-x-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PGP_FINGERPRINT_ACTIVE</span>
              </span>
              <p className="font-mono text-[10px] text-zinc-500 break-all select-all mt-2.5 bg-zinc-950 p-3 rounded border border-zinc-900 leading-normal">
                E48B 9170 3C4F 889C 7A21 F840 CEB9 1234 A58E 90B1
              </p>
            </div>
          </div>

          {/* Right Column: Encrypted Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-lg relative">
              <div className="absolute top-0 right-4 -translate-y-1/2 bg-zinc-950 px-3 py-0.5 border border-zinc-800 rounded font-mono text-[10px] text-emerald-400">
                SECURE_FORM
              </div>

              {success ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                  <div>
                    <h4 className="font-sans text-base font-bold text-zinc-100">Transmission Dispatched Successfully!</h4>
                    <p className="font-sans text-xs text-zinc-400 mt-1 max-w-sm">
                      Your query has been sanitized and cryptographically sent. Thomas Francis will establish a telemetry link shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] text-zinc-500 uppercase mb-1.5">SENDER NAME</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-900 focus:border-zinc-800 rounded-md py-2.5 px-3.5 font-sans text-xs text-zinc-100 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] text-zinc-500 uppercase mb-1.5">SENDER EMAIL</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-900 focus:border-zinc-800 rounded-md py-2.5 px-3.5 font-sans text-xs text-zinc-100 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-zinc-500 uppercase mb-1.5">TRANSMISSION SUBJECT</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-900 focus:border-zinc-800 rounded-md py-2.5 px-3.5 font-sans text-xs text-zinc-100 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-zinc-500 uppercase mb-1.5">CIPHER TEXT BODY / QUERY</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full bg-zinc-950 border border-zinc-900 focus:border-zinc-800 rounded-md py-2.5 px-3.5 font-sans text-xs text-zinc-100 focus:outline-none transition-colors resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3 rounded bg-zinc-100 hover:bg-zinc-200 disabled:bg-zinc-800 text-zinc-950 font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    {isSending ? (
                      <span>TRANSMITTING...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>DISPATCH_TRANSMISSION</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Footer info line */}
        <div className="mt-16 pt-8 border-t border-zinc-900 text-center font-mono text-[10px] text-zinc-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} THOMAS FRANCIS. ALL SECURED RIGHTS RESERVED.</span>
          <span className="flex items-center space-x-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
            <span>ENCRYPTED_TLS_V1.3</span>
          </span>
        </div>

      </div>
    </section>
  );
}
