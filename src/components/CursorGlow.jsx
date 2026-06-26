import { useEffect, useRef, useCallback } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const ringPosRef = useRef({ x: 0, y: 0 });
  const dotPosRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const isTouchRef = useRef(false);

  const animate = useCallback(() => {
    // Ring trailing (slower lerp)
    ringPosRef.current.x += (targetRef.current.x - ringPosRef.current.x) * 0.12;
    ringPosRef.current.y += (targetRef.current.y - ringPosRef.current.y) * 0.12;

    // Dot responsive (faster lerp)
    dotPosRef.current.x += (targetRef.current.x - dotPosRef.current.x) * 0.45;
    dotPosRef.current.y += (targetRef.current.y - dotPosRef.current.y) * 0.45;

    if (glowRef.current) {
      glowRef.current.style.left = ringPosRef.current.x + 'px';
      glowRef.current.style.top = ringPosRef.current.y + 'px';
    }
    if (ringRef.current) {
      ringRef.current.style.left = ringPosRef.current.x + 'px';
      ringRef.current.style.top = ringPosRef.current.y + 'px';
    }
    if (dotRef.current) {
      dotRef.current.style.left = dotPosRef.current.x + 'px';
      dotRef.current.style.top = dotPosRef.current.y + 'px';
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => { isTouchRef.current = true; };
    window.addEventListener('touchstart', checkTouch, { once: true, passive: true });

    const onMove = (e) => {
      if (isTouchRef.current) return;
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      if (glowRef.current && !glowRef.current.classList.contains('visible')) {
        glowRef.current.classList.add('visible');
      }
      if (ringRef.current && !ringRef.current.classList.contains('visible')) {
        ringRef.current.classList.add('visible');
      }
      if (dotRef.current && !dotRef.current.classList.contains('visible')) {
        dotRef.current.classList.add('visible');
      }
    };

    const onOver = (e) => {
      if (isTouchRef.current) return;
      const el = e.target.closest('a, button, .project-card-clickable, .blog-card, .testimonial-card, .magnetic-btn, input, textarea, .skill-card');
      if (el) {
        if (dotRef.current) dotRef.current.classList.add('hovering');
        if (ringRef.current) ringRef.current.classList.add('hovering');
      }
    };

    const onOut = (e) => {
      if (isTouchRef.current) return;
      const el = e.target.closest('a, button, .project-card-clickable, .blog-card, .testimonial-card, .magnetic-btn, input, textarea, .skill-card');
      if (el) {
        if (dotRef.current) dotRef.current.classList.remove('hovering');
        if (ringRef.current) ringRef.current.classList.remove('hovering');
      }
    };

    const onLeave = () => {
      if (glowRef.current) glowRef.current.classList.remove('visible');
      if (ringRef.current) ringRef.current.classList.remove('visible');
      if (dotRef.current) dotRef.current.classList.remove('visible');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('touchstart', checkTouch);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // Don't render on small screens (likely touch)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div ref={glowRef} className="cursor-glow-component" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring-component" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot-component" aria-hidden="true" />
    </>
  );
}
