import { useState, useEffect } from 'react';
import { BACKUP_PROJECTS } from '../data';
import { Repository } from '../types';
import { Search, Github, ExternalLink, Star, GitFork, BookOpen, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<Repository[]>(BACKUP_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'AI & Security' | 'Web & ERP' | 'Android & Utilities'>('All');
  const [selectedProject, setSelectedProject] = useState<Repository | null>(null);

  // Fetch real-time data from GitHub and enrich
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api.github.com/users/Tom2001moT/repos?per_page=100&sort=updated');
        if (!res.ok) {
          throw new Error(`GitHub API returned status ${res.status}`);
        }
        const data = await res.json();
        
        if (Array.isArray(data)) {
          // Map and enrich the fetched repositories
          const enriched: Repository[] = data.map((gitRepo: any): Repository => {
            // Check if we have backup info for this repository name
            const backup = BACKUP_PROJECTS.find(
              (p) => p.name.toLowerCase() === gitRepo.name.toLowerCase()
            );

            // Determine custom category
            let category: Repository['custom_category'] = 'Web & ERP';
            if (backup) {
              category = backup.custom_category;
            } else {
              // Guess category based on topics, name, or description
              const nameLower = gitRepo.name.toLowerCase();
              const descLower = (gitRepo.description || '').toLowerCase();
              if (nameLower.includes('ai') || nameLower.includes('llm') || nameLower.includes('remover') || nameLower.includes('security') || nameLower.includes('synth') || nameLower.includes('clearcut')) {
                category = 'AI & Security';
              } else if (nameLower.includes('sms') || nameLower.includes('gateway') || nameLower.includes('fake') || nameLower.includes('music') || nameLower.includes('echo')) {
                category = 'Android & Utilities';
              }
            }

            return {
              id: gitRepo.id,
              name: gitRepo.name,
              description: gitRepo.description || backup?.description || "A public repository by Thomas Francis.",
              html_url: gitRepo.html_url,
              stargazers_count: gitRepo.stargazers_count,
              forks_count: gitRepo.forks,
              language: gitRepo.language || backup?.language || "TypeScript",
              updated_at: gitRepo.updated_at,
              custom_category: category,
              detailed_description: backup?.detailed_description,
              key_features: backup?.key_features,
              demo_url: backup?.demo_url || gitRepo.homepage,
              technology_stack: backup?.technology_stack || [gitRepo.language].filter(Boolean)
            };
          });

          // Also include any static backup projects that were NOT returned by the API (to make sure they display)
          const finalProjects = [...enriched];
          BACKUP_PROJECTS.forEach(backup => {
            if (!finalProjects.some(p => p.name.toLowerCase() === backup.name.toLowerCase())) {
              finalProjects.push(backup);
            }
          });

          // Sort by star count (highest first)
          finalProjects.sort((a, b) => b.stargazers_count - a.stargazers_count);
          setProjects(finalProjects);
        }
        setError(null);
      } catch (err: any) {
        console.warn("GitHub API rate limit or error, using high-fidelity fallback projects:", err);
        // Graceful error, projects are already set to BACKUP_PROJECTS
        setError("Rate limited or offline. Displaying certified static backup repositories.");
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Filter projects by search query and category tab
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.language || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.technology_stack || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'All' || p.custom_category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Language badge color helper
  const getLanguageColor = (lang: string) => {
    switch (lang?.toLowerCase()) {
      case 'typescript': return 'bg-blue-500';
      case 'javascript': return 'bg-yellow-500';
      case 'python': return 'bg-indigo-500';
      case 'kotlin': return 'bg-purple-500';
      case 'java': return 'bg-orange-500';
      case 'rust': return 'bg-amber-600';
      case 'html': return 'bg-red-500';
      case 'css': return 'bg-pink-500';
      default: return 'bg-zinc-500';
    }
  };

  const categories = ['All', 'AI & Security', 'Web & ERP', 'Android & Utilities'] as const;

  return (
    <section 
      id="projects" 
      className="py-20 bg-zinc-950 border-t border-zinc-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
              Software <span className="text-emerald-400">Repositories</span>
            </h2>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-2">
              REAL REPOSITORIES SYNCED LIVE FROM GITHUB
            </p>
          </div>
          
          {/* GitHub Sync Banner */}
          <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-zinc-900/60 border border-zinc-800 rounded-md py-1.5 px-3">
            <div className={`w-2 h-2 rounded-full ${error ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`}></div>
            <span className="font-mono text-[10px] text-zinc-400">
              {error ? 'FALLBACK_MODE' : 'GITHUB_API_SYNCHRONIZED'}
            </span>
          </div>
        </div>

        {/* Search and Filters Layout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          {/* Left: Category tabs */}
          <div className="flex flex-wrap gap-1 bg-zinc-900/40 p-1 rounded-lg border border-zinc-900/80 w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md font-mono text-[11px] font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-zinc-850 text-emerald-400 shadow-sm border border-zinc-800'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Right: Search box */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repository, tech, stack..."
              className="w-full bg-zinc-900/60 border border-zinc-800 rounded-md py-2 pl-9 pr-4 font-mono text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>

        </div>

        {/* Warning Toast if rate limited */}
        {error && (
          <div className="mb-6 p-3 bg-amber-950/20 border border-amber-500/20 rounded flex items-center space-x-2 text-amber-400 text-xs font-mono">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((repo) => (
            <div 
              key={repo.id}
              onClick={() => setSelectedProject(repo)}
              className="group bg-zinc-900/35 hover:bg-zinc-900/60 border border-zinc-900/80 hover:border-zinc-850 rounded-lg p-5 flex flex-col justify-between h-56 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-emerald-950/5 relative"
            >
              {/* Outer top highlight border */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:via-emerald-500/35 group-hover:to-cyan-500/20 transition-all duration-500 rounded-t-lg"></div>

              <div>
                {/* Repo Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    {repo.custom_category}
                  </span>
                  
                  {/* GitHub Info */}
                  <div className="flex items-center space-x-3 font-mono text-[11px] text-zinc-500">
                    <span className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 text-zinc-500 group-hover:text-yellow-500/80 transition-colors" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <GitFork className="w-3.5 h-3.5" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>
                </div>

                {/* Repo Name */}
                <h3 className="font-sans text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors truncate">
                  {repo.name}
                </h3>

                {/* Repo Description */}
                <p className="font-sans text-xs text-zinc-400/90 leading-relaxed mt-2.5 line-clamp-3">
                  {repo.description}
                </p>
              </div>

              {/* Repo Footer */}
              <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
                {/* Language Tag */}
                <div className="flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`}></span>
                  <span className="font-mono text-[10px] text-zinc-400">{repo.language}</span>
                </div>

                {/* Button Affordance */}
                <span className="font-mono text-[10px] text-zinc-500 group-hover:text-emerald-400 flex items-center space-x-1 transition-colors">
                  <span>EXPAND</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* No results empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-zinc-900/10 border border-zinc-900 rounded-lg">
            <p className="font-mono text-sm text-zinc-500">No repositories matched your filter parameters.</p>
          </div>
        )}

      </div>

      {/* Repository Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden relative flex flex-col max-h-[85vh]"
          >
            {/* Top Bar / Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/50 border-b border-zinc-800">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider">REPOSITORY_DOSSIER</span>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="font-mono text-xs text-zinc-400 hover:text-zinc-100 px-2 py-1 rounded bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                CLOSE [ESC]
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Title & Stats */}
              <div>
                <h3 className="font-sans text-2xl font-extrabold text-zinc-100 flex items-center space-x-2">
                  <span>{selectedProject.name}</span>
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/55 border border-emerald-500/20 text-emerald-400">
                    {selectedProject.custom_category}
                  </span>
                  <div className="flex items-center space-x-1.5 font-mono text-xs text-zinc-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <span>{selectedProject.language}</span>
                  </div>
                  <div className="h-4 w-px bg-zinc-800"></div>
                  <div className="flex items-center space-x-3 font-mono text-xs text-zinc-400">
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500/80" />
                      <span>{selectedProject.stargazers_count} Stars</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <GitFork className="w-4 h-4 text-zinc-400" />
                      <span>{selectedProject.forks_count} Forks</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="space-y-2">
                <h4 className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">PROJECT NARRATIVE</h4>
                <p className="font-sans text-sm text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded border border-zinc-900">
                  {selectedProject.detailed_description || selectedProject.description}
                </p>
              </div>

              {/* Key Features (Bulleted) */}
              {selectedProject.key_features && selectedProject.key_features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">KEY_FEATURES</h4>
                  <ul className="space-y-2 font-sans text-sm text-zinc-300 pl-1">
                    {selectedProject.key_features.map((feat, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technology Stack Grid */}
              {selectedProject.technology_stack && selectedProject.technology_stack.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">INTEGRATED_TECHNOLOGIES</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technology_stack.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-900 font-mono text-xs text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/20 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions Tray */}
            <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-end space-x-3">
              <a 
                href={selectedProject.html_url} 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-200 flex items-center space-x-2 transition-all duration-200"
              >
                <Github className="w-4 h-4 text-zinc-400" />
                <span>GITHUB_REPOSITORY</span>
              </a>
              {selectedProject.demo_url && (
                <a 
                  href={selectedProject.demo_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-xs font-mono text-zinc-100 flex items-center space-x-2 transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LAUNCH_LIVE_DEMO</span>
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
