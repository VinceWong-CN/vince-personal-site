'use client';

import { useRef, type PointerEvent as ReactPointerEvent } from 'react';

export default function DragFilmstrip({ images }: { images: string[][] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ id: -1, start: 0, scroll: 0 });
  const onDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current = { id: event.pointerId, start: event.clientX, scroll: track.scrollLeft };
    track.setPointerCapture(event.pointerId);
    track.dataset.dragging = 'true';
  };
  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (track && drag.current.id === event.pointerId) track.scrollLeft = drag.current.scroll - (event.clientX - drag.current.start) * 1.25;
  };
  const onUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || drag.current.id !== event.pointerId) return;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    track.dataset.dragging = 'false'; drag.current.id = -1;
  };
  return <div className="filmstrip" ref={trackRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} aria-label="可横向拖动查看《我的老板10后》项目影像">
    {images.map(([src, alt], index) => <figure key={src}><span>0{index + 1}</span><img src={src} alt={alt} loading="lazy" draggable={false} /></figure>)}
  </div>;
}
