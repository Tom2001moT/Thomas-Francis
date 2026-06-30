import { Repository, Skill, Achievement } from './types';

export const BACKUP_PROJECTS: Repository[] = [
  {
    id: 201,
    name: "quickie-food-platform",
    description: "Flagship hyper-local quick-commerce food ordering and real-time dispatch platform delivering in under 20 minutes.",
    html_url: "https://github.com/Tom2001moT/quickie-food-platform",
    stargazers_count: 89,
    forks_count: 24,
    language: "TypeScript",
    updated_at: "2026-06-29T18:00:00Z",
    custom_category: "Web & ERP",
    demo_url: "https://quickie.food/",
    detailed_description: "Quickie.food is an ultra-fast hyper-local food commerce platform operating on a decentralized dark-kitchen dispatch model. Engineered with React/Next.js for sub-second page loads, a real-time WebSocket order tracking system, and a predictive dispatch algorithm to match orders with optimal nearby delivery riders.",
    technology_stack: ["TypeScript", "Next.js", "Node.js", "Socket.io", "Firestore", "Tailwind CSS", "Google Maps API"],
    key_features: [
      "Hyper-local Radius Geofencing - Auto-routes queries to nearest food hubs and active dark stores",
      "WebSocket Live Dispatch - Real-time rider tracking with map-synchronized GPS updates",
      "Predictive Demand Forecasting - Pre-allocates active riders based on temporal rush-hour weights",
      "Frictionless Checkout - Secure payment split-settlement system for instant multi-party vendor payouts"
    ]
  },
  {
    id: 202,
    name: "FreshtoCook",
    description: "Premium D2C perishable fresh food e-commerce platform featuring cold-chain shelf-life auto-tracking and dynamic weight-based checkout.",
    html_url: "https://github.com/Tom2001moT/FreshtoCook",
    stargazers_count: 76,
    forks_count: 18,
    language: "TypeScript",
    updated_at: "2026-06-28T20:30:00Z",
    custom_category: "Web & ERP",
    demo_url: "https://github.com/Tom2001moT/FreshtoCook",
    detailed_description: "FreshtoCook is a high-end direct-to-consumer e-commerce application and backend designed specifically for high-turnover raw meats and fresh seafood. Integrated directly with cold-storage thermal loggers and fish2home-erp to ensure real-time shelf-life tracking, weight-based pre-authorization pricing, and adaptive route optimization.",
    technology_stack: ["TypeScript", "React Native", "Node.js", "PostgreSQL", "Redis Locks", "Frappe / ERPNext"],
    key_features: [
      "Weight Pre-Authorization Checkout - Captures precise final invoice value post-cutting rather than fixed estimates",
      "Cold-Chain Thermal Alerting - Auto-routes and flags orders if shipment bag exceeds safety temperature thresholds",
      "Redis Micro-Stock Locking - Prevents checkout conflicts on high-demand fresh harbor landings",
      "ERPNext Synced Logistics - Direct integration with back-of-house ERP systems for seamless supply chain visibility"
    ]
  },
  {
    id: 101,
    name: "ClearCut-Local-AI-Background-Eraser",
    description: "A lightweight, fully offline desktop application that erases image backgrounds instantly using high-precision AI models, ensuring total data privacy.",
    html_url: "https://github.com/Tom2001moT/ClearCut-Local-AI-Background-Eraser",
    stargazers_count: 32,
    forks_count: 8,
    language: "TypeScript",
    updated_at: "2026-06-15T12:00:00Z",
    custom_category: "AI & Security",
    detailed_description: "ClearCut is an advanced offline utility built specifically for privacy-conscious users. Modern background erasers send your images to cloud servers, risking sensitive info. ClearCut runs Segment Anything (SAM) and custom U-Net models completely locally using ONNX Runtime inside a native wrapper.",
    technology_stack: ["TypeScript", "ONNX Runtime", "React", "TailwindCSS", "WebAssembly"],
    key_features: [
      "100% Offline Processing - Images never leave your machine",
      "Dynamic Canvas Editor - Real-time brush refinements and feathering",
      "Batch Image Operations - Process entire folders with a single click",
      "WebAssembly & GPU Acceleration - Sub-second background removal using WebGL hooks"
    ]
  },
  {
    id: 102,
    name: "android-sms-gateway",
    description: "An Android system that forwards incoming SMS messages directly to a designated web API endpoint, turning a real phone into a scalable, low-cost SMS receiving gateway.",
    html_url: "https://github.com/Tom2001moT/android-sms-gateway",
    stargazers_count: 54,
    forks_count: 14,
    language: "Kotlin",
    updated_at: "2026-05-20T10:30:00Z",
    custom_category: "Android & Utilities",
    detailed_description: "A developer tool designed to bypass expensive cloud SMS reception plans. This background-service-driven Android app monitors incoming SMS messages, extracts sender info, timestamp, and message body, and makes an HTTP POST request to your specified callback web API in real-time.",
    technology_stack: ["Kotlin", "Android SDK", "Background Services", "Retrofit", "Room DB"],
    key_features: [
      "Real-time Broadcast Monitoring - Forwards messages within 100ms",
      "Offline Sync & Retry Queue - Holds failed deliveries in local SQLite database until connection restores",
      "Bearer Token & Secret Signing - Secures forwarded payloads against spoofing",
      "Deep Battery Optimization - Runs silent in background using WorkManager"
    ]
  },
  {
    id: 103,
    name: "cross-platform-llm-client",
    description: "A high-performance desktop LLM client supporting Google Gemini, Claude, and Llama, with encrypted local history storage and custom developer prompt templates.",
    html_url: "https://github.com/Tom2001moT/cross-platform-llm-client",
    stargazers_count: 27,
    forks_count: 5,
    language: "TypeScript",
    updated_at: "2026-06-28T14:15:00Z",
    custom_category: "AI & Security",
    detailed_description: "An elegant workspace client for developers to centralize their AI-assisted engineering. Connects directly to APIs server-side or client-side, storing keys inside secure OS keychains and housing all logs inside locally encrypted storage files.",
    technology_stack: ["TypeScript", "React", "Google GenAI SDK", "TailwindCSS", "Markdown Parser"],
    key_features: [
      "Unified API Integration - Supports multiple frontier models dynamically",
      "Encrypted Local Database - Logs stored securely using AES-256 local files",
      "Developer Prompt Hub - Save, tag, and hotkey standard coding prompts",
      "Full Code Highlighting - Auto-syntax parsing for 40+ programming languages"
    ]
  },
  {
    id: 104,
    name: "reverse-SynthID",
    description: "An ethical hacking security suite analyzing AI-generated media watermarks, measuring susceptibility to pattern disruption and steganographic tampering.",
    html_url: "https://github.com/Tom2001moT/reverse-SynthID",
    stargazers_count: 18,
    forks_count: 3,
    language: "Python",
    updated_at: "2026-04-12T09:00:00Z",
    custom_category: "AI & Security",
    detailed_description: "Developed as part of a cybersecurity research initiative, this library investigates imperceptible frequency-domain watermarks (like SynthID) embedded into synthetic images. It implements and runs structural vulnerability tests to study watermark robustness under adversarial attacks, rotation, cropping, and color shifts.",
    technology_stack: ["Python", "PyTorch", "OpenCV", "NumPy", "Frequency Steganography"],
    key_features: [
      "Discrete Cosine Transform (DCT) Profiler - Visualizes watermark frequency bands",
      "Adversarial Pattern Disrupter - Evaluates minimum noise threshold to obscure watermarks",
      "Image Normalization Engine - Simulates standard web hosting compressions",
      "Comprehensive Threat Assessment Reports - Exports safety profiles for watermarking mechanisms"
    ]
  },
  {
    id: 105,
    name: "VyapaarBuddy",
    description: "A specialized ERP and ledger application designed for local Indian businesses, facilitating automated GST invoicing, transaction auditing, and inventory tracking.",
    html_url: "https://github.com/Tom2001moT/VyapaarBuddy",
    stargazers_count: 22,
    forks_count: 6,
    language: "Python",
    updated_at: "2026-05-10T16:40:00Z",
    custom_category: "Web & ERP",
    detailed_description: "VyapaarBuddy simplifies accounts tracking for small Indian retail operators. It bridges the gap between complicated multi-national ERP software and simple paper logbooks by featuring a high-contrast localized billing dashboard with automated tax breakdowns.",
    technology_stack: ["Python", "Django", "React", "PostgreSQL", "TailwindCSS"],
    key_features: [
      "Instant CGST/SGST/IGST Invoice Generator - Prints compliant receipts in under 5 seconds",
      "Critical Level Inventory Alerts - WhatsApp/SMS warnings when products dip below thresholds",
      "Local Ledger Audits - Visualizes month-over-month cash flows and outstanding dues",
      "Encrypted Financial Statements - Multi-user ledger locking with cryptographic signatures"
    ]
  },
  {
    id: 106,
    name: "Echo-Music",
    description: "A visually gorgeous music player and downloader that compiles and streams high-fidelity music from multiple open-source audio platforms without ads.",
    html_url: "https://github.com/Tom2001moT/Echo-Music",
    stargazers_count: 41,
    forks_count: 9,
    language: "Python",
    updated_at: "2026-06-10T11:20:00Z",
    custom_category: "Android & Utilities",
    detailed_description: "Echo-Music is an elegant solution to expensive music subscriptions. It implements a custom streaming architecture that queries media indexes and streams raw high-quality audio feeds directly, displaying synchronized canvas lyrics and a responsive interactive sound visualizer.",
    technology_stack: ["Python", "Tkinter", "Pygame Audio", "YT-DLP core", "Mutagen"],
    key_features: [
      "Dual Media Player - Stream live URLs or play fully indexed local MP3/FLAC directories",
      "Dynamic Sound Spectrum Visualizer - Fast-Fourier transform visual animations on canvas",
      "Automatic Metadata Grabber - Downloads high-res album covers, artists info, and lyrics",
      "Zero Advertisements - Pristine streaming from open source libraries"
    ]
  },
  {
    id: 107,
    name: "fish2home-erp",
    description: "Custom ERPNext system modules optimized for perishable food logistics, cold-storage inventory shelf-life tracking, and hyper-local routing.",
    html_url: "https://github.com/Tom2001moT/fish2home-erp",
    stargazers_count: 15,
    forks_count: 4,
    language: "Python",
    updated_at: "2026-03-01T15:10:00Z",
    custom_category: "Web & ERP",
    detailed_description: "A tailored ERP solution built on the robust Frappe Framework. Tailored specifically for fresh seafood cold-chains, it implements custom tracking scripts that calculate freshness coefficients based on harvest timestamp, cold-storage temperatures, and dispatch latency.",
    technology_stack: ["Python", "Frappe", "ERPNext Customization", "MariaDB", "JavaScript"],
    key_features: [
      "Perishable Item Shelf-Life Alarm - Auto-flags items approaching critical shelf-life",
      "Route Optimizer - Delivery sequence calculations based on traffic and thermal constraints",
      "Dynamic Pricing System - Auto-reduces fish price gradually as shelf hours increase",
      "Vendor Dispatch Portal - Simplified inventory check-in interface for local fishermen"
    ]
  },
  {
    id: 108,
    name: "FakeCall",
    description: "A critical safety utility application that simulates authentic incoming phone calls complete with dynamic themes, vibration loops, and proximity triggers.",
    html_url: "https://github.com/Tom2001moT/FakeCall",
    stargazers_count: 19,
    forks_count: 2,
    language: "Java",
    updated_at: "2025-12-18T18:25:00Z",
    custom_category: "Android & Utilities",
    detailed_description: "Created to help individuals discreetly escape uncomfortable or hazardous public situations. FakeCall schedules fully-voiced, realistic incoming calls that exactly mimic stock Android/iOS interface call canvases. Users can trigger call events silently by simply flipping the phone over twice.",
    technology_stack: ["Java", "Android Studio", "Service Bindings", "Proximity Sensors"],
    key_features: [
      "Sensor Gestures - Double-flip phone in pocket to schedule an instant call in 10 seconds",
      "Voice Recording Integration - Playback custom conversations when answering to simulate real dialog",
      "Multiple Stock Themes - Matches Google, Samsung, and iOS call interfaces",
      "Discrete Lockscreen Triggers - Operates seamlessly behind a locked screen"
    ]
  }
];

