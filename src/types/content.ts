export interface Site {
  name: string;
  url: string;
  description: string;
  author: string;
}

export interface Navigation {
  key: string;
  href: string;
  icon: string;
  children?: NavigationCategory[];
  is_cta?: boolean;
}

export interface NavigationCategory {
  key: string;
  icon: string;
  items: NavigationItem[];
}

export interface NavigationItem {
  key: string;
  href: string;
  icon: string;
}

export interface Certification {
  id: string;
  name: string;
  short_name: string;
  logo: string;
  description: string;
  badges: string[];
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  icon: string;
  label: Record<string, string>;
  description: Record<string, string>;
}

export interface Technology {
  id: string;
  icon: string;
  name: Record<string, string>;
  items: TechnologyItem[];
}

export interface TechnologyItem {
  name: string;
  services: string[];
}
