import React from 'react';
import { FiMenu, FiHome, FiLayers, FiTool, FiBriefcase, FiFileText, FiMail, FiCloud, FiShield, FiActivity, FiCode, FiServer, FiDatabase, FiUsers } from 'react-icons/fi';
import { Button } from '@components/common/Button';
import { LanguageSwitcher } from '@components/common/LanguageSwitcher';
import { ThemeSwitcher } from '@components/common/ThemeSwitcher';
import { loadNavigation } from '@lib/toml';

// Icon mapping for navigation
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HomeIcon: FiHome,
  LayersIcon: FiLayers,
  CogIcon: FiTool,
  BriefcaseIcon: FiBriefcase,
  DocumentTextIcon: FiFileText,
  EnvelopeIcon: FiMail,
  ChatBubbleLeftRightIcon: FiMail,
  CloudIcon: FiCloud,
  ShieldCheckIcon: FiShield,
  ChartBarIcon: FiActivity,
  CodeIcon: FiCode,
  ServerIcon: FiServer,
  DatabaseIcon: FiDatabase,
  UsersIcon: FiUsers,
  Bars3Icon: FiMenu,
};

interface NavItem {
  key: string;
  href?: string;
  icon: string;
  is_cta?: boolean;
  children?: {
    key: string;
    icon: string;
    items?: { key: string; href: string; icon: string }[];
  }[];
}

interface HeaderProps {
  lang: string;
  translations: Record<string, string>;
}

export function Header({ lang, translations }: HeaderProps) {
  const navData = loadNavigation() as { main?: NavItem[] };
  const nav = navData.main || [];
  const ctaItem = nav.find((item) => item.is_cta);
  const mainItems = nav.filter((item) => !item.is_cta);

  // Helper to get navigation translations
  const getNavLabel = (key: string): string => {
    if (!translations || typeof translations !== 'object') return key;
    const navTranslations = (translations as unknown as Record<string, unknown>).nav as
      | Record<string, string>
      | undefined;
    return navTranslations?.[key] || key;
  };

  // Helper to get icon component
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || FiLayers;
    return IconComponent;
  };

  return (
    <div className="navbar sticky top-0 z-40 bg-base-100/95 shadow-lg backdrop-blur-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <FiMenu className="h-6 w-6" />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {mainItems.map((item) => {
              const IconComponent = getIcon(item.icon);
              return (
                <li key={item.key}>
                  <a href={`/${lang}${item.href}`}>
                    <IconComponent className="h-4 w-4" />
                    {getNavLabel(item.key)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <a href={`/${lang}/`} className="btn btn-ghost text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-white">
            I8
          </div>
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {mainItems.map((item) => {
            const IconComponent = getIcon(item.icon);
            return (
              <li key={item.key}>
                <a href={`/${lang}${item.href}`} className="transition-colors hover:text-primary">
                  <IconComponent className="h-4 w-4" />
                  {getNavLabel(item.key)}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher currentLang={lang} />
        {ctaItem && (
          <a href={`/${lang}${ctaItem.href}`} className="hidden sm:inline-block">
            <Button variant="primary" size="sm" className="gap-2">
              {(() => {
                const CTAIcon = getIcon(ctaItem.icon);
                return <CTAIcon className="h-4 w-4" />;
              })()}
              {getNavLabel(ctaItem.key)}
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
