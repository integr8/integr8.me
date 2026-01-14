// =============================================================================
// DaisyTimeline - Wrapper for daisyUI Timeline component
// =============================================================================

import React from 'react';
import {
  HiCheckCircle,
  HiClock,
  HiXCircle,
  HiArrowPath,
  HiStar,
  HiChevronRight,
  HiRocketLaunch,
  HiCog6Tooth,
  HiDocumentCheck,
  HiShieldCheck,
  HiServerStack,
  HiBeaker,
} from 'react-icons/hi2';

type TimelineItemStatus = 'completed' | 'current' | 'pending' | 'error' | 'milestone';

type TimelineIcon =
  | 'check'
  | 'clock'
  | 'error'
  | 'spinner'
  | 'star'
  | 'arrow'
  | 'rocket'
  | 'cog'
  | 'document'
  | 'shield'
  | 'server'
  | 'beaker';

interface TimelineItemProps {
  /** Content displayed at the start position (left for vertical, top for horizontal) */
  start?: React.ReactNode;
  /** Content displayed at the end position (right for vertical, bottom for horizontal) */
  end?: React.ReactNode;
  /** Icon to display in the middle */
  icon?: TimelineIcon;
  /** Status affects the icon and line colors */
  status?: TimelineItemStatus;
  /** Whether this item has a connecting line to the next item */
  hasLine?: boolean;
  /** Custom className for the timeline-box */
  boxClassName?: string;
}

const iconMap: Record<TimelineIcon, React.ComponentType<{ className?: string }>> = {
  check: HiCheckCircle,
  clock: HiClock,
  error: HiXCircle,
  spinner: HiArrowPath,
  star: HiStar,
  arrow: HiChevronRight,
  rocket: HiRocketLaunch,
  cog: HiCog6Tooth,
  document: HiDocumentCheck,
  shield: HiShieldCheck,
  server: HiServerStack,
  beaker: HiBeaker,
};

const statusConfig: Record<TimelineItemStatus, { iconClass: string; lineClass: string; defaultIcon: TimelineIcon }> = {
  completed: {
    iconClass: 'text-success',
    lineClass: 'bg-success',
    defaultIcon: 'check',
  },
  current: {
    iconClass: 'text-primary',
    lineClass: 'bg-primary',
    defaultIcon: 'spinner',
  },
  pending: {
    iconClass: 'text-base-content/40',
    lineClass: 'bg-base-300',
    defaultIcon: 'clock',
  },
  error: {
    iconClass: 'text-error',
    lineClass: 'bg-error',
    defaultIcon: 'error',
  },
  milestone: {
    iconClass: 'text-warning',
    lineClass: 'bg-warning',
    defaultIcon: 'star',
  },
};

export function TimelineItem({
  start,
  end,
  icon,
  status = 'completed',
  hasLine = true,
  boxClassName = '',
}: TimelineItemProps) {
  const config = statusConfig[status];
  const IconComponent = iconMap[icon || config.defaultIcon];

  return (
    <li>
      {start && (
        <div className="timeline-start timeline-box border-base-200 bg-base-100">
          {start}
        </div>
      )}
      <div className="timeline-middle">
        <IconComponent
          className={`w-5 h-5 ${config.iconClass} ${status === 'current' ? 'animate-spin' : ''}`}
        />
      </div>
      {end && (
        <div className={`timeline-end timeline-box border-base-200 bg-base-100 ${boxClassName}`}>
          {end}
        </div>
      )}
      {hasLine && <hr className={config.lineClass} />}
    </li>
  );
}

