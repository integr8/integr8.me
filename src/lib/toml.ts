import * as TOML from '@iarna/toml';
import fs from 'fs';
import path from 'path';

export function loadToml<T>(filePath: string): T {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const content = fs.readFileSync(absolutePath, 'utf8');
  return TOML.parse(content) as T;
}

export const loadSiteConfig = () => loadToml('site.config.toml');
export const loadNavigation = () =>
  loadToml<{ main: unknown[] }>('content/data/navigation.toml');
export const loadCertifications = () => {
  const data = loadToml<{ certifications: unknown[] }>('content/data/certifications.toml');
  return data.certifications || [];
};
export const loadTechnologies = () => {
  const data = loadToml<{ technologies: unknown[] }>('content/data/technologies.toml');
  return data.technologies || [];
};
export const loadStats = () => {
  const data = loadToml<{ stats: unknown[] }>('content/data/stats.toml');
  return data.stats || [];
};
export const loadCapabilities = () => {
  const data = loadToml<{ capabilities: unknown[] }>('content/data/capabilities.toml');
  return data.capabilities || [];
};
export const loadTranslations = (lang: string) => loadToml(`src/i18n/locales/${lang}.toml`);
