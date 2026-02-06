'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

export type MediaCarouselItem =
  | {
      type: 'video';
      src: string;
      title?: string;
      subtitle?: string;
      poster?: string;
    }
  | {
      type: 'image';
      src: string;
      alt: string;
      title?: string;
      subtitle?: string;
    };

function clampIndex(idx: number, length: number) {
  if (length <= 0) return 0;
  return ((idx % length) + length) % length;
}

export function MediaCarousel({
  items,
  className = '',
  autoAdvanceMs = 6500,
  heightClass = 'h-48 sm:h-56 lg:h-64',
}: {
  items: MediaCarouselItem[];
  className?: string;
  autoAdvanceMs?: number;
  heightClass?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const safeItems = useMemo(() => items.filter(Boolean), [items]);

  useEffect(() => {
    if (safeItems.length === 0) return;
    setActiveIndex((prev) => clampIndex(prev, safeItems.length));
  }, [safeItems.length]);

  useEffect(() => {
    if (safeItems.length <= 1) return;
    if (isPaused) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => clampIndex(prev + 1, safeItems.length));
    }, autoAdvanceMs);

    return () => window.clearInterval(id);
  }, [autoAdvanceMs, isPaused, safeItems.length]);

  useEffect(() => {
    // Only the active slide's video should play; pause everything else.
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex) {
        // Attempt autoplay; this will succeed because videos are muted.
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex]);

  if (safeItems.length === 0) return null;

  const goPrev = () => setActiveIndex((prev) => clampIndex(prev - 1, safeItems.length));
  const goNext = () => setActiveIndex((prev) => clampIndex(prev + 1, safeItems.length));

  return (
    <section
      className={[
        'relative overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200',
        className,
      ].join(' ')}
      aria-label="Promotional media carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className={['relative', heightClass].join(' ')}>
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {safeItems.map((item, idx) => (
            <div key={idx} className="relative h-full w-full flex-none">
              {item.type === 'video' ? (
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  className="h-full w-full object-cover"
                  src={item.src}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={item.title ?? `Carousel video ${idx + 1}`}
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
              {(item.title || item.subtitle) && (
                <div className="absolute left-4 top-4 right-14 sm:left-6 sm:top-6">
                  {item.title && (
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white drop-shadow">
                      {item.title}
                    </h2>
                  )}
                  {item.subtitle && (
                    <p className="mt-1 text-sm sm:text-base text-white/90 drop-shadow">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        {safeItems.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow px-3 py-2 backdrop-blur transition"
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow px-3 py-2 backdrop-blur transition"
              aria-label="Next slide"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {safeItems.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
          {safeItems.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={[
                'h-2.5 w-2.5 rounded-full transition',
                idx === activeIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80',
              ].join(' ')}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === activeIndex}
            />
          ))}
        </div>
      )}
    </section>
  );
}

