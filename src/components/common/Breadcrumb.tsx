import React from 'react';
import { Icon } from './Icon';

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
              <a href={item.href} className="link link-hover">
                {index === 0 && <Icon name="HomeIcon" className="h-4 w-4" />}
                {item.label}
              </a>
            ) : (
              <>
                {index > 0 && <Icon name="ChevronRightIcon" className="h-4 w-4" />}
                {item.label}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
