export const HERO_SECTION = "hero";
export const EXPERIENCE_SECTION = "experience";
export const PROJECTS_SECTION = "projects";
export const SKILLS_SECTION = "skills";
export const CONTACT_SECTION = "contact";

export const HOME_SECTIONS = {
  hero: HERO_SECTION,
  experience: EXPERIENCE_SECTION,
  projects: PROJECTS_SECTION,
  skills: SKILLS_SECTION,
  contact: CONTACT_SECTION,
} as const;

export type HomeSectionKey = keyof typeof HOME_SECTIONS;
export type HomeSectionId = typeof HOME_SECTIONS[HomeSectionKey];

export default HOME_SECTIONS;
