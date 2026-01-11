import React from 'react';
import * as outline from '@heroicons/react/24/outline';
import * as solid from '@heroicons/react/24/solid';
import * as mini from '@heroicons/react/20/solid';

export interface IconProps {
  name: string;
  variant?: 'outline' | 'solid' | 'mini';
  className?: string;
  'aria-hidden'?: boolean;
  role?: string;
}

type IconName = keyof typeof outline;

export function Icon({ name, variant = 'outline', className = 'h-6 w-6', ...props }: IconProps) {
  let iconSet: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>;

  switch (variant) {
    case 'solid':
      iconSet = solid as Record<string, React.ComponentType>;
      break;
    case 'mini':
      iconSet = mini as Record<string, React.ComponentType>;
      break;
    default:
      iconSet = outline as Record<string, React.ComponentType>;
  }

  const IconComponent = iconSet[name as IconName] as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} {...props} />;
}
