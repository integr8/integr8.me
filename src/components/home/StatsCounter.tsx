import React from 'react';
import { Icon } from '@components/common/Icon';
import { loadStats } from '@lib/toml';

export interface StatsCounterProps {
  lang: string;
}

export function StatsCounter({ lang }: StatsCounterProps) {
  const stats = loadStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.id} className="stats shadow bg-base-100 w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Icon name={stat.icon} className="h-8 w-8" />
            </div>
            <div className="stat-title text-sm">{stat.label[lang]}</div>
            <div className="stat-value text-primary text-3xl">
              {stat.value}
              <span className="text-lg">{stat.suffix}</span>
            </div>
            <div className="stat-desc text-xs text-base-content/60">
              {stat.description[lang]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
