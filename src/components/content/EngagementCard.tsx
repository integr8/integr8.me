import React from 'react';
import {
  FiSearch,
  FiCode,
  FiUsers,
  FiBookOpen,
  FiClock,
  FiCheckCircle,
  FiArrowRight,
} from 'react-icons/fi';

interface EngagementCardProps {
  title: string;
  duration: string;
  description: string;
  icon: 'assessment' | 'implementation' | 'staff' | 'training';
  highlights: string[];
  lang: string;
}

const iconMap = {
  assessment: FiSearch,
  implementation: FiCode,
  staff: FiUsers,
  training: FiBookOpen,
};

const colorMap = {
  assessment: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30' },
  implementation: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30' },
  staff: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/30' },
  training: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/30' },
};

export function EngagementCard({
  title,
  duration,
  description,
  icon,
  highlights,
  lang,
}: EngagementCardProps) {
  const IconComponent = iconMap[icon];
  const colors = colorMap[icon];

  return (
    <div
      className={`group card border-2 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${colors.border}`}
    >
      <div className="card-body">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.bg}`}>
            <IconComponent className={`h-7 w-7 ${colors.text}`} />
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-base-200 px-3 py-1 text-sm">
            <FiClock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="mt-4 text-xl font-bold">{title}</h3>
        <p className="text-base-content/70">{description}</p>

        {/* Highlights */}
        <ul className="mt-4 space-y-2">
          {highlights.slice(0, 4).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <FiCheckCircle className={`mt-0.5 h-4 w-4 flex-shrink-0 ${colors.text}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="card-actions mt-6">
          <button className={`flex items-center gap-2 text-sm font-medium ${colors.text}`}>
            {lang === 'ptbr' ? 'Saiba mais' : 'Learn more'}
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
