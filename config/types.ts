export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  resumeUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: "frontend" | "backend" | "devops" | "design" | "other";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  type: "work" | "education";
}

export interface Social {
  platform: string;
  url: string;
  icon: string;
}

export interface ParticleConfig {
  enabled: boolean;
  particleCount: number;
  color: string;
  linkColor: string;
  speed: number;
  size: number;
  shape: "circle" | "square" | "triangle";
  linked: boolean;
  opacity: number;
  interactivity?: {
    repulseDistance?: number;
    repulseDuration?: number;
  };
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
  card: string;
  border: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  particleConfig: ParticleConfig;
}