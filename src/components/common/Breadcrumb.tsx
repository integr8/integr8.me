import React from 'react';
import { FiHome, FiChevronRight } from 'react-icons/fi';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <a href={item.href} className="link-hover link inline-flex items-center gap-1">
                {index === 0 && <FiHome className="h-4 w-4" />}
                {item.label}
              </a>
            ) : (
              <span className="inline-flex items-center gap-1">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
