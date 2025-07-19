import type { ReactNode } from 'react';

export default function GlassCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-xl backdrop-blur-md bg-white/60 transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute -inset-1 bg-gradient-to-tr from-blue-300/40 via-purple-300/30 to-pink-300/40 blur-2xl pointer-events-none" />
      <div className="relative p-6">{children}</div>
    </div>
  );
}
