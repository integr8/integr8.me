'use client';

import React, { useState } from 'react';
import { Icon } from '@components/common/Icon';

interface MobileDrawerProps {
  lang: string;
  items: Array<{
    key: string;
    href: string;
    icon: string;
  }>;
}

export function MobileDrawer({ lang, items }: MobileDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="drawer">
      <input
        id="mobile-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
      <div className="drawer-content">
        <label htmlFor="mobile-drawer" className="btn btn-ghost btn-circle lg:hidden">
          <Icon name="Bars3Icon" className="h-6 w-6" />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content space-y-2">
          {items.map((item) => (
            <li key={item.key}>
              <a href={`/${lang}${item.href}`} onClick={() => setIsOpen(false)}>
                <Icon name={item.icon} className="h-5 w-5" />
                {item.key}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
