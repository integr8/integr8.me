import React from 'react';

export interface StepsProps {
  steps: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
}

export function Steps({ steps }: StepsProps) {
  return (
    <ul className="steps steps-vertical w-full lg:steps-horizontal">
      {steps.map((step, index) => (
        <li key={index} className="step step-primary" data-content={index + 1}>
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl">{step.icon}</div>
            <span className="font-medium">{step.title}</span>
            <span className="max-w-xs text-center text-sm text-base-content/60">
              {step.description}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
