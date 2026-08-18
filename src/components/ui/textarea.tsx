import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex min-h-[88px] w-full rounded-xl border border-[#0B1220]/12 bg-white px-3.5 py-2.5 text-sm text-[#0B1220] shadow-sm transition',
        'placeholder:text-[#94A3B8]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38b6ff]/50 focus-visible:border-[#38b6ff]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

export { Textarea };
