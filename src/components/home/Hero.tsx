import React from 'react';
import { Icon } from '@components/common/Icon';
import { Badge } from '@components/common/Badge';
import { Button } from '@components/common/Button';

export interface HeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  cta?: {
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  backgroundImage?: string;
}

export function Hero({ badge, title, subtitle, cta, backgroundImage }: HeroProps) {
  return (
    <div
      className="hero relative bg-cover bg-center"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-2xl">
          {badge && (
            <Badge variant="primary" className="mb-6">
              {badge}
            </Badge>
          )}
          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
          {subtitle && <p className="mb-8 text-lg leading-relaxed">{subtitle}</p>}

          {cta && (
            <div className="flex flex-wrap justify-center gap-4">
              <a href={cta.primary.href}>
                <Button variant="primary" size="lg" className="gap-2">
                  <Icon name="RocketLaunchIcon" className="h-5 w-5" />
                  {cta.primary.label}
                </Button>
              </a>
              {cta.secondary && (
                <a href={cta.secondary.href}>
                  <Button variant="outline" size="lg" className="gap-2">
                    <Icon name="ArrowRightIcon" className="h-5 w-5" />
                    {cta.secondary.label}
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