export const SKILLS: Skill[] = [
  // Cyber Security
  { name: "Certified Ethical Hacker (CEH)", level: 95, category: "Cyber Security", icon: "ShieldAlert" },
  { name: "Web Application Pentesting", level: 90, category: "Cyber Security", icon: "FileSearch" },
  { name: "Network Auditing & Wireshark", level: 85, category: "Cyber Security", icon: "Network" },
  { name: "Vulnerability Assessment (OWASP)", level: 88, category: "Cyber Security", icon: "Lock" },
  { name: "Reverse Engineering", level: 75, category: "Cyber Security", icon: "Cpu" },

  // Frontend
  { name: "React 19 & TypeScript", level: 92, category: "Frontend", icon: "Code2" },
  { name: "Tailwind CSS", level: 95, category: "Frontend", icon: "Paintbrush" },
  { name: "Framer Motion Animations", level: 88, category: "Frontend", icon: "Sparkles" },
  { name: "Vite & Build Tooling", level: 85, category: "Frontend", icon: "Zap" },

  // Backend
  { name: "Node.js & Express", level: 90, category: "Backend", icon: "Server" },
  { name: "Python (Django / Frappe)", level: 87, category: "Backend", icon: "Terminal" },
  { name: "RESTful APIs", level: 91, category: "Backend", icon: "Webhook" },
  { name: "PostgreSQL & MariaDB", level: 84, category: "Backend", icon: "Database" },

  // AI & Mobile
  { name: "Android SDK (Kotlin/Java)", level: 86, category: "AI & Mobile", icon: "Smartphone" },
  { name: "ONNX Runtime & Local AI", level: 80, category: "AI & Mobile", icon: "BrainCircuit" },
  { name: "Google GenAI SDK (Gemini)", level: 85, category: "AI & Mobile", icon: "Sparkles" }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ceh_badge",
    title: "Root Privilege Unlocked",
    description: "Successfully certified as a Certified Ethical Hacker (CEH) under EC-Council, mastering penetration testing protocols.",
    category: "Security",
    points: 1000,
    unlocked: true
  },
  {
    id: "offline_ai",
    title: "Privacy Vanguard",
    description: "Built and deployed ClearCut-Local-AI-Background-Eraser, moving heavy computer vision segmentation fully client-side.",
    category: "Coding",
    points: 500,
    unlocked: true
  },
  {
    id: "sms_gateway",
    title: "Telco Alchemist",
    description: "Engineered android-sms-gateway to bypass corporate carrier APIs, transforming a budget handset into an HTTP-SMS router.",
    category: "Coding",
    points: 400,
    unlocked: true
  },
  {
    id: "gamers_creed",
    title: "Elite Campaigner",
    description: "Clocked 500+ hours in tactical multiplayer and story campaigns, integrating gamer endurance into code debug runs.",
    category: "Gaming",
    points: 300,
    unlocked: true
  },
  {
    id: "synthid_breaker",
    title: "Freq Domain Wizard",
    description: "Constructed frequency-domain analysis tools to test vulnerability limits of steganographic AI media watermarks.",
    category: "Security",
    points: 600,
    unlocked: true
  }
];
