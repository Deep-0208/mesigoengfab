'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowCounterClockwise, Pause, Play } from '@phosphor-icons/react/dist/ssr';

type Status = 'idle' | 'playing' | 'paused' | 'ended' | 'error';

type Props = {
  src: string;
  poster: string;
  /** Final assembled frame: shown for reduced motion and if playback fails. */
  assembledPoster: string;
  describedBy: string;
};

const fmt = (s: number) => `0:${String(Math.floor(s)).padStart(2, '0')}`;

/**
 * Plays the screw conveyor assembly once when the section is on screen and stops
 * on the finished machine (no loop: looping would snap from assembled back to
 * exploded). Nothing is downloaded until the section approaches the viewport.
 * Reduced-motion users get the assembled still and a play button instead of autoplay.
 */
export function AssemblyVideo({ src, poster, assembledPoster, describedBy }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const autoPausedRef = useRef(false);
  const autoplayTriedRef = useRef(false);

  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Start fetching the video shortly before it scrolls into view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Autoplay once when at least half the video is visible; pause when it leaves, resume on return.
  useEffect(() => {
    const el = wrapRef.current;
    const video = videoRef.current;
    if (!el || !video || !load) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!autoplayTriedRef.current && !reducedMotion) {
            autoplayTriedRef.current = true;
            video.play().catch(() => setAutoplayBlocked(true));
          } else if (autoPausedRef.current) {
            autoPausedRef.current = false;
            video.play().catch(() => setStatus('paused'));
          }
        } else if (!video.paused) {
          autoPausedRef.current = true;
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load, reducedMotion]);

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    if (barRef.current) barRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
    if (timeRef.current) timeRef.current.textContent = `${fmt(v.currentTime)} / ${fmt(v.duration)}`;
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    autoPausedRef.current = false;
    autoplayTriedRef.current = true;
    if (status === 'playing') {
      v.pause();
      return;
    }
    if (status === 'ended') v.currentTime = 0;
    // The source is attached as soon as this block nears the viewport, so it is
    // always present by the time a visitor can reach the button.
    v.play().catch(() => setStatus('error'));
  };

  const label =
    status === 'playing' ? 'Pause assembly video' : status === 'ended' ? 'Replay assembly video' : 'Play assembly video';
  const Icon = status === 'playing' ? Pause : status === 'ended' ? ArrowCounterClockwise : Play;
  const showOverlay = status === 'idle' && (reducedMotion || autoplayBlocked);

  return (
    <div>
      <div ref={wrapRef} className="relative aspect-video w-full overflow-hidden bg-studio">
        {status === 'error' ? (
          // eslint-disable-next-line @next/next/no-img-element -- static fallback frame, sized by the aspect box
          <img
            src={assembledPoster}
            alt="Assembled stainless steel screw conveyor with inlet hopper, bolted cover and blue geared motor drive"
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-contain"
            // Poster waits with the video until the section is near, so it never competes with the hero image.
            poster={load ? (reducedMotion ? assembledPoster : poster) : undefined}
            muted
            playsInline
            preload={load ? 'auto' : 'none'}
            disableRemotePlayback
            aria-label="Animation: an industrial screw conveyor assembling from its separate components"
            aria-describedby={describedBy}
            onPlay={() => setStatus('playing')}
            onPause={() => setStatus((s) => (s === 'ended' ? s : 'paused'))}
            onEnded={() => setStatus('ended')}
            onError={() => setStatus('error')}
            onTimeUpdate={onTimeUpdate}
          >
            {load && <source src={src} type="video/mp4" onError={() => setStatus('error')} />}
            Your browser cannot play this video. <a href={src}>Download the assembly video (MP4)</a>.
          </video>
        )}

        {showOverlay && (
          <button
            type="button"
            onClick={toggle}
            aria-label="Play assembly video"
            className="absolute right-4 bottom-4 inline-flex min-h-12 items-center gap-2.5 rounded-sm bg-base/90 px-5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-on-accent"
          >
            <Play size={16} weight="fill" aria-hidden />
            Play assembly
          </button>
        )}
      </div>

      {status === 'error' ? (
        <p role="status" className="px-5 py-4 text-sm text-muted">
          The assembly video could not be played in this browser, so the finished machine is shown instead.
        </p>
      ) : (
        <div className="flex items-center gap-4 border-t border-line px-5 py-3 sm:gap-5 sm:px-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={label}
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-sm border border-edge text-ink transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-on-accent"
          >
            <Icon size={18} weight="fill" aria-hidden />
          </button>
          <span aria-hidden className="relative h-px flex-1 bg-steel">
            <span
              ref={barRef}
              className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-200 ease-linear"
              style={{ height: 2, top: -0.5 }}
            />
          </span>
          <span ref={timeRef} aria-hidden className="shrink-0 font-mono text-xs whitespace-nowrap text-subtle tabular-nums">
            0:00 / 0:10
          </span>
        </div>
      )}
    </div>
  );
}
