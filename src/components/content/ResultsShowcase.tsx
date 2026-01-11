import React from 'react';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiDollarSign,
  FiZap,
  FiSmile,
  FiCheckCircle,
  FiActivity,
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

interface Result {
  icon?: string;
  title: string;
  description: string;
  metric?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface ResultsShowcaseProps {
  title?: string;
  subtitle?: string;
  results: Result[];
  variant?: 'cards' | 'stats' | 'compact';
}

// Icon mapping based on common result types
function getResultIcon(title: string, icon?: string): React.ReactNode {
  const lowerTitle = title.toLowerCase();

  if (icon) return <span className="text-2xl">{icon}</span>;

  if (lowerTitle.includes('custo') || lowerTitle.includes('cost') || lowerTitle.includes('%')) {
    return <FiDollarSign className="h-6 w-6" />;
  }
  if (
    lowerTitle.includes('tempo') ||
    lowerTitle.includes('time') ||
    lowerTitle.includes('dias') ||
    lowerTitle.includes('day')
  ) {
    return <FiClock className="h-6 w-6" />;
  }
  if (
    lowerTitle.includes('produtividade') ||
    lowerTitle.includes('productivity') ||
    lowerTitle.includes('rápido') ||
    lowerTitle.includes('fast')
  ) {
    return <FiZap className="h-6 w-6" />;
  }
  if (lowerTitle.includes('satisf') || lowerTitle.includes('nps') || lowerTitle.includes('happy')) {
    return <FiSmile className="h-6 w-6" />;
  }
  if (lowerTitle.includes('uptime') || lowerTitle.includes('disponibilidade')) {
    return <FiActivity className="h-6 w-6" />;
  }

  return <FiCheckCircle className="h-6 w-6" />;
}

function getTrendIcon(trend?: 'up' | 'down' | 'neutral') {
  if (trend === 'up') return <FiTrendingUp className="h-4 w-4 text-success" />;
  if (trend === 'down') return <FiTrendingDown className="h-4 w-4 text-success" />;
  return null;
}

export function ResultsShowcase({
  title = 'Resultados',
  subtitle,
  results,
  variant = 'stats',
}: ResultsShowcaseProps) {
  if (variant === 'stats') {
    return (
      <div className="my-12">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg">
              <HiSparkles className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-base-content">{title}</h3>
          {subtitle && <p className="mt-2 text-base-content/60">{subtitle}</p>}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-base-200 bg-gradient-to-br from-base-100 via-base-100 to-primary/5 p-8">
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr from-secondary/10 to-primary/10 blur-3xl" />

          <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
            {results.map((result, index) => (
              <div key={index} className="group text-center">
                {/* Icon */}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary transition-transform group-hover:scale-110">
                  {getResultIcon(result.title, result.icon)}
                </div>

                {/* Metric */}
                <div className="mb-2 flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-base-content lg:text-4xl">
                    {result.title}
                  </span>
                  {getTrendIcon(result.trend)}
                </div>

                {/* Description */}
                <p className="text-sm text-base-content/60">{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="my-8">
        {title && <h3 className="mb-4 text-xl font-bold text-base-content">{title}</h3>}
        <div className="flex flex-wrap gap-4">
          {results.map((result, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl border border-base-200 bg-base-100 px-4 py-3 transition-all hover:border-success/30 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                {getResultIcon(result.title, result.icon)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base-content">{result.title}</span>
                  {getTrendIcon(result.trend)}
                </div>
                <span className="text-sm text-base-content/60">{result.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Cards variant
  return (
    <div className="my-12">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-base-content">{title}</h3>
        {subtitle && <p className="mt-2 text-base-content/60">{subtitle}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((result, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-base-200 bg-base-100 p-6 transition-all hover:border-success/30 hover:shadow-xl"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative">
              {/* Icon */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-success/10 to-emerald-500/10 text-success transition-transform group-hover:scale-110">
                {getResultIcon(result.title, result.icon)}
              </div>

              {/* Content */}
              <div className="flex items-center gap-2">
                <h4 className="text-2xl font-bold text-base-content">{result.title}</h4>
                {getTrendIcon(result.trend)}
              </div>
              <p className="mt-1 text-base-content/60">{result.description}</p>
            </div>

            {/* Decorative corner */}
            <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br from-success/10 to-transparent blur-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsShowcase;
