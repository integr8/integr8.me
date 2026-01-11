import React from 'react';

interface PracticeCardProps {
  name: string;
  items: string[];
  icon: string;
  index: number;
}

const iconEmoji: Record<string, string> = {
  iac: '🏗️',
  gitops: '📦',
  observability: '📊',
  security: '🔐',
};

const borderColors = [
  'border-blue-500/30 hover:border-blue-500',
  'border-green-500/30 hover:border-green-500',
  'border-purple-500/30 hover:border-purple-500',
  'border-red-500/30 hover:border-red-500',
];

export function PracticeCard({ name, items, icon, index }: PracticeCardProps) {
  return (
    <div
      className={`card border-2 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${borderColors[index % borderColors.length]}`}
    >
      <div className="card-body">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{iconEmoji[icon] || '⚡'}</span>
          <h4 className="text-lg font-bold">{name}</h4>
        </div>
        <ul className="mt-4 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-base-content/80">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
