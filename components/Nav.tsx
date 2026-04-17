'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const links = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 transition-all duration-500
        ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-[#1e1e1e]' : ''}`}
    >
      {/* Logo */}
      <a href="#hero" className="relative group block">

  {/* Glow hover tetap pakai div tapi hanya drop-shadow */}
  <motion.div
    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    style={{ filter: 'blur(12px)', background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)' }}
  />

  {/* Shimmer langsung pada image via filter brightness */}
  <motion.div className="relative z-10">
    <Image
      src="/logo.png"
      alt="Ardha Putra"
      width={52}
      height={52}
      className="object-contain"
      priority
    />
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'linear-gradient(105deg, transparent 20%, rgba(255,220,100,0.9) 50%, transparent 80%)',
        backgroundSize: '300% 100%',
        mixBlendMode: 'overlay',
        WebkitMaskImage: 'url(/logo.png)',
        WebkitMaskSize: '52px 52px',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskImage: 'url(/logo.png)',
        maskSize: '52px 52px',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
      animate={{ backgroundPosition: ['300% 0', '-300% 0'] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
    />
  </motion.div>

</a>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-10">
        {links.map(l => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-soft hover:text-gold transition-colors duration-250 relative group"
            >
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="mailto:ardanov96@gmail.com"
        className="hidden md:inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.15em] uppercase
          px-5 py-2.5 border border-[#333] text-soft hover:border-gold hover:text-gold transition-all duration-300"
      >
        Hire me
      </a>

      {/* Mobile burger */}
      <button onClick={() => setOpen(o => !o)} className="md:hidden flex flex-col gap-1.5 p-2">
        <span className={`block w-6 h-px bg-gold transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-4 h-px bg-gold transition-all ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-px bg-gold transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-[#1e1e1e] p-8 flex flex-col gap-6 md:hidden"
          >
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                className="font-mono text-sm tracking-[0.2em] uppercase text-light hover:text-gold transition-colors">
                {l}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
