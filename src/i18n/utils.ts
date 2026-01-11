import { loadTranslations } from '../lib/toml';

const cache: Record<string, Record<string, string>> = {};

export function getTranslations(lang: string) {
  if (!cache[lang]) {
    const result = loadTranslations(lang);
    cache[lang] = (result || {}) as Record<string, string>;
  }
  return cache[lang];
}

export function t(key: string, lang: string): string {
  const translations = getTranslations(lang);
  const result = key.split('.').reduce(
    (obj: Record<string, unknown>, k: string) => {
      return obj?.[k];
    },
    translations as Record<string, unknown>
  );
  return typeof result === 'string' ? result : key;
}

export function useTranslations(lang: string) {
  return {
    t: (key: string) => t(key, lang),
    translations: getTranslations(lang),
  };
}
