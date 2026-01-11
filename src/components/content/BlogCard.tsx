import React from 'react';
import { FiArrowRight, FiClock, FiCalendar, FiUser } from 'react-icons/fi';

interface BlogCardProps {
  title: string;
  description?: string;
  image?: string;
  category?: string;
  readTime?: number;
  author?: string;
  date?: Date;
  href: string;
  lang: string;
}

// Gradient fallbacks for different categories
const categoryGradients: Record<string, string> = {
  devops: 'from-blue-500 to-cyan-500',
  kubernetes: 'from-blue-600 to-indigo-600',
  cloud: 'from-sky-400 to-blue-600',
  sre: 'from-orange-500 to-red-500',
  devsecops: 'from-red-500 to-pink-500',
  cicd: 'from-green-500 to-emerald-500',
  observability: 'from-purple-500 to-indigo-500',
  gitops: 'from-orange-400 to-amber-500',
  default: 'from-primary to-secondary',
};

// Icons for different categories
const categoryIcons: Record<string, string> = {
  devops: '🔄',
  kubernetes: '☸️',
  cloud: '☁️',
  sre: '🔧',
  devsecops: '🔐',
  cicd: '🚀',
  observability: '📊',
  gitops: '📦',
  default: '💡',
};

export function BlogCard({
  title,
  description,
  image,
  category,
  readTime,
  author,
  date,
  href,
  lang,
}: BlogCardProps) {
  const categoryKey = category?.toLowerCase().replace(/\s+/g, '') || 'default';
  const gradient = categoryGradients[categoryKey] || categoryGradients.default;
  const icon = categoryIcons[categoryKey] || categoryIcons.default;

  const formattedDate = date
    ? new Intl.DateTimeFormat(lang === 'ptbr' ? 'pt-BR' : 'en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date)
    : null;

  const relativeDate = date ? getRelativeTime(date, lang) : null;

  return (
    <a
      href={href}
      className="group card overflow-hidden bg-base-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image or gradient fallback */}
      <figure className="relative h-48 overflow-hidden">
        {image ? (
          <>
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div
              className={`hidden h-full w-full items-center justify-center bg-gradient-to-br ${gradient}`}
            >
              <span className="text-6xl opacity-50">{icon}</span>
            </div>
          </>
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient}`}
          >
            <span className="text-6xl opacity-50 transition-transform duration-300 group-hover:scale-125">
              {icon}
            </span>
          </div>
        )}

        {/* Category badge overlay */}
        {category && (
          <div className="absolute left-4 top-4">
            <span className="badge badge-primary badge-lg font-medium shadow-lg">{category}</span>
          </div>
        )}

        {/* Read time overlay */}
        {readTime && (
          <div className="absolute right-4 top-4">
            <span className="flex items-center gap-1 rounded-full bg-base-100/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              <FiClock className="h-3 w-3" />
              {readTime} min
            </span>
          </div>
        )}
      </figure>

      <div className="card-body">
        {/* Title */}
        <h3 className="card-title line-clamp-2 text-lg transition-colors group-hover:text-primary">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="line-clamp-2 text-sm text-base-content/70">{description}</p>
        )}

        {/* Metadata */}
        <div className="mt-4 flex items-center justify-between border-t border-base-200 pt-4 text-xs text-base-content/60">
          <div className="flex items-center gap-4">
            {author && (
              <span className="flex items-center gap-1">
                <FiUser className="h-3 w-3" />
                {author}
              </span>
            )}
            {formattedDate && (
              <span className="flex items-center gap-1" title={formattedDate}>
                <FiCalendar className="h-3 w-3" />
                {relativeDate || formattedDate}
              </span>
            )}
          </div>

          {/* Read more indicator */}
          <span className="flex items-center gap-1 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            {lang === 'ptbr' ? 'Ler' : 'Read'}
            <FiArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

function getRelativeTime(date: Date, lang: string): string | null {
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return lang === 'ptbr' ? 'Hoje' : 'Today';
  } else if (diffInDays === 1) {
    return lang === 'ptbr' ? 'Ontem' : 'Yesterday';
  } else if (diffInDays < 7) {
    return lang === 'ptbr' ? `${diffInDays} dias atrás` : `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return lang === 'ptbr'
      ? `${weeks} ${weeks === 1 ? 'semana' : 'semanas'} atrás`
      : `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }

  return null; // Return null to show full date for older posts
}
