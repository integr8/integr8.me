import React from 'react';
import { FiTrendingUp, FiClock, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';

interface DORAMetric {
  name: string;
  description: string;
  target: string;
  icon: 'frequency' | 'leadtime' | 'mttr' | 'failure';
}

interface DORAMetricsProps {
  metrics: DORAMetric[];
  lang: string;
}

const iconMap = {
  frequency: FiTrendingUp,
  leadtime: FiClock,
  mttr: FiRefreshCw,
  failure: FiAlertTriangle,
};

const colorMap = {
  frequency: 'text-green-500 bg-green-500/10',
  leadtime: 'text-blue-500 bg-blue-500/10',
  mttr: 'text-orange-500 bg-orange-500/10',
  failure: 'text-red-500 bg-red-500/10',
};

export function DORAMetrics({ metrics, lang }: DORAMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const IconComponent = iconMap[metric.icon];
        const colors = colorMap[metric.icon];

        return (
          <div
            key={metric.name}
            className="card border border-base-300 bg-base-100 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
          >
            <div className="card-body p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors}`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <h4 className="mt-3 font-bold">{metric.name}</h4>
              <p className="text-sm text-base-content/60">{metric.description}</p>
              <div className="mt-3 rounded-lg bg-success/10 px-3 py-2">
                <span className="text-sm font-semibold text-success">
                  {lang === 'ptbr' ? 'Meta: ' : 'Target: '}
                  {metric.target}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
