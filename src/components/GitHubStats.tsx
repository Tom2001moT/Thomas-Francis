import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Star, 
  GitFork, 
  Code2, 
  TrendingUp, 
  RotateCw, 
  AlertCircle, 
  FolderGit2, 
  BarChart3,
  Search,
  ExternalLink,
  Terminal,
  Grid
} from 'lucide-react';
import { BACKUP_PROJECTS } from '../data';
import { Repository } from '../types';

export default function GitHubStats() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'stars' | 'forks' | 'name'>('stars');
  const [isReplicaMode, setIsReplicaMode] = useState(false);

  const fetchGitHubStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://api.github.com/users/Tom2001moT/repos?per_page=100&sort=updated');
      
      if (!response.ok) {
        throw new Error(`GitHub API HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const enrichedRepos: Repository[] = data.map((gitRepo: any): Repository => {
          const backup = BACKUP_PROJECTS.find(
            (p) => p.name.toLowerCase() === gitRepo.name.toLowerCase()
          );
          
          return {
            id: gitRepo.id,
            name: gitRepo.name,
            description: gitRepo.description || backup?.description || "Public repository engineered by Thomas Francis.",
            html_url: gitRepo.html_url,
            stargazers_count: gitRepo.stargazers_count,
            forks_count: gitRepo.forks,
            language: gitRepo.language || backup?.language || "TypeScript",
            updated_at: gitRepo.updated_at,
            custom_category: backup?.custom_category || "Web & ERP",
            technology_stack: backup?.technology_stack || [gitRepo.language].filter(Boolean),
            demo_url: backup?.demo_url || gitRepo.homepage
          };
        });

        // Mix in missing backups
        BACKUP_PROJECTS.forEach(backup => {
          if (!enrichedRepos.some(r => r.name.toLowerCase() === backup.name.toLowerCase())) {
            enrichedRepos.push(backup);
          }
        });

        setRepos(enrichedRepos);
        setIsReplicaMode(false);
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        throw new Error("Invalid API response shape");
      }
    } catch (err: any) {
      console.warn("GitHub fetch failed, activating high-fidelity offline replica stats:", err);
      // Populate with backup projects
      setRepos(BACKUP_PROJECTS);
      setIsReplicaMode(true);
      setError("API Rate Limit active or Offline. Rendering localized replica database.");
      setLastUpdated("Cached Static Live Replica");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubStats();
  }, []);

  // Compute stats
  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);
  const totalRepos = repos.length;

  // Language Breakdown aggregation
  const languageStats: { [key: string]: number } = {};
  repos.forEach((r) => {
    const lang = r.language || 'Unknown';
    languageStats[lang] = (languageStats[lang] || 0) + 1;
  });

  const languagesList = Object.entries(languageStats)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalRepos) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  // Unique languages for filtering dropdown
  const uniqueLanguages = ['All', ...Object.keys(languageStats).sort()];

  // Filtering & Sorting
  const processedRepos = repos
    .filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (r.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLang = selectedLanguage === 'All' || r.language === selectedLanguage;
      return matchesSearch && matchesLang;
    })
    .sort((a, b) => {
      if (sortBy === 'stars') {
        return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      } else if (sortBy === 'forks') {
        return (b.forks_count || 0) - (a.forks_count || 0);
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  // Helper to resolve custom badge colors for languages
  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'typescript': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'python': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'kotlin': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'java': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'javascript': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-zinc-800/50 text-zinc-400 border-zinc-700/30';
    }
  };

  return (
    <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-lg relative">
      <div className="absolute top-0 left-4 -translate-y-1/2 bg-zinc-950 px-3 py-0.5 border border-zinc-800 rounded font-mono text-[10px] text-emerald-400 flex items-center space-x-1.5">
        <Github className="w-3 h-3" />
        <span>GITHUB_REALTIME_METRICS</span>
      </div>

      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pt-2 gap-4">
        <div>
          <h3 className="font-sans text-base font-bold text-zinc-100 flex items-center space-x-2">
            <FolderGit2 className="w-4 h-4 text-emerald-400" />
            <span>GitHub Profile Statistics</span>
          </h3>
          <p className="font-mono text-[10px] text-zinc-500 mt-1 uppercase">
            Live query target: <span className="text-zinc-400 font-bold">github.com/Tom2001moT</span>
          </p>
        </div>

        {/* Sync Info / Trigger */}
        <div className="flex items-center space-x-3 self-start md:self-auto">
          {isReplicaMode && (
            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-red-950/40 border border-red-500/20 text-red-400 font-bold animate-pulse">
              REPLICA MODE
            </span>
          )}
          <span className="font-mono text-[10px] text-zinc-500">
            SYNCED: <span className="text-zinc-400">{lastUpdated || "WAITING"}</span>
          </span>
          <button 
            onClick={fetchGitHubStats}
            disabled={loading}
            className="p-1.5 rounded bg-zinc-950 hover:bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-emerald-400 transition-all duration-300 disabled:opacity-50 cursor-pointer"
            title="Refresh statistics"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {loading && repos.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center space-y-3">
          <RotateCw className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="font-mono text-xs text-zinc-500">FETCHING_REMOTE_REPOS_API...</p>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Stat Item 1: Total Repos */}
            <div className="p-4 bg-zinc-950/80 border border-zinc-900 rounded flex items-center space-x-4">
              <div className="p-3 rounded bg-zinc-900 text-emerald-400">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sans text-[11px] text-zinc-500 block uppercase font-bold tracking-wider">Total Repositories</span>
                <span className="font-mono text-xl font-extrabold text-zinc-100">{totalRepos}</span>
              </div>
            </div>

            {/* Stat Item 2: Stars */}
            <div className="p-4 bg-zinc-950/80 border border-zinc-900 rounded flex items-center space-x-4">
              <div className="p-3 rounded bg-zinc-900 text-yellow-500">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sans text-[11px] text-zinc-500 block uppercase font-bold tracking-wider">Total Stars Earned</span>
                <span className="font-mono text-xl font-extrabold text-zinc-100">{totalStars}</span>
              </div>
            </div>

            {/* Stat Item 3: Forks */}
            <div className="p-4 bg-zinc-950/80 border border-zinc-900 rounded flex items-center space-x-4">
              <div className="p-3 rounded bg-zinc-900 text-cyan-400">
                <GitFork className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sans text-[11px] text-zinc-500 block uppercase font-bold tracking-wider">Total Forks</span>
                <span className="font-mono text-xl font-extrabold text-zinc-100">{totalForks}</span>
              </div>
            </div>

          </div>

          {/* Languages Breakdown Visualizer */}
          <div className="p-4 bg-zinc-950/50 border border-zinc-900/60 rounded">
            <h4 className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Language Distribution Profiler</span>
            </h4>
            
            {/* Cumulative Distribution Line */}
            <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden flex mb-4">
              {languagesList.map((lang, index) => {
                // Assign safe decorative theme colors
                const colors = ['bg-blue-500', 'bg-amber-500', 'bg-purple-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500'];
                const colorClass = colors[index % colors.length];
                return (
                  <div 
                    key={lang.name}
                    className={`h-full ${colorClass}`}
                    style={{ width: `${lang.percentage}%` }}
                    title={`${lang.name}: ${lang.count} repos (${lang.percentage}%)`}
                  ></div>
                );
              })}
            </div>

            {/* Language Badges Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {languagesList.map((lang, index) => {
                const colors = ['bg-blue-500', 'bg-amber-500', 'bg-purple-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500'];
                const dotColor = colors[index % colors.length];
                return (
                  <div key={lang.name} className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
                    <span className="font-sans text-xs text-zinc-300 font-bold">{lang.name}</span>
                    <span className="font-mono text-[10px] text-zinc-500">({lang.percentage}%)</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Repos List & Interactive Controls */}
          <div className="pt-4 border-t border-zinc-900/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <span className="font-mono text-[10px] text-zinc-400 uppercase">REPO_REPOSITORY_EXPLORER ({processedRepos.length})</span>
              
              {/* Controls */}
              <div className="flex flex-wrap gap-2">
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search repos..."
                    className="w-36 font-mono text-[10.5px] pl-8 pr-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                {/* Filter Language */}
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="font-mono text-[10.5px] px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-emerald-500/50 cursor-pointer"
                >
                  {uniqueLanguages.map((lang) => (
                    <option key={lang} value={lang}>{lang === 'All' ? 'All Languages' : lang}</option>
                  ))}
                </select>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="font-mono text-[10.5px] px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-emerald-500/50 cursor-pointer"
                >
                  <option value="stars">Sort by Stars</option>
                  <option value="forks">Sort by Forks</option>
                  <option value="name">Sort by Name</option>
                </select>

              </div>
            </div>

            {/* Error alerts if rate limited */}
            {error && (
              <div className="mb-4 p-3 rounded bg-amber-950/20 border border-amber-500/10 flex items-center space-x-2 text-amber-500 font-mono text-[10.5px]">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Repos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
              {processedRepos.length === 0 ? (
                <div className="col-span-full py-8 text-center font-mono text-xs text-zinc-600 italic">
                  // No matching repositories found under filter settings.
                </div>
              ) : (
                processedRepos.map((r) => (
                  <div 
                    key={r.id || r.name}
                    className="p-3 bg-zinc-950/60 border border-zinc-900/80 rounded hover:border-zinc-800 hover:bg-zinc-900/10 transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors truncate max-w-[70%]">
                          {r.name}
                        </span>
                        
                        <a 
                          href={r.html_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      
                      <p className="font-sans text-[11px] text-zinc-500 leading-snug mb-3 line-clamp-2">
                        {r.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-900/40">
                      {/* Language badge */}
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono border ${getLanguageColor(r.language || '')}`}>
                        {r.language || 'Plain Text'}
                      </span>

                      {/* Stars / Forks */}
                      <div className="flex items-center space-x-3 text-zinc-500 font-mono text-[10px]">
                        <span className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500/80" />
                          <span>{r.stargazers_count || 0}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <GitFork className="w-3 h-3 text-cyan-500/80" />
                          <span>{r.forks_count || 0}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
