const CONFIG_STORAGE_KEY = 'portfolio_site_config';
const defaultConfig = {
    hero: {},
    about: {},
    projects: {},
    skills: {},
    contact: {},
    footer: {},
};
export const getSiteConfig = () => {
    try {
        const data = localStorage.getItem(CONFIG_STORAGE_KEY);
        return data ? JSON.parse(data) : defaultConfig;
    }
    catch {
        return defaultConfig;
    }
};
export const saveSiteConfig = (config) => {
    const currentConfig = getSiteConfig();
    const newConfig = { ...currentConfig, ...config };
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
};
export const updateHeroConfig = (config) => {
    const currentConfig = getSiteConfig();
    saveSiteConfig({ ...currentConfig, hero: { ...currentConfig.hero, ...config } });
};
export const updateAboutConfig = (config) => {
    const currentConfig = getSiteConfig();
    saveSiteConfig({ ...currentConfig, about: { ...currentConfig.about, ...config } });
};
export const updateProjectsConfig = (config) => {
    const currentConfig = getSiteConfig();
    saveSiteConfig({ ...currentConfig, projects: { ...currentConfig.projects, ...config } });
};
export const updateSkillsConfig = (config) => {
    const currentConfig = getSiteConfig();
    saveSiteConfig({ ...currentConfig, skills: { ...currentConfig.skills, ...config } });
};
export const updateContactConfig = (config) => {
    const currentConfig = getSiteConfig();
    saveSiteConfig({ ...currentConfig, contact: { ...currentConfig.contact, ...config } });
};
export const updateFooterConfig = (config) => {
    const currentConfig = getSiteConfig();
    saveSiteConfig({ ...currentConfig, footer: { ...currentConfig.footer, ...config } });
};
export const resetSiteConfig = () => {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
};
