import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Printer, 
  Compass, 
  Heart, 
  HeartHandshake,
  Navigation,
  Globe2,
  Download
} from 'lucide-react';

export default function InteractiveCV() {
  const [copied, setCopied] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const languages = [
    { name: 'Malayalam', rating: 7, total: 8 },
    { name: 'English', rating: 6, total: 8 },
    { name: 'Hindi', rating: 5, total: 8 },
    { name: 'Tamil', rating: 3, total: 8 }
  ];

  const softSkills = [
    {
      title: "Active Listening & Articulation",
      desc: "Clear and responsive communications translating technical complexity into actionable steps."
    },
    {
      title: "Analytical Experience Design",
      desc: "Thinking analytically to continuously diagnose and improve user and customer experience loops."
    },
    {
      title: "Rapport & Client Alignment",
      desc: "Establishing immediate trust and collaborative alignment with diverse engineering teams and clients."
    },
    {
      title: "Agility & Pivot Capability",
      desc: "Extreme adaptability and quick strategic thinking in high-velocity startup or incident response environments."
    },
    {
      title: "Constructive Incident Mitigation",
      desc: "Handling complaints and technical pushback constructively, turning roadblocks into architectural compromises."
    }
  ];

  const interests = [
    { name: "Playing Football", icon: "Compass" },
    { name: "Driving & Exploration", icon: "Navigation" },
    { name: "Swimming", icon: "Compass" },
    { name: "Listening Music", icon: "Heart" }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Color Palette - Sleek, High-contrast, Professional Slate and Emerald Green
      const emeraldColor = [16, 185, 129];      // #10b981
      const darkHeaderBg = [15, 23, 42];        // Zinc-900 / Slate-900 (#0f172a)
      const primaryText = [30, 41, 59];         // Slate-800 (#1e293b)
      const secondaryText = [100, 116, 139];     // Slate-500 (#64748b)
      const sidebarBackground = [248, 250, 252]; // Slate-50 / Cool Gray (#f8fafc)
      const borderLineColor = [226, 232, 240];  // Slate-200 (#e2e8f0)

      // 1. Draw elegant dark top header block
      doc.setFillColor(darkHeaderBg[0], darkHeaderBg[1], darkHeaderBg[2]);
      doc.rect(0, 0, 210, 45, 'F');

      // Emerald horizontal accent bar under the header block
      doc.setFillColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
      doc.rect(0, 45, 210, 2, 'F');

      // Header Text Elements
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(26);
      doc.text('THOMAS FRANCIS', 15, 22);

      doc.setFontSize(8.5);
      doc.setTextColor(203, 213, 225); // Slate-300
      doc.text('DOB: 27.11.2001  |  Email: thomasfrancis27.11.2001@gmail.com  |  Phone: +91 6282296854', 15, 36);

      // 2. Draw Left Sidebar Column Background
      doc.setFillColor(sidebarBackground[0], sidebarBackground[1], sidebarBackground[2]);
      doc.rect(0, 47, 72, 250, 'F');

      // 3. --- LEFT SIDEBAR CONTENT (x = 10, width = 52) ---
      let yLeft = 58;

      // Contact Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      doc.text('CONTACT COORDINATES', 10, yLeft);
      yLeft += 4;

      // Divider Line
      doc.setDrawColor(borderLineColor[0], borderLineColor[1], borderLineColor[2]);
      doc.setLineWidth(0.3);
      doc.line(10, yLeft, 62, yLeft);
      yLeft += 6;

      // Residence Info
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
      doc.text('RESIDENCE', 10, yLeft);
      yLeft += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      const addressLines = doc.splitTextToSize("Kumpukkal House, Upputhara P.O, Upputhara, 685505, Idukki, Kerala, India", 52);
      doc.text(addressLines, 10, yLeft);
      yLeft += (addressLines.length * 4) + 2;

      // Telephone Info
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
      doc.text('TELEPHONE', 10, yLeft);
      yLeft += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      doc.text('+91 6282296854', 10, yLeft);
      yLeft += 9;

      // Email Info
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
      doc.text('EMAIL ADDRESS', 10, yLeft);
      yLeft += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      doc.text('thomasfrancis27.11.2001@gmail.com', 10, yLeft);
      yLeft += 15;

      // Languages Section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      doc.text('LANGUAGES', 10, yLeft);
      yLeft += 4;

      doc.line(10, yLeft, 62, yLeft);
      yLeft += 6;

      languages.forEach(lang => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
        doc.text(lang.name, 10, yLeft);

        // Render skill indicator dots
        const dotStartX = 36;
        for (let i = 0; i < lang.total; i++) {
          if (i < lang.rating) {
            doc.setFillColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
          } else {
            doc.setFillColor(226, 232, 240); // empty light dot
          }
          doc.circle(dotStartX + (i * 3), yLeft - 1, 0.9, 'F');
        }
        yLeft += 6.5;
      });
      yLeft += 10;

      // Driving License Section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      doc.text('DRIVING LICENCE', 10, yLeft);
      yLeft += 4;

      doc.line(10, yLeft, 62, yLeft);
      yLeft += 6;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      doc.text('CLASSES AUTHORISED:', 10, yLeft);
      yLeft += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(secondaryText[0], secondaryText[1], secondaryText[2]);
      doc.text('• MCWG (Motor Cycle with Gear)', 10, yLeft);
      yLeft += 4.5;
      doc.text('• LMV (Light Motor Vehicle)', 10, yLeft);
      yLeft += 14;

      // Personal Hobbies / Interests
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      doc.text('INTERESTS', 10, yLeft);
      yLeft += 4;

      doc.line(10, yLeft, 62, yLeft);
      yLeft += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      interests.forEach(interest => {
        doc.text(`• ${interest.name}`, 10, yLeft);
        yLeft += 5;
      });


      // 4. --- RIGHT SIDE CORE CONTENT (x = 82, width = 113) ---
      let yRight = 58;

      // Academic Roadmap
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      doc.text('ACADEMIC ROADMAP', 82, yRight);
      yRight += 4;

      doc.line(82, yRight, 195, yRight);
      yRight += 7;

      // Timeline Item 1: HSC (2021)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
      doc.text('2021', 82, yRight);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      doc.text('Higher Secondary Certificate (HSC)', 97, yRight);
      yRight += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(secondaryText[0], secondaryText[1], secondaryText[2]);
      doc.text("St. Philomina's Higher Secondary School, Upputhara", 97, yRight);
      yRight += 9;

      // Timeline Item 2: SSLC (2018)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
      doc.text('2018', 82, yRight);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      doc.text('Secondary School Leaving Certificate (SSLC)', 97, yRight);
      yRight += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(secondaryText[0], secondaryText[1], secondaryText[2]);
      doc.text("St. Philomina's School, Upputhara", 97, yRight);
      yRight += 16;

      // Interpersonal Expertise
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      doc.text('INTERPERSONAL EXPERTISE', 82, yRight);
      yRight += 4;

      doc.line(82, yRight, 195, yRight);
      yRight += 7;

      softSkills.forEach(skill => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
        doc.text(skill.title, 82, yRight);
        yRight += 4.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(secondaryText[0], secondaryText[1], secondaryText[2]);
        const wrappedDesc = doc.splitTextToSize(skill.desc, 110);
        doc.text(wrappedDesc, 82, yRight);
        yRight += (wrappedDesc.length * 4.5) + 3;
      });

      yRight += 2;

      // Computer Knowledge
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(primaryText[0], primaryText[1], primaryText[2]);
      doc.text('COMPUTER KNOWLEDGE & SKILLS', 82, yRight);
      yRight += 4;

      doc.line(82, yRight, 195, yRight);
      yRight += 7;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(secondaryText[0], secondaryText[1], secondaryText[2]);
      const knowledgeText = "Microsoft Office (Word, Excel, PowerPoint), HTML, CSS, JavaScript, C++, C, Python, Lua, React, Node JS, Firebase, SQL, Mongo DB, supabase, Git, and custom full-stack solutions.";
      const wrappedKnowledge = doc.splitTextToSize(knowledgeText, 113);
      doc.text(wrappedKnowledge, 82, yRight);

      // Trigger download
      doc.save('Thomas_Francis_CV.pdf');
    } catch (err) {
      console.error("Failed to generate CV PDF", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section 
      id="cv" 
      className="py-20 bg-zinc-950 border-t border-zinc-900 relative print:bg-white print:text-zinc-900 print:py-6"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(6,182,212,0.03),rgba(0,0,0,0))] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:px-4">
        
        {/* Heading Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 print:mb-8">
          <div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight print:text-zinc-900 print:text-2xl">
              Curriculum <span className="text-emerald-400 print:text-emerald-600">Vitae</span>
            </h2>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-2 print:text-zinc-400">
              OFFICIAL EDUCATION, CREDENTIALS & PERSONAL DATA
            </p>
          </div>

          {/* Action Trigger */}
          <div className="mt-4 md:mt-0 flex items-center space-x-3 print:hidden">
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 border border-emerald-500/10 text-xs font-mono text-zinc-100 disabled:text-zinc-500 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <Download className={`w-4 h-4 ${isGenerating ? 'animate-bounce' : ''}`} />
              <span>{isGenerating ? 'GENERATING_PDF...' : 'DOWNLOAD_PDF'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-200 hover:text-emerald-400 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT_OR_SAVE_PDF</span>
            </button>
          </div>
        </div>

        {/* CV Split Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:grid-cols-12 print:gap-4">
          
          {/* Left Column: Personal Metadata & Visual Bars (5 cols) */}
          <div className="lg:col-span-5 space-y-6 print:col-span-5 print:space-y-4">
            
            {/* Identity Profile Details */}
            <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-lg print:border-zinc-300 print:bg-white print:p-4">
              <div className="flex items-center space-x-4 mb-6 print:mb-4">
                <div className="relative w-16 h-16 rounded-lg bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center print:bg-emerald-50 print:border-emerald-300">
                  <FileText className="w-8 h-8 text-emerald-400 print:text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-sans text-lg font-bold text-zinc-100 print:text-zinc-900">Thomas Francis</h3>
                  <p className="font-mono text-[10px] text-zinc-500 print:text-zinc-400">DOB: 27.11.2001 (India)</p>
                </div>
              </div>

              {/* Personal Data Coordinates list */}
              <div className="space-y-4 font-sans text-xs text-zinc-300 print:text-zinc-800 print:space-y-2">
                <div 
                  onClick={() => handleCopy("Kumpukkal House, Upputhara P.O, Upputhara, 685505, Idukki, Kerala, India", "ADDRESS")}
                  className="p-3 bg-zinc-950 border border-zinc-900 rounded-md hover:border-zinc-800 transition-all duration-300 cursor-pointer flex items-start space-x-3 print:bg-zinc-50 print:border-zinc-200"
                >
                  <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0 print:text-emerald-600" />
                  <div className="flex-1">
                    <span className="font-mono text-[9px] text-zinc-500 block">RESIDENCE</span>
                    <span>Kumpukkal House, Upputhara P.O, Upputhara, 685505, Idukki, Kerala, India</span>
                    {copied === "ADDRESS" && <span className="text-[9px] text-emerald-400 font-mono block mt-1">Copied to clipboard!</span>}
                  </div>
                </div>

                <div 
                  onClick={() => handleCopy("+916282296854", "PHONE")}
                  className="p-3 bg-zinc-950 border border-zinc-900 rounded-md hover:border-zinc-800 transition-all duration-300 cursor-pointer flex items-start space-x-3 print:bg-zinc-50 print:border-zinc-200"
                >
                  <Phone className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0 print:text-cyan-600" />
                  <div className="flex-1">
                    <span className="font-mono text-[9px] text-zinc-500 block">TELEPHONE Link</span>
                    <span className="font-mono font-bold text-zinc-200 print:text-zinc-900">+91 6282296854</span>
                    {copied === "PHONE" && <span className="text-[9px] text-cyan-400 font-mono block mt-1">Copied to clipboard!</span>}
                  </div>
                </div>

                <div 
                  onClick={() => handleCopy("thomasfrancis27.11.2001@gmail.com", "EMAIL")}
                  className="p-3 bg-zinc-950 border border-zinc-900 rounded-md hover:border-zinc-800 transition-all duration-300 cursor-pointer flex items-start space-x-3 print:bg-zinc-50 print:border-zinc-200"
                >
                  <Mail className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0 print:text-emerald-600" />
                  <div className="flex-1">
                    <span className="font-mono text-[9px] text-zinc-500 block">ELECTRONIC DISPATCH</span>
                    <span className="font-mono text-zinc-200 print:text-zinc-900">thomasfrancis27.11.2001@gmail.com</span>
                    {copied === "EMAIL" && <span className="text-[9px] text-emerald-400 font-mono block mt-1">Copied to clipboard!</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Language Rating Dots */}
            <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-lg print:border-zinc-300 print:bg-white print:p-4">
              <h4 className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-4 border-b border-zinc-800 pb-2 print:text-zinc-800 print:border-zinc-200">
                LANGUAGES & DIALECTS
              </h4>

              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold text-zinc-300 print:text-zinc-800">{lang.name}</span>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: lang.total }).map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2.5 h-2.5 rounded-full ${
                            i < lang.rating 
                              ? 'bg-emerald-500 print:bg-emerald-600' 
                              : 'bg-zinc-800 print:bg-zinc-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Driving License Details */}
            <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-lg print:border-zinc-300 print:bg-white print:p-4">
              <h4 className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-3 border-b border-zinc-800 pb-2 print:text-zinc-800 print:border-zinc-200">
                DRIVING LICENCE REGISTER
              </h4>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 print:bg-zinc-100 print:border-zinc-200 print:text-zinc-800">
                  MCWG (Motor Cycle With Gear)
                </span>
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 print:bg-zinc-100 print:border-zinc-200 print:text-zinc-800">
                  LMV (Light Motor Vehicle)
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Educational Timeline, Skills Portfolio & Interests (7 cols) */}
          <div className="lg:col-span-7 space-y-6 print:col-span-7 print:space-y-4">
            
            {/* Education Timeline */}
            <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-lg print:border-zinc-300 print:bg-white print:p-4">
              <h3 className="font-sans text-base font-bold text-zinc-100 flex items-center space-x-2 mb-6 print:text-zinc-900 print:mb-4">
                <GraduationCap className="w-5 h-5 text-emerald-400 print:text-emerald-600" />
                <span>Academic Roadmap</span>
              </h3>

              {/* Vertical line steps */}
              <div className="relative border-l border-zinc-800 pl-6 space-y-8 ml-3 print:border-zinc-200">
                {/* Step 1: HS */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-mono text-[9px] print:bg-white print:border-emerald-600 print:text-emerald-600">
                    HS
                  </span>
                  <div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-emerald-400 print:bg-zinc-100 print:border-zinc-200 print:text-emerald-600 font-bold">
                      2021
                    </span>
                    <h4 className="font-sans text-sm font-bold text-zinc-200 mt-2 print:text-zinc-900">
                      Higher Secondary Certificate (HSC)
                    </h4>
                    <p className="font-sans text-xs text-zinc-400 mt-1 print:text-zinc-600">
                      St. Philomina's Higher Secondary School, Upputhara
                    </p>
                  </div>
                </div>

                {/* Step 2: SSLC */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-cyan-500/20 border border-cyan-500 text-cyan-400 font-mono text-[9px] print:bg-white print:border-cyan-600 print:text-cyan-600">
                    SS
                  </span>
                  <div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-cyan-400 print:bg-zinc-100 print:border-zinc-200 print:text-cyan-600 font-bold">
                      2018
                    </span>
                    <h4 className="font-sans text-sm font-bold text-zinc-200 mt-2 print:text-zinc-900">
                      Secondary School Leaving Certificate (SSLC)
                    </h4>
                    <p className="font-sans text-xs text-zinc-400 mt-1 print:text-zinc-600">
                      St. Philomina's School, Upputhara
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interpersonal/Expertise Skills list */}
            <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-lg print:border-zinc-300 print:bg-white print:p-4">
              <h3 className="font-sans text-base font-bold text-zinc-100 flex items-center space-x-2 mb-6 print:text-zinc-900 print:mb-4">
                <HeartHandshake className="w-5 h-5 text-emerald-400 print:text-emerald-600" />
                <span>Interpersonal Expertise</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-1">
                {softSkills.map((skill, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-zinc-950 border border-zinc-900 rounded-md hover:border-zinc-800 transition-colors flex items-start space-x-2.5 print:bg-zinc-50 print:border-zinc-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5 print:text-emerald-600" />
                    <div>
                      <h4 className="font-sans text-xs font-bold text-zinc-200 print:text-zinc-900">{skill.title}</h4>
                      <p className="font-sans text-[11px] text-zinc-500 mt-0.5 leading-normal print:text-zinc-600">{skill.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hobbies & Interests Grid */}
            <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-lg print:border-zinc-300 print:bg-white print:p-4">
              <h3 className="font-sans text-base font-bold text-zinc-100 flex items-center space-x-2 mb-4 print:text-zinc-900">
                <Compass className="w-5 h-5 text-cyan-400 print:text-cyan-600" />
                <span>Interests & Pursuits</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 print:grid-cols-4">
                {interests.map((interest) => (
                  <div 
                    key={interest.name}
                    className="p-3 bg-zinc-950 border border-zinc-900 rounded-md text-center hover:border-cyan-500/10 hover:bg-zinc-900/30 transition-all duration-300 print:bg-zinc-50 print:border-zinc-200"
                  >
                    <span className="font-sans text-xs text-zinc-300 block font-medium print:text-zinc-800">
                      {interest.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
