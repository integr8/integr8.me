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
    <div className="hero relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-base-300 via-base-200 to-primary/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="animate-float-delayed absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="animate-pulse-slow absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="hero-overlay bg-base-100/80" />
        </>
      )}

      <div className="hero-content relative z-10 py-20 text-center">
        <div className="max-w-3xl">
          {badge && (
            <div className="animate-fade-in-down mb-6">
              <Badge variant="primary" className="gap-2 px-4 py-2 text-sm">
                <Icon name="SparklesIcon" className="h-4 w-4" />
                {badge}
              </Badge>
            </div>
          )}

          <h1 className="animate-fade-in-up mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {title.split('\n').map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          {subtitle && (
            <p className="animate-fade-in-up animation-delay-200 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-base-content/70 md:text-xl">
              {subtitle}
            </p>
          )}

          {cta && (
            <div className="animate-fade-in-up animation-delay-400 flex flex-wrap justify-center gap-4">
              <a href={cta.primary.href}>
                <Button
                  variant="primary"
                  size="lg"
                  className="gap-2 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  <Icon name="RocketLaunchIcon" className="h-5 w-5" />
                  {cta.primary.label}
                </Button>
              </a>
              {cta.secondary && (
                <a href={cta.secondary.href}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 transition-all hover:bg-base-content/5"
                  >
                    {cta.secondary.label}
                    <Icon name="ArrowRightIcon" className="h-5 w-5" />
                  </Button>
                </a>
              )}
            </div>
          )}

          {/* Floating tech icons */}
          <div className="animate-fade-in animation-delay-600 mt-16 flex flex-wrap items-center justify-center gap-8 opacity-50">
            <Icon name="KubernetesIcon" className="h-8 w-8 transition-opacity hover:opacity-100" />
            <Icon name="DockerIcon" className="h-8 w-8 transition-opacity hover:opacity-100" />
            <Icon name="AwsIcon" className="h-8 w-8 transition-opacity hover:opacity-100" />
            <Icon name="AzureIcon" className="h-8 w-8 transition-opacity hover:opacity-100" />
            <Icon name="GcpIcon" className="h-8 w-8 transition-opacity hover:opacity-100" />
            <Icon name="TerraformIcon" className="h-8 w-8 transition-opacity hover:opacity-100" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDownIcon" className="h-6 w-6 text-base-content/40" />
      </div>
    </div>
  );
}
