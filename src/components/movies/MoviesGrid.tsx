import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function MoviesGrid({ children }: Props) {
  return (
    <div
      className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {children}
    </div>
  );
}
