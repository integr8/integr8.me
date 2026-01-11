import React from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: React.ReactNode;
}

const typeStyles = {
  info: {
    bg: 'bg-info/10',
    border: 'border-info',
    icon: '💡',
    title: 'Informação',
  },
  warning: {
    bg: 'bg-warning/10',
    border: 'border-warning',
    icon: '⚠️',
    title: 'Atenção',
  },
  success: {
    bg: 'bg-success/10',
    border: 'border-success',
    icon: '✅',
    title: 'Sucesso',
  },
  error: {
    bg: 'bg-error/10',
    border: 'border-error',
    icon: '❌',
    title: 'Erro',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = typeStyles[type];

  return (
    <div className={`${styles.bg} border-l-4 ${styles.border} my-6 rounded-r-lg p-4`}>
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <span>{styles.icon}</span>
        <span>{title || styles.title}</span>
      </div>
      <div className="text-base-content/80">{children}</div>
    </div>
  );
}

export default Callout;
