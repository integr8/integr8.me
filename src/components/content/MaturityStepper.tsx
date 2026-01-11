import React from 'react';

export interface MaturityLevel {
  level: number;
  title: string;
  description?: string;
  items: string[];
}

export interface MaturityStepperProps {
  title?: string;
  levels: MaturityLevel[];
  currentLevel?: number;
}

export function MaturityStepper({ title, levels, currentLevel }: MaturityStepperProps) {
  return (
    <div className="my-8">
      {title && <h3 className="mb-6 text-2xl font-bold text-base-content">{title}</h3>}
      <div className="space-y-10">
        {/* Horizontal track with circles */}
        <div className="relative">
          <div
            className="absolute left-0 right-0 top-1/2 h-px bg-base-200"
            aria-hidden="true"
          ></div>
          <div className="no-scrollbar flex items-center justify-between gap-4 overflow-x-auto px-2 py-2 md:px-4 lg:gap-6">
            {levels.map((level) => {
              const isActive = currentLevel ? level.level <= currentLevel : false;
              const isCurrent = currentLevel === level.level;
              return (
                <div
                  key={level.level}
                  className="relative z-10 flex min-w-[140px] flex-1 flex-col items-center"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border font-semibold text-base-content shadow-sm ${
                      isCurrent
                        ? 'border-primary bg-primary text-primary-content'
                        : isActive
                          ? 'border-primary/50 bg-base-100'
                          : 'border-base-200 bg-base-100'
                    }`}
                    aria-label={`Nível ${level.level}`}
                  >
                    {level.level}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
          {levels.map((level) => {
            const isActive = currentLevel ? level.level <= currentLevel : false;
            const isCurrent = currentLevel === level.level;
            return (
              <div
                key={level.level}
                className={`h-full rounded-xl border p-5 ${
                  isCurrent
                    ? 'border-primary/60 bg-primary/5'
                    : isActive
                      ? 'bg-base-50 border-base-300'
                      : 'border-base-200 bg-base-100'
                }`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`text-lg font-bold leading-tight ${isActive ? 'text-primary' : 'text-base-content'}`}
                  >
                    Nível {level.level}: {level.title}
                  </span>
                  {isCurrent && <span className="badge badge-primary badge-sm">Atual</span>}
                </div>
                {level.description && (
                  <p className="mb-4 text-sm leading-relaxed text-base-content/70">
                    {level.description}
                  </p>
                )}
                <ul className="space-y-2">
                  {level.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-2 text-sm leading-relaxed text-base-content/80"
                    >
                      <span className="mt-1 text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Versão horizontal para telas grandes
export function MaturityStepperHorizontal({ title, levels, currentLevel }: MaturityStepperProps) {
  return (
    <div className="my-8">
      {title && <h3 className="mb-6 text-2xl font-bold text-base-content">{title}</h3>}

      <div className="space-y-10">
        {/* Horizontal track with circles */}
        <div className="relative">
          <div
            className="absolute left-0 right-0 top-1/2 h-px bg-base-200"
            aria-hidden="true"
          ></div>
          <div className="no-scrollbar flex items-center justify-between gap-4 overflow-x-auto px-2 py-2 md:px-4 lg:gap-6">
            {levels.map((level) => {
              const isActive = currentLevel ? level.level <= currentLevel : false;
              const isCurrent = currentLevel === level.level;
              return (
                <div
                  key={level.level}
                  className="relative z-10 flex min-w-[140px] flex-1 flex-col items-center"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border font-semibold text-base-content shadow-sm ${
                      isCurrent
                        ? 'border-primary bg-primary text-primary-content'
                        : isActive
                          ? 'border-primary/50 bg-base-100'
                          : 'border-base-200 bg-base-100'
                    }`}
                    aria-label={`Nível ${level.level}`}
                  >
                    {level.level}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
          {levels.map((level) => {
            const isActive = currentLevel ? level.level <= currentLevel : false;
            const isCurrent = currentLevel === level.level;
            return (
              <div
                key={level.level}
                className={`h-full rounded-xl border p-5 ${
                  isCurrent
                    ? 'border-primary/60 bg-primary/5'
                    : isActive
                      ? 'bg-base-50 border-base-300'
                      : 'border-base-200 bg-base-100'
                }`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`text-lg font-bold leading-tight ${isActive ? 'text-primary' : 'text-base-content'}`}
                  >
                    Nível {level.level}: {level.title}
                  </span>
                  {isCurrent && <span className="badge badge-primary badge-sm">Atual</span>}
                </div>
                {level.description && (
                  <p className="mb-4 text-sm leading-relaxed text-base-content/70">
                    {level.description}
                  </p>
                )}
                <ul className="space-y-2">
                  {level.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-2 text-sm leading-relaxed text-base-content/80"
                    >
                      <span className="mt-1 text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MaturityStepper;
