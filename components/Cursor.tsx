'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rx = useRef(0); const ry = useRef(0);
  const mx = useRef(0); const my = useRef(0);
  const visible = useRef(false);

  useEffect(() => {
    // Jangan tampilkan cursor di touch device
    if (window.matchMedia('(hover: none)').matches) return;

    const show = () => {
      if (!visible.current) {
        visible.current = true;
        dotRef.current?.style.setProperty('opacity', '1');
        ringRef.current?.style.setProperty('opacity', '1');
      }
    };

    const move = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      show();
    };

    const reset = () => ringRef.current?.classList.remove('active');

    document.addEventListener('mousemove', move);
    document.addEventListener('click',     reset);
    document.addEventListener('mousedown', reset);

    // Event delegation untuk hover
    document.addEventListener('mouseover', (e) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [data-cursor]')) {
        ringRef.current?.classList.add('active');
      } else {
        ringRef.current?.classList.remove('active');
      }
    });

    // Hide saat mouse keluar window
    document.addEventListener('mouseleave', () => {
      dotRef.current?.style.setProperty('opacity', '0');
      ringRef.current?.style.setProperty('opacity', '0');
      visible.current = false;
    });
    document.addEventListener('mouseenter', show);

    let raf: number;
    const tick = () => {
      rx.current += (mx.current - rx.current) * 0.35;
      ry.current += (my.current - ry.current) * 0.35;
      if (dotRef.current) {
        dotRef.current.style.left = mx.current + 'px';
        dotRef.current.style.top  = my.current + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + 'px';
        ringRef.current.style.top  = ry.current + 'px';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('click',     reset);
      document.removeEventListener('mousedown', reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
    </>
  );
}