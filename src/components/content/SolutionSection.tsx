import React from 'react';

interface SolutionSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'alternate' | 'highlight';
  children: React.ReactNode;
}

export function SolutionSection({
  id,
  title,
  subtitle,
  icon,
  variant = 'default',
  children,
}: SolutionSectionProps) {
  const bgClasses = {
    default: 'bg-base-100',
    alternate: 'bg-base-200/30',
    highlight: 'bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5',
  };

  return (
    <section id={id} className={`relative py-16 lg:py-24 ${bgClasses[variant]}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-start gap-4">
            {icon && (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {icon}
              </div>
            )}
            <div>
              <h2 className="text-3xl font-bold text-base-content lg:text-4xl">{title}</h2>
              {subtitle && <p className="mt-2 text-lg text-base-content/60">{subtitle}</p>}
            </div>
          </div>
          {/* Decorative line */}
          <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-secondary" />
        </div>

        {/* Section content */}
        <div className="solution-section-content">{children}</div>
      </div>
    </section>
  );
}

// Compact section for smaller content blocks
export function SolutionSubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12 last:mb-0">
      <h3 className="mb-6 text-2xl font-bold text-base-content">{title}</h3>
      {children}
    </div>
  );
}

export default SolutionSection;
