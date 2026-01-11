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
  columns?: 2 | 3 | 4 | 6;
  variant?: 'default' | 'compact' | 'detailed';
}

export function FeatureGrid({ features, columns = 3, variant = 'default' }: FeatureGridProps) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
    6: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };

  if (variant === 'compact') {
    return (
      <div className={`grid grid-cols-1 ${gridCols[columns]} my-8 gap-4`}>
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="group flex items-start gap-4 rounded-xl border border-base-200 bg-base-100 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-2xl transition-transform group-hover:scale-110">
              {feature.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-base-content">{feature.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-base-content/60">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`grid grid-cols-1 ${gridCols[columns]} my-8 gap-6`}>
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden rounded-2xl border border-base-200 bg-base-100 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />
            
            <div className="relative">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-4xl transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h4 className="mb-2 text-xl font-bold text-base-content">{feature.title}</h4>
              <p className="text-base-content/70 leading-relaxed">{feature.description}</p>
            </div>
            
            {/* Decorative corner */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-2xl" />
          </div>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} my-8 gap-6`}>
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="group rounded-2xl border border-base-200 bg-base-100 p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-3xl transition-transform group-hover:scale-110">
            {feature.icon}
          </div>
          <h4 className="mb-2 text-lg font-bold text-base-content">{feature.title}</h4>
          <p className="text-sm leading-relaxed text-base-content/60">{feature.description}</p>
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
    <div className="my-8 overflow-hidden rounded-2xl border border-base-200">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200/50">
            <tr>
              <th className="font-bold text-base-content">Feature</th>
              {headers.map((header, index) => (
                <th key={index} className="text-center font-bold text-base-content">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-base-200/30">
                <td className="font-medium text-base-content">{row.feature}</td>
                {row.values.map((value, valIndex) => (
                  <td key={valIndex} className="text-center">
                    {typeof value === 'boolean' ? (
                      value ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success/10 text-sm text-success">✓</span>
                      ) : (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-error/10 text-sm text-error">✗</span>
                      )
                    ) : (
                      <span className="text-base-content/80">{value}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface TimelineProps {
  title?: string;
  items: Array<{
    phase: string;
    duration?: string;
    title: string;
    description: string;
    deliverables?: string[];
  }>;
  variant?: 'horizontal' | 'vertical';
}

export function Timeline({ title, items, variant = 'horizontal' }: TimelineProps) {
  if (variant === 'vertical') {
    return (
      <div className="my-8">
        {title && <h3 className="mb-8 text-2xl font-bold text-base-content">{title}</h3>}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-primary/20" />
          
          <div className="space-y-8">
            {items.map((item, index) => (
              <div key={index} className="relative pl-16">
                {/* Timeline dot */}
                <div className="absolute left-0 flex h-12 w-12 items-center justify-center">
                  <div className="absolute h-12 w-12 rounded-full bg-primary/10" />
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content">
                    {index + 1}
                  </div>
                </div>
                
                {/* Content card */}
                <div className="rounded-2xl border border-base-200 bg-base-100 p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {item.phase}
                    </span>
                    {item.duration && (
                      <span className="text-sm text-base-content/50">{item.duration}</span>
                    )}
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-base-content">{item.title}</h4>
                  <p className="text-base-content/70">{item.description}</p>
                  {item.deliverables && item.deliverables.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {item.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-base-content/80">
                          <span className="mt-1 text-primary">→</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className="my-8">
      {title && <h3 className="mb-8 text-2xl font-bold text-base-content">{title}</h3>}
      <div className="space-y-8">
        {/* Horizontal track with pills */}
        <div className="relative hidden sm:block">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
          <div className="flex items-center justify-between gap-4 px-2 py-2 md:px-4">
            {items.map((item, index) => (
              <div key={index} className="relative z-10 flex flex-1 flex-col items-center">
                <div className="whitespace-nowrap rounded-full bg-gradient-to-r from-primary to-primary/80 px-4 py-2 text-sm font-semibold text-primary-content shadow-lg">
                  {item.phase}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="group h-full rounded-2xl border border-base-200 bg-base-100 p-6 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Mobile phase badge */}
              <div className="mb-4 sm:hidden">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {item.phase}
                </span>
              </div>
              
              <h4 className="mb-3 text-lg font-bold leading-tight text-base-content group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-base-content/60">
                {item.description}
              </p>
              {item.deliverables && item.deliverables.length > 0 && (
                <ul className="space-y-2 border-t border-base-200 pt-4">
                  {item.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-base-content/70">
                      <span className="mt-0.5 text-primary">✓</span>
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
