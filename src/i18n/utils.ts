import { loadTranslations } from '../lib/toml';

const cache: Record<string, any> = {};

export function getTranslations(lang: string) {
  if (!cache[lang]) {
    cache[lang] = loadTranslations(lang);
  }
  return cache[lang];
}

export function t(key: string, lang: string): string {
  const translations = getTranslations(lang);
  return key.split('.').reduce((obj, k) => obj?.[k], translations) ?? key;
}

export function useTranslations(lang: string) {
  return {
    t: (key: string) => t(key, lang),
    translations: getTranslations(lang),
  };
}
