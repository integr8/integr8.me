import React from 'react';
import { FiArrowRight, FiMail, FiCalendar, FiMessageCircle } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

interface SolutionCTAProps {
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  variant?: 'default' | 'minimal' | 'highlight';
}

export function SolutionCTA({
  title = 'Pronto para transformar sua operação?',
  description = 'Agende uma conversa com nossos especialistas e descubra como podemos ajudar sua empresa.',
  primaryAction = { label: 'Fale Conosco', href: '/ptbr/contato' },
  secondaryAction,
  variant = 'default',
}: SolutionCTAProps) {
  if (variant === 'minimal') {
    return (
      <div className="my-12 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <h3 className="mb-3 text-2xl font-bold text-base-content">{title}</h3>
        <p className="mb-6 text-base-content/70">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={primaryAction.href} className="btn btn-primary gap-2">
            {primaryAction.label}
            <FiArrowRight className="h-4 w-4" />
          </a>
          {secondaryAction && (
            <a href={secondaryAction.href} className="btn btn-outline gap-2">
              {secondaryAction.label}
            </a>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'highlight') {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-20">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
            <HiSparkles className="h-8 w-8" />
          </div>

          <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">{title}</h2>
          <p className="mb-8 text-lg text-white/80">{description}</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={primaryAction.href}
              className="btn btn-lg gap-2 border-0 bg-white text-primary shadow-xl hover:bg-white/90"
            >
              <FiMail className="h-5 w-5" />
              {primaryAction.label}
            </a>
            {secondaryAction && (
              <a
                href={secondaryAction.href}
                className="btn btn-outline btn-lg gap-2 border-white/30 text-white hover:border-white/50 hover:bg-white/10"
              >
                <FiCalendar className="h-5 w-5" />
                {secondaryAction.label}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section className="relative my-16 overflow-hidden">
      <div className="relative rounded-3xl border border-base-200 bg-gradient-to-br from-base-100 via-base-100 to-primary/5 p-8 lg:p-12">
        {/* Background decorations */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr from-secondary/10 to-primary/10 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          {/* Content */}
          <div>
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
              <FiMessageCircle className="h-7 w-7" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-base-content lg:text-4xl">{title}</h2>
            <p className="text-lg text-base-content/70">{description}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <a
              href={primaryAction.href}
              className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl"
            >
              {primaryAction.label}
              <FiArrowRight className="h-5 w-5" />
            </a>
            {secondaryAction && (
              <a href={secondaryAction.href} className="btn btn-outline btn-lg gap-2">
                {secondaryAction.label}
              </a>
            )}

            {/* Trust indicators */}
            <div className="mt-4 flex items-center gap-4 text-sm text-base-content/50">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-success" />
                Resposta em 24h
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-success" />
                Sem compromisso
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SolutionCTA;
