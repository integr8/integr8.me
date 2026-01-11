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
    
    // Se estamos na raiz (/), redireciona para /{lang}/
    if (currentPath === '/') {
      window.location.href = `/${lang}/`;
      return;
    }
    
    // Caso contrário, substitui o idioma atual pelo novo
    const newPath = currentPath.replace(`/${currentLang}/`, `/${lang}/`);
    window.location.href = newPath;
  };

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-circle btn-ghost" aria-label="Change language">
        <Icon name="GlobeAltIcon" className="h-5 w-5" />
      </button>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
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
