'use client';

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';

export default function DragFilmstrip({ images }: { images: string[][] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ id: -1, start: 0, scroll: 0, lastX: 0, lastTime: 0, velocity: 0 });
  const inertiaRef = useRef(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const updateFocus = () => {
      const center = track.getBoundingClientRect().left + track.clientWidth / 2;
      track.querySelectorAll('figure').forEach((figure) => {
        const rect = figure.getBoundingClientRect();
        figure.classList.toggle('is-focused', Math.abs(rect.left + rect.width / 2 - center) < rect.width * .62);
      });
    };
    updateFocus();
    track.addEventListener('scroll', updateFocus, { passive: true });
    return () => { track.removeEventListener('scroll', updateFocus); cancelAnimationFrame(inertiaRef.current); };
  }, []);
  const onDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const track = trackRef.current;
    if (!track) return;
    cancelAnimationFrame(inertiaRef.current);
    drag.current = { id: event.pointerId, start: event.clientX, scroll: track.scrollLeft, lastX: event.clientX, lastTime: performance.now(), velocity: 0 };
    track.setPointerCapture(event.pointerId);
    track.dataset.dragging = 'true';
  };
  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (track && drag.current.id === event.pointerId) {
      const now = performance.now();
      const elapsed = Math.max(16, now - drag.current.lastTime);
      drag.current.velocity = ((drag.current.lastX - event.clientX) / elapsed) * 16;
      drag.current.lastX = event.clientX;
      drag.current.lastTime = now;
      track.scrollLeft = drag.current.scroll - (event.clientX - drag.current.start) * 1.08;
    }
  };
  const stopDrag = (event: ReactPointerEvent<HTMLDivElement>, useInertia: boolean) => {
    const track = trackRef.current;
    if (!track || drag.current.id !== event.pointerId) return;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    track.dataset.dragging = 'false'; drag.current.id = -1;
    if (!useInertia || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let velocity = drag.current.velocity * 1.08;
    const glide = () => {
      track.scrollLeft += velocity;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if ((track.scrollLeft <= 0 && velocity < 0) || (track.scrollLeft >= maxScroll && velocity > 0)) velocity = 0;
      velocity *= .92;
      if (Math.abs(velocity) > .25) inertiaRef.current = requestAnimationFrame(glide);
    };
    inertiaRef.current = requestAnimationFrame(glide);
  };
  const onUp = (event: ReactPointerEvent<HTMLDivElement>) => stopDrag(event, true);
  const onCancel = (event: ReactPointerEvent<HTMLDivElement>) => stopDrag(event, false);
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
    event.preventDefault();
    track.scrollBy({ left: (event.key === 'ArrowRight' ? 1 : -1) * track.clientWidth * .55, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return <div className="filmstrip" ref={trackRef} tabIndex={0} onKeyDown={onKeyDown} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onCancel} aria-label="可横向拖动或使用左右方向键查看《我的老板10后》项目影像">
    {images.map(([src, alt], index) => <figure key={src}><span>0{index + 1}</span><img src={src} alt={alt} loading="lazy" draggable={false} /></figure>)}
  </div>;
}
