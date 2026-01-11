import React from 'react';

interface TechStackProps {
  title?: string;
  technologies: Array<{
    name: string;
    icon?: string;
    description?: string;
  }>;
}

export function TechStack({ title, technologies }: TechStackProps) {
  return (
    <div className="my-8">
      {title && <h3 className="mb-4 text-xl font-bold">{title}</h3>}
      <div className="flex flex-wrap gap-3">
        {technologies.map((tech, index) => (
          <div key={index} className="tooltip tooltip-bottom" data-tip={tech.description}>
            <div className="badge badge-primary badge-lg gap-2 py-4">
              {tech.icon && <span>{tech.icon}</span>}
              <span>{tech.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface FeatureGridProps {
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  columns?: 2 | 3 | 4;
}

export function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} my-8 gap-6`}>
      {features.map((feature, index) => (
        <div key={index} className="card bg-base-100 shadow-md transition-shadow hover:shadow-lg">
          <div className="card-body items-center text-center">
            <span className="mb-2 text-4xl">{feature.icon}</span>
            <h4 className="card-title text-lg">{feature.title}</h4>
            <p className="text-sm text-base-content/70">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

interface ComparisonTableProps {
  headers: string[];
  rows: Array<{
    feature: string;
    values: (string | boolean)[];
  }>;
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Feature</th>
            {headers.map((header, index) => (
              <th key={index} className="text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="font-medium">{row.feature}</td>
              {row.values.map((value, valIndex) => (
                <td key={valIndex} className="text-center">
                  {typeof value === 'boolean' ? (
                    value ? (
                      <span className="text-xl text-success">✓</span>
                    ) : (
                      <span className="text-xl text-error">✗</span>
                    )
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface TimelineProps {
  items: Array<{
    phase: string;
    duration: string;
    title: string;
    description: string;
    deliverables?: string[];
  }>;
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="my-8">
      <div className="space-y-10">
        {/* Horizontal track with pills */}
        <div className="relative">
          <div
            className="absolute left-0 right-0 top-1/2 h-px bg-primary/30"
            aria-hidden="true"
          ></div>
          <div className="no-scrollbar flex items-center justify-between gap-4 overflow-x-auto px-2 py-2 md:px-4 lg:gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="relative z-10 flex min-w-[140px] flex-1 flex-col items-center"
              >
                <div className="whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-content shadow-sm">
                  {item.phase}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {items.map((item, index) => (
            <div key={index} className="h-full rounded-xl border border-base-200 bg-base-100 p-5">
              <h4 className="mb-3 text-lg font-bold leading-tight text-base-content">
                {item.title}
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-base-content/70">
                {item.description}
              </p>
              {item.deliverables && item.deliverables.length > 0 && (
                <ul className="space-y-2">
                  {item.deliverables.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm leading-relaxed text-base-content/80"
                    >
                      <span className="mt-1 text-primary">→</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// All exports are inline with function declarations