interface DaisyTimelineProps {
  /** Timeline orientation */
  variant?: 'vertical' | 'horizontal';
  /** Whether to snap timeline items (for horizontal) */
  snap?: boolean;
  /** Whether to use compact styling */
  compact?: boolean;
  /** Optional title */
  title?: string;
  /** Children must be TimelineItem components */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

export function DaisyTimeline({
  variant = 'vertical',
  snap = false,
  compact = false,
  title,
  children,
  className = '',
}: DaisyTimelineProps) {
  const orientationClass = variant === 'vertical' ? 'timeline-vertical' : 'timeline-horizontal';
  const snapClass = snap ? 'timeline-snap-icon' : '';
  const compactClass = compact ? 'timeline-compact' : '';

  return (
    <div className={`my-6 not-prose ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-base-content mb-4">{title}</h3>
      )}
      <ul className={`timeline ${orientationClass} ${snapClass} ${compactClass}`.trim()}>
        {children}
      </ul>
    </div>
  );
}

// =============================================================================
// Simplified API for common use cases
// =============================================================================

interface SimpleTimelineItem {
  /** Date or phase label */
  label?: string;
  /** Main title */
  title: string;
  /** Description text */
  description?: string;
  /** Status of this item */
  status?: TimelineItemStatus;
  /** Custom icon */
  icon?: TimelineIcon;
}

interface SimpleTimelineProps {
  /** Array of timeline items */
  items: SimpleTimelineItem[];
  /** Timeline orientation */
  variant?: 'vertical' | 'horizontal';
  /** Optional title */
  title?: string;
  /** Whether to alternate content sides (only for vertical) */
  alternate?: boolean;
  /** Additional className */
  className?: string;
}

export function SimpleTimeline({
  items,
  variant = 'vertical',
  title,
  alternate = false,
  className = '',
}: SimpleTimelineProps) {
  const orientationClass = variant === 'vertical' ? 'timeline-vertical' : 'timeline-horizontal';

  return (
    <div className={`my-6 not-prose ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-base-content mb-4">{title}</h3>
      )}
      <ul className={`timeline ${orientationClass}`}>
        {items.map((item, index) => {
          const config = statusConfig[item.status || 'completed'];
          const IconComponent = iconMap[item.icon || config.defaultIcon];
          const isLast = index === items.length - 1;
          const isEven = index % 2 === 0;

          // For alternating layout
          const startContent = alternate && !isEven ? (
            <div className="text-base-content/60 text-sm">{item.label}</div>
          ) : alternate && isEven ? (
            <div>
              <div className="font-semibold text-base-content">{item.title}</div>
              {item.description && (
                <div className="text-sm text-base-content/70 mt-1">{item.description}</div>
              )}
            </div>
          ) : item.label ? (
            <div className="text-base-content/60 text-sm">{item.label}</div>
          ) : null;

          const endContent = alternate && !isEven ? (
            <div>
              <div className="font-semibold text-base-content">{item.title}</div>
              {item.description && (
                <div className="text-sm text-base-content/70 mt-1">{item.description}</div>
              )}
            </div>
          ) : alternate && isEven ? (
            <div className="text-base-content/60 text-sm">{item.label}</div>
          ) : (
            <div>
              <div className="font-semibold text-base-content">{item.title}</div>
              {item.description && (
                <div className="text-sm text-base-content/70 mt-1">{item.description}</div>
              )}
            </div>
          );

          return (
            <li key={index}>
              {startContent && (
                <div className="timeline-start timeline-box border-base-200 bg-base-100">
                  {startContent}
                </div>
              )}
              <div className="timeline-middle">
                <IconComponent
                  className={`w-5 h-5 ${config.iconClass} ${item.status === 'current' ? 'animate-spin' : ''}`}
                />
              </div>
              <div className="timeline-end timeline-box border-base-200 bg-base-100">
                {endContent}
              </div>
              {!isLast && <hr className={config.lineClass} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// =============================================================================
// Process Flow Timeline - For showing sequential processes/pipelines
// =============================================================================

interface ProcessStep {
  /** Step name/phase */
  name: string;
  /** Step description */
  description?: string;
  /** Step status */
  status?: TimelineItemStatus;
  /** Custom icon */
  icon?: TimelineIcon;
  /** Duration or time estimate */
  duration?: string;
}

interface ProcessTimelineProps {
  /** Array of process steps */
  steps: ProcessStep[];
  /** Optional title */
  title?: string;
  /** Orientation */
  variant?: 'vertical' | 'horizontal';
  /** Additional className */
  className?: string;
}

export function ProcessTimeline({
  steps,
  title,
  variant = 'horizontal',
  className = '',
}: ProcessTimelineProps) {
  const orientationClass = variant === 'vertical' ? 'timeline-vertical' : 'timeline-horizontal';

  return (
    <div className={`my-6 not-prose ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-base-content mb-4">{title}</h3>
      )}
      <div className={variant === 'horizontal' ? 'overflow-x-auto' : ''}>
        <ul className={`timeline ${orientationClass}`}>
          {steps.map((step, index) => {
            const config = statusConfig[step.status || 'completed'];
            const IconComponent = iconMap[step.icon || config.defaultIcon];
            const isLast = index === steps.length - 1;

            return (
              <li key={index}>
                {step.duration && (
                  <div className="timeline-start text-xs text-base-content/50">
                    {step.duration}
                  </div>
                )}
                <div className="timeline-middle">
                  <IconComponent
                    className={`w-5 h-5 ${config.iconClass} ${step.status === 'current' ? 'animate-spin' : ''}`}
                  />
                </div>
                <div className="timeline-end timeline-box border-base-200 bg-base-100">
                  <div className="font-semibold text-base-content">{step.name}</div>
                  {step.description && (
                    <div className="text-sm text-base-content/70 mt-1">{step.description}</div>
                  )}
                </div>
                {!isLast && <hr className={config.lineClass} />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default DaisyTimeline;
