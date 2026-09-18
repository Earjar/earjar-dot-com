import { useTrail, animated } from '@react-spring/web';
import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import './AudioWaveCursor.css';

const BAR_COUNT = 20;
const TRAIL_COUNT = 6;

const TRAIL_COLORS = [
  'var(--color-ambers)',
  'var(--color-oled)',
  'var(--color-lush)',
  'var(--color-hazy)',
  'var(--color-indigo_bloom)',
];

const fast = { tension: 900, friction: 40 };
const slow = { tension: 200, friction: 30 };

const trans = (x: number, y: number) =>
  `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;

const AudioWaveCursor = () => {
  const [trail, api] = useTrail(TRAIL_COUNT, (i) => ({
    xy: [0, 0] as [number, number],
    config: i === 0 ? fast : slow,
  }));

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const point = 'touches' in e ? e.touches[0] : e;
      if (!point) return;
      api.start({ xy: [point.clientX, point.clientY] });
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [api]);

  return (
    <>
      {trail.map((props, index) =>
        index === 0 ? (
          <animated.div
            key="wave"
            className="audio-wave-ring"
            style={{ transform: props.xy.to(trans) }}
          >
            {Array.from({ length: BAR_COUNT }).map((_, i) => (
              <span
                key={i}
                className="audio-wave-bar"
                style={{
                  '--rot': `${(360 / BAR_COUNT) * i}deg`,
                  '--delay': `${(i / BAR_COUNT) * 1100}ms`,
                } as CSSProperties}
              />
            ))}
          </animated.div>
        ) : (
          <animated.div
            key={index}
            className="audio-wave-trail"
            style={{
              transform: props.xy.to(trans),
              '--t': index,
              '--trail-color': TRAIL_COLORS[(index - 1) % TRAIL_COLORS.length],
            } as unknown as CSSProperties}
          />
        )
      )}
    </>
  );
};

export default AudioWaveCursor;
