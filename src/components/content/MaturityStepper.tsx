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
      {title && (
        <h3 className="text-2xl font-bold mb-6 text-base-content">{title}</h3>
      )}
      <div className="space-y-10">
        {/* Horizontal track with circles */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-base-200" aria-hidden="true"></div>
          <div className="flex items-center justify-between gap-4 lg:gap-6 overflow-x-auto no-scrollbar px-2 md:px-4 py-2">
            {levels.map((level) => {
              const isActive = currentLevel ? level.level <= currentLevel : false;
              const isCurrent = currentLevel === level.level;
              return (
                <div key={level.level} className="relative z-10 flex flex-col items-center flex-1 min-w-[140px]">
                  <div
                    className={`h-11 w-11 rounded-full flex items-center justify-center text-base-content font-semibold shadow-sm border ${
                      isCurrent ? 'bg-primary text-primary-content border-primary' : isActive ? 'bg-base-100 border-primary/50' : 'bg-base-100 border-base-200'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {levels.map((level) => {
            const isActive = currentLevel ? level.level <= currentLevel : false;
            const isCurrent = currentLevel === level.level;
            return (
              <div
                key={level.level}
                className={`rounded-xl border p-5 h-full ${
                  isCurrent ? 'border-primary/60 bg-primary/5' : isActive ? 'border-base-300 bg-base-50' : 'border-base-200 bg-base-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`font-bold text-lg leading-tight ${isActive ? 'text-primary' : 'text-base-content'}`}>
                    Nível {level.level}: {level.title}
                  </span>
                  {isCurrent && <span className="badge badge-primary badge-sm">Atual</span>}
                </div>
                {level.description && (
                  <p className="text-sm text-base-content/70 mb-4 leading-relaxed">{level.description}</p>
                )}
                <ul className="space-y-2">
                  {level.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm text-base-content/80 leading-relaxed">
                      <span className="text-primary mt-1">•</span>
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
      {title && (
        <h3 className="text-2xl font-bold mb-6 text-base-content">{title}</h3>
      )}
      
      <div className="space-y-10">
        {/* Horizontal track with circles */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-base-200" aria-hidden="true"></div>
          <div className="flex items-center justify-between gap-4 lg:gap-6 overflow-x-auto no-scrollbar px-2 md:px-4 py-2">
            {levels.map((level) => {
              const isActive = currentLevel ? level.level <= currentLevel : false;
              const isCurrent = currentLevel === level.level;
              return (
                <div key={level.level} className="relative z-10 flex flex-col items-center flex-1 min-w-[140px]">
                  <div
                    className={`h-11 w-11 rounded-full flex items-center justify-center text-base-content font-semibold shadow-sm border ${
                      isCurrent ? 'bg-primary text-primary-content border-primary' : isActive ? 'bg-base-100 border-primary/50' : 'bg-base-100 border-base-200'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {levels.map((level) => {
            const isActive = currentLevel ? level.level <= currentLevel : false;
            const isCurrent = currentLevel === level.level;
            return (
              <div
                key={level.level}
                className={`rounded-xl border p-5 h-full ${
                  isCurrent ? 'border-primary/60 bg-primary/5' : isActive ? 'border-base-300 bg-base-50' : 'border-base-200 bg-base-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`font-bold text-lg leading-tight ${isActive ? 'text-primary' : 'text-base-content'}`}>
                    Nível {level.level}: {level.title}
                  </span>
                  {isCurrent && <span className="badge badge-primary badge-sm">Atual</span>}
                </div>
                {level.description && (
                  <p className="text-sm text-base-content/70 mb-4 leading-relaxed">{level.description}</p>
                )}
                <ul className="space-y-2">
                  {level.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm text-base-content/80 leading-relaxed">
                      <span className="text-primary mt-1">•</span>
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
