'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function Avatar({
  className,
  children,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full border-2 border-white bg-muted',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function AvatarImage({
  className,
  alt = '',
  ...props
}: React.ComponentProps<'img'>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('aspect-square size-full object-cover', className)} alt={alt} {...props} />
  );
}

export function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'flex size-full items-center justify-center bg-[#E8F4FC] text-[10px] font-semibold text-[var(--brand-azure-deep)]',
        className
      )}
      {...props}
    />
  );
}
