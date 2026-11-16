'use client';

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { gsap } from 'gsap';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function SwingingBadge() {
  const stageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    velocityX: 0,
    velocityY: 0,
  });
  const reduceMotionRef = useRef(false);
  const idleTweenRef = useRef<gsap.core.Animation | null>(null);
  const quickXRef = useRef<((value: number) => void) | null>(null);
  const quickYRef = useRef<((value: number) => void) | null>(null);
  const quickRotationRef = useRef<((value: number) => void) | null>(null);

  const startIdle = () => {
    const badge = badgeRef.current;
    if (!badge || reduceMotionRef.current) return;
    idleTweenRef.current?.kill();
    idleTweenRef.current = gsap.timeline({ repeat: -1, delay: .35 })
      .to(badge, { x: 4, y: -3, rotation: .5, duration: 2.8, ease: 'sine.inOut', transformOrigin: '50% 3%' })
      .to(badge, { x: -3, y: 2, rotation: -1.8, duration: 3.4, ease: 'sine.inOut' })
      .to(badge, { x: 2, y: 0, rotation: .7, duration: 2.6, ease: 'sine.inOut' });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduceMotionRef.current = mediaQuery.matches;
    const badge = badgeRef.current;
    if (!badge) return;

    gsap.set(badge, { rotation: -2.2, transformOrigin: '50% 3%' });
    quickXRef.current = gsap.quickTo(badge, 'x', { duration: .38, ease: 'power3.out' });
    quickYRef.current = gsap.quickTo(badge, 'y', { duration: .38, ease: 'power3.out' });
    quickRotationRef.current = gsap.quickTo(badge, 'rotation', { duration: .42, ease: 'power3.out' });
    startIdle();

    const onMotionChange = (event: MediaQueryListEvent) => {
      reduceMotionRef.current = event.matches;
      idleTweenRef.current?.kill();
      if (event.matches) gsap.set(badge, { x: 0, y: 0, rotation: 0 });
      else startIdle();
    };
    mediaQuery.addEventListener('change', onMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', onMotionChange);
      idleTweenRef.current?.kill();
      gsap.killTweensOf(badge);
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    idleTweenRef.current?.kill();
    gsap.killTweensOf(badgeRef.current);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: 0,
      y: 0,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
      velocityX: 0,
      velocityY: 0,
    };
    event.currentTarget.dataset.dragging = 'true';
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const badge = badgeRef.current;
    const stage = stageRef.current;
    if (!badge || !stage) return;
    const drag = dragRef.current;

    if (drag.pointerId === event.pointerId) {
      const now = performance.now();
      const elapsed = Math.max(16, now - drag.lastTime);
      drag.x = clamp(event.clientX - drag.startX, -150, 150);
      drag.y = clamp(event.clientY - drag.startY, -80, 110);
      drag.velocityX = ((event.clientX - drag.lastX) / elapsed) * 16;
      drag.velocityY = ((event.clientY - drag.lastY) / elapsed) * 16;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.lastTime = now;
      gsap.set(badge, {
        x: drag.x,
        y: drag.y,
        rotation: clamp(drag.x * 0.035 + drag.velocityX * 0.65, -9, 9),
      });
      return;
    }

    if (reduceMotionRef.current) return;
    const rect = stage.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
    const y = clamp((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);
    quickXRef.current?.(x * 62);
    quickYRef.current?.(y * 42);
    quickRotationRef.current?.(x * 7 - 1.1);
  };

  const handlePointerEnter = () => {
    if (reduceMotionRef.current || dragRef.current.pointerId !== -1) return;
    idleTweenRef.current?.kill();
  };

  const releaseBadge = (event: ReactPointerEvent<HTMLDivElement>) => {
    const badge = badgeRef.current;
    const drag = dragRef.current;
    if (!badge || drag.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = 'false';
    drag.pointerId = -1;

    if (reduceMotionRef.current) {
      gsap.set(badge, { x: 0, y: 0, rotation: 0 });
      return;
    }

    const inertiaX = clamp(drag.x + drag.velocityX * 8, -175, 175);
    const inertiaY = clamp(drag.y + drag.velocityY * 5, -95, 125);
    const inertiaRotation = clamp(drag.velocityX * 1.25 + drag.x * 0.025, -12, 12);

    gsap.timeline({ onComplete: startIdle })
      .to(badge, { x: inertiaX, y: inertiaY, rotation: inertiaRotation, duration: 0.18, ease: 'power2.out' })
      .to(badge, { x: 0, y: 0, rotation: -1.1, duration: .72, ease: 'expo.out' });
  };

  const handlePointerLeave = () => {
    const badge = badgeRef.current;
    if (!badge || dragRef.current.pointerId !== -1 || reduceMotionRef.current) return;
    gsap.to(badge, {
      x: 0,
      y: 0,
      rotation: -1.1,
      duration: 0.65,
      ease: 'expo.out',
      onComplete: startIdle,
    });
  };

  return (
    <div
      className="badge-stage"
      ref={stageRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className="swinging-badge"
        ref={badgeRef}
        role="img"
        aria-label="黄威的卡通形象从工牌窗口探出，望向左侧文字"
        onPointerDown={handlePointerDown}
        onPointerUp={releaseBadge}
        onPointerCancel={releaseBadge}
      >
        <img src="/media/vince-window-character.png" alt="" draggable={false} />
      </div>
    </div>
  );
}
