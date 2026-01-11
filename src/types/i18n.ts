export type Language = 'ptbr' | 'en';

export interface I18nConfig {
  defaultLang: Language;
  languages: Language[];
}

export interface Translations {
  [key: string]: string | object;
}
