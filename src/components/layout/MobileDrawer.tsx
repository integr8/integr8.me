'use client';

import React, { useState } from 'react';
import { FiMenu, FiX, FiHome, FiLayers, FiTool, FiBriefcase, FiFileText, FiMail } from 'react-icons/fi';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HomeIcon: FiHome,
  LayersIcon: FiLayers,
  CogIcon: FiTool,
  BriefcaseIcon: FiBriefcase,
  DocumentTextIcon: FiFileText,
  EnvelopeIcon: FiMail,
  ChatBubbleLeftRightIcon: FiMail,
  Bars3Icon: FiMenu,
  XMarkIcon: FiX,
};

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
        <label htmlFor="mobile-drawer" className="btn btn-circle btn-ghost lg:hidden">
          <FiMenu className="h-6 w-6" />
        </label>
      </div>
      <div className="drawer-side z-50">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <div className="menu w-80 space-y-2 bg-base-100 p-4 text-base-content">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-bold">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-circle btn-ghost btn-sm"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <ul className="space-y-1">
            {items.map((item) => {
              const IconComponent = iconMap[item.icon] || FiLayers;
              return (
                <li key={item.key}>
                  <a
                    href={`/${lang}${item.href}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-base-200"
                  >
                    <IconComponent className="h-5 w-5 text-primary" />
                    {item.key}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
