import React from 'react';
import { FiArrowRight, FiTrendingUp, FiTrendingDown, FiZap } from 'react-icons/fi';

interface CaseMetric {
  value: string;
  label: string;
  type?: 'up' | 'down' | 'neutral';
}

interface CaseCardProps {
  title: string;
  description?: string;
  client?: string;
  industry?: string;
  technologies?: string[];
  metrics?: CaseMetric[];
  href: string;
  lang: string;
  featured?: boolean;
}

// Industry colors
const industryStyles: Record<string, { color: string; bg: string; icon: string }> = {
  fintech: { color: 'text-green-500', bg: 'bg-green-500/10', icon: '💰' },
  ecommerce: { color: 'text-purple-500', bg: 'bg-purple-500/10', icon: '🛒' },
  saas: { color: 'text-blue-500', bg: 'bg-blue-500/10', icon: '☁️' },
  healthcare: { color: 'text-red-500', bg: 'bg-red-500/10', icon: '🏥' },
  logistics: { color: 'text-orange-500', bg: 'bg-orange-500/10', icon: '🚚' },
  media: { color: 'text-pink-500', bg: 'bg-pink-500/10', icon: '📺' },
  banking: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: '🏦' },
  default: { color: 'text-primary', bg: 'bg-primary/10', icon: '🏢' },
};

export function CaseCard({
  title,
  description,
  client,
  industry,
  technologies = [],
  metrics = [],
  href,
  lang,
  featured = false,
}: CaseCardProps) {
  const industryKey = industry?.toLowerCase().replace(/\s+/g, '') || 'default';
  const style = industryStyles[industryKey] || industryStyles.default;

  // Generate default metrics if not provided (for demo purposes)
  const displayMetrics: CaseMetric[] =
    metrics.length > 0
      ? metrics.slice(0, 3)
      : [
          { value: '↓40%', label: lang === 'ptbr' ? 'tempo deploy' : 'deploy time', type: 'down' },
          { value: '99.9%', label: 'uptime', type: 'neutral' },
        ];

  return (
    <a
      href={href}
      className={`group card relative overflow-hidden bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        featured ? 'border-2 border-primary shadow-xl' : 'border border-base-300 shadow-lg'
      }`}
    >
      {/* Header with industry indicator */}
      <div className={`flex items-center gap-3 p-4 pb-0`}>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${style.bg}`}>
          <span className="text-xl">{style.icon}</span>
        </div>
        <div className="flex-1">
          {industry && (
            <span className={`text-xs font-medium uppercase tracking-wide ${style.color}`}>
              {industry}
            </span>
          )}
          {client && <p className="text-xs text-base-content/60">{client}</p>}
        </div>
        {featured && (
          <span className="badge badge-primary badge-sm">
            {lang === 'ptbr' ? 'Destaque' : 'Featured'}
          </span>
        )}
      </div>

      <div className="card-body pt-3">
        {/* Title */}
        <h3 className="card-title line-clamp-2 text-lg transition-colors group-hover:text-primary">
          {title}
        </h3>

        {/* Description */}
        {description && <p className="line-clamp-2 text-sm text-base-content/70">{description}</p>}

        {/* Metrics showcase */}
        {displayMetrics.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-base-200/50 p-3">
            {displayMetrics.map((metric, idx) => {
              const MetricIcon =
                metric.type === 'up'
                  ? FiTrendingUp
                  : metric.type === 'down'
                    ? FiTrendingDown
                    : FiZap;
              const colorClass =
                metric.type === 'up'
                  ? 'text-success'
                  : metric.type === 'down'
                    ? 'text-success' // down is also good (reduction)
                    : 'text-warning';

              return (
                <div key={idx} className="text-center">
                  <div className={`flex items-center justify-center gap-1 ${colorClass}`}>
                    <MetricIcon className="h-3 w-3" />
                    <span className="text-lg font-bold">{metric.value}</span>
                  </div>
                  <span className="text-xs text-base-content/60">{metric.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="badge badge-outline badge-xs">
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="badge badge-ghost badge-xs">+{technologies.length - 4}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 flex items-center justify-end border-t border-base-200 pt-4">
          <span className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            {lang === 'ptbr' ? 'Ver caso completo' : 'View full case'}
            <FiArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </a>
  );
}
