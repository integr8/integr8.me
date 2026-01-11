import React from 'react';
import { Icon } from '@components/common/Icon';
import { Button } from '@components/common/Button';
import { LanguageSwitcher } from '@components/common/LanguageSwitcher';
import { ThemeSwitcher } from '@components/common/ThemeSwitcher';
import { loadNavigation } from '@lib/toml';

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
    return translations?.nav?.[key] || key;
  };

  return (
    <div className="navbar sticky top-0 z-40 bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <Icon name="Bars3Icon" className="h-6 w-6" />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {mainItems.map((item) => (
              <li key={item.key}>
                <a href={`/${lang}${item.href}`}>
                  <Icon name={item.icon} className="h-4 w-4" />
                  {getNavLabel(item.key)}
                </a>
              </li>
            ))}
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
          {mainItems.map((item) => (
            <li key={item.key}>
              <a href={`/${lang}${item.href}`}>
                <Icon name={item.icon} className="h-4 w-4" />
                {getNavLabel(item.key)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher currentLang={lang} />
        {ctaItem && (
          <a href={`/${lang}${ctaItem.href}`} className="hidden sm:inline-block">
            <Button variant="primary" size="sm" className="gap-2">
              <Icon name={ctaItem.icon} className="h-4 w-4" />
              {getNavLabel(ctaItem.key)}
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
