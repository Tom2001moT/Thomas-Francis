export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  custom_category: 'AI & Security' | 'Web & ERP' | 'Android & Utilities' | 'All';
  detailed_description?: string;
  key_features?: string[];
  demo_url?: string;
  technology_stack?: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 105
  category: 'Frontend' | 'Backend' | 'Cyber Security' | 'ERP & Tools' | 'AI & Mobile';
  icon: string; // name of a Lucide icon
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'Coding' | 'Security' | 'Gaming';
  points: number;
  unlocked: boolean;
}
