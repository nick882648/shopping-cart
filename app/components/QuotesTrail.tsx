'use client';

import React, { useMemo } from 'react';

type QuoteItem = {
  text: string;
  by?: string;
};

export function QuotesTrail({
  quotes,
  className = '',
  secondsPerLoop = 22,
}: {
  quotes: QuoteItem[];
  className?: string;
  secondsPerLoop?: number;
}) {
  const safeQuotes = useMemo(
    () => (Array.isArray(quotes) ? quotes.filter((q) => q?.text) : []),
    [quotes]
  );

  if (safeQuotes.length === 0) return null;

  // Duplicate content to create a seamless loop.
  const loopQuotes = [...safeQuotes, ...safeQuotes];

  return (
    <section
      className={[
        'relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ring-1 ring-gray-200',
        className,
      ].join(' ')}
      aria-label="Promotional quotes"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_60%)]" />

      <div className="relative py-4">
        <div
          className="quotesTrail-track flex w-max items-center gap-10 px-6"
          style={{ ['--trail-duration' as any]: `${secondsPerLoop}s` }}
        >
          {loopQuotes.map((q, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 whitespace-nowrap text-white/95"
            >
              <span className="text-white/60">“</span>
              <span className="text-sm sm:text-base lg:text-lg font-semibold">
                {q.text}
              </span>
              <span className="text-white/60">”</span>
              {q.by && (
                <span className="text-xs sm:text-sm text-white/70">— {q.by}</span>
              )}
              <span className="h-2 w-2 rounded-full bg-white/25" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .quotesTrail-track {
          animation: quotesTrailScroll var(--trail-duration) linear infinite;
          will-change: transform;
        }

        @keyframes quotesTrailScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .quotesTrail-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

