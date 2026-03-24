import type { HeroConfig, AboutConfig, ProjectsConfig, SkillsConfig, ContactConfig, FooterConfig } from '@/config';

const CONFIG_STORAGE_KEY = 'portfolio_site_config';

export interface SiteConfigData {
  hero: Partial<HeroConfig>;
  about: Partial<AboutConfig>;
  projects: Partial<ProjectsConfig>;
  skills: Partial<SkillsConfig>;
  contact: Partial<ContactConfig>;
  footer: Partial<FooterConfig>;
}

const defaultConfig: SiteConfigData = {
  hero: {},
  about: {},
  projects: {},
  skills: {},
  contact: {},
  footer: {},
};

export const getSiteConfig = (): SiteConfigData => {
  try {
    const data = localStorage.getItem(CONFIG_STORAGE_KEY);
    return data ? JSON.parse(data) : defaultConfig;
  } catch {
    return defaultConfig;
  }
};

export const saveSiteConfig = (config: Partial<SiteConfigData>): void => {
  const currentConfig = getSiteConfig();
  const newConfig = { ...currentConfig, ...config };
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
};

export const updateHeroConfig = (config: Partial<HeroConfig>): void => {
  const currentConfig = getSiteConfig();
  saveSiteConfig({ ...currentConfig, hero: { ...currentConfig.hero, ...config } });
};

export const updateAboutConfig = (config: Partial<AboutConfig>): void => {
  const currentConfig = getSiteConfig();
  saveSiteConfig({ ...currentConfig, about: { ...currentConfig.about, ...config } });
};

export const updateProjectsConfig = (config: Partial<ProjectsConfig>): void => {
  const currentConfig = getSiteConfig();
  saveSiteConfig({ ...currentConfig, projects: { ...currentConfig.projects, ...config } });
};

export const updateSkillsConfig = (config: Partial<SkillsConfig>): void => {
  const currentConfig = getSiteConfig();
  saveSiteConfig({ ...currentConfig, skills: { ...currentConfig.skills, ...config } });
};

export const updateContactConfig = (config: Partial<ContactConfig>): void => {
  const currentConfig = getSiteConfig();
  saveSiteConfig({ ...currentConfig, contact: { ...currentConfig.contact, ...config } });
};

export const updateFooterConfig = (config: Partial<FooterConfig>): void => {
  const currentConfig = getSiteConfig();
  saveSiteConfig({ ...currentConfig, footer: { ...currentConfig.footer, ...config } });
};

export const resetSiteConfig = (): void => {
  localStorage.removeItem(CONFIG_STORAGE_KEY);
};
