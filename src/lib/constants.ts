import { loadSiteConfig } from './toml';

interface SiteConfig {
  site: {
    name: string;
    url: string;
    description: string;
    author: string;
  };
  social: {
    email: string;
    linkedin: string;
    github: string;
  };
  seo: {
    title_template: string;
    og_image: string;
    twitter_handle: string;
  };
}

const config = loadSiteConfig() as SiteConfig;

export const SITE_URL = config.site.url;
export const AUTHOR = config.site.author;

export const SOCIAL_LINKS = {
  email: config.social.email,
  linkedin: config.social.linkedin,
  github: config.social.github,
};

export const ICON_MAPPING: Record<string, string> = {
  // Navigation
  RocketLaunchIcon: 'rocket-launch',
  CloudIcon: 'cloud',
  UserGroupIcon: 'user-group',
  TrophyIcon: 'trophy',
  NewspaperIcon: 'newspaper',
  ChatBubbleLeftRightIcon: 'chat-bubble-left-right',
  ServerStackIcon: 'server-stack',
  CubeIcon: 'cube',
  CodeBracketIcon: 'code-bracket',
  CogIcon: 'cog',
  ShieldCheckIcon: 'shield-check',
  CircleStackIcon: 'circle-stack',
  ChartBarIcon: 'chart-bar',
  Bars3Icon: 'bars-3',
  XMarkIcon: 'x-mark',
  HomeIcon: 'home',
  ArrowLeftIcon: 'arrow-left',
  ArrowRightIcon: 'arrow-right',
  ArrowTopRightOnSquareIcon: 'arrow-top-right-on-square',
  // Status
  CheckCircleIcon: 'check-circle',
  XCircleIcon: 'x-circle',
  ExclamationTriangleIcon: 'exclamation-triangle',
  InformationCircleIcon: 'information-circle',
  ArrowPathIcon: 'arrow-path',
  // UI
  SunIcon: 'sun',
  MoonIcon: 'moon',
  GlobeAltIcon: 'globe-alt',
  AcademicCapIcon: 'academic-cap',
  EnvelopeIcon: 'envelope',
  CalendarDaysIcon: 'calendar-days',
  ArrowDownTrayIcon: 'arrow-down-tray',
  ShareIcon: 'share',
  ClipboardDocumentIcon: 'clipboard-document',
  LightBulbIcon: 'light-bulb',
  ClockIcon: 'clock',
  DocumentTextIcon: 'document-text',
  WrenchScrewdriverIcon: 'wrench-screwdriver',
  UserPlusIcon: 'user-plus',
  MagnifyingGlassIcon: 'magnifying-glass',
  CurrencyDollarIcon: 'currency-dollar',
  UserIcon: 'user',
};
