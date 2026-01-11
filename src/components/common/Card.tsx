import React from 'react';
import { classNames } from '@lib/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className, hoverable = true }: CardProps) {
  return (
    <div
      className={classNames(
        'card bg-base-100 shadow-lg',
        hoverable && 'transition-shadow duration-300 hover:shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={classNames('card-body', className)}>{children}</div>;
}

export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CardImage({ src, alt, className }: CardImageProps) {
  return (
    <figure className={classNames('px-10 pt-10', className)}>
      <img src={src} alt={alt} className="h-32 w-32 rounded-lg object-cover" />
    </figure>
  );
}

export interface CardActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function CardActions({ children, className }: CardActionsProps) {
  return <div className={classNames('card-actions justify-end', className)}>{children}</div>;
}
