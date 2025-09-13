import personalInfoJson from '@/config/personal.json';
import skillsJson from '@/config/skills.json';
import projectsJson from '@/config/projects.json';
import experienceJson from '@/config/experience.json';
import socialJson from '@/config/social.json';
import themesJson from '@/config/themes.json';
import { PersonalInfo, Skill, Project, Experience, Social, Theme } from '@/config/types';

// Get personal info
export function getPersonalInfo(): PersonalInfo {
  return personalInfoJson;
}

// Get skills
export function getSkills(): Skill[] {
  // Assert the type of skillsJson to Skill[]
  return skillsJson as Skill[];
}

// Get projects
export function getProjects(): Project[] {
  return projectsJson as Project[]; // Also assert here for consistency if needed
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  const projects = getProjects();
  return projects.filter(project => project.featured);
}

// Get experiences
export function getExperiences(): Experience[] {
  // Assert the type of experienceJson to Experience[]
  const experiences = experienceJson as Experience[];
  return experiences.sort((a, b) => {
    // Ensure startDate is treated as a string if needed for Date constructor
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}

// Get work experiences
export function getWorkExperiences(): Experience[] {
  const experiences = getExperiences();
  return experiences.filter(exp => exp.type === 'work');
}

// Get education experiences
export function getEducationExperiences(): Experience[] {
  const experiences = getExperiences();
  return experiences.filter(exp => exp.type === 'education');
}

// Get social links
export function getSocialLinks(): Social[] {
  return socialJson as Social[]; // Assert type
}

// Get themes
export function getThemes(): { themes: Theme[] } {
  return themesJson as { themes: Theme[] }; // Assert type
}

// Get specific theme by name
export function getThemeByName(name: string): Theme | undefined {
  const { themes } = getThemes();
  return themes.find(theme => theme.name === name);
}