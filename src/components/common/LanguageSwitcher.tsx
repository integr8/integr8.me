'use client';

import React from 'react';
import { LANGUAGES } from '@i18n/config';
import { Icon } from './Icon';

export interface LanguageSwitcherProps {
  currentLang: string;
  onLanguageChange?: (lang: string) => void;
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const handleLanguageChange = (lang: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${currentLang}/`, `/${lang}/`);
    window.location.href = newPath;
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle"
        aria-label="Change language"
      >
        <Icon name="GlobeAltIcon" className="h-5 w-5" />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {Object.entries(LANGUAGES).map(([code, name]) => (
          <li key={code}>
            <button
              onClick={() => handleLanguageChange(code)}
              className={currentLang === code ? 'active' : ''}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
