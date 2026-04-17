'use client';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 md:px-16 overflow-hidden pt-28 md:pt-0"
    >
      <HeroBackground />

      {/* Orbs */}
      <div
        className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'drift1 12s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[-100px] left-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(76,127,201,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'drift2 15s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
      `}</style>

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full">

        {/* Eyebrow */}
        <motion.div {...fadeUp(0.3)} className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <span className="w-6 md:w-10 h-px bg-gold shrink-0" />
          <span className="font-mono text-[0.55rem] md:text-[0.65rem] tracking-[0.18em] md:tracking-[0.25em] uppercase text-gold leading-relaxed">
            Senior Full Stack Developer · Bali, Indonesia
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.5)}
          className="mb-6 md:mb-10"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5.5vw, 4.8rem)',
            fontWeight: 300,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
          }}
        >
          <span className="text-white block">Turning Ideas Into</span>
          <span className="text-gold-shimmer italic block" style={{ fontWeight: 600 }}>
            Production-Ready
          </span>
          <span className="text-white block">Web Systems.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.7)}
          className="text-soft text-base md:text-lg max-w-xl leading-relaxed mb-8 md:mb-10"
        >
          Engineering scalable digital products — from RESTful APIs to immersive frontends.{' '}
          <span className="text-light">8+ years</span> across FinTech, Hospitality, Logistics & Travel.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.9)} className="flex flex-wrap gap-3 md:gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 md:px-7 py-3 md:py-3.5 bg-gold text-black font-mono text-[0.65rem] md:text-[0.68rem] tracking-[0.12em] uppercase font-medium hover:bg-gold-lt transition-all duration-300 hover:-translate-y-0.5"
            style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            View Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 md:px-7 py-3 md:py-3.5 border border-[#333] text-light font-mono text-[0.65rem] md:text-[0.68rem] tracking-[0.12em] uppercase hover:border-gold hover:text-gold transition-all duration-300"
          >
            Get in Touch
          </a>
          <a
            href="https://github.com/ardanov96"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 md:px-7 py-3 md:py-3.5 border border-[#333] text-soft font-mono text-[0.65rem] md:text-[0.68rem] tracking-[0.12em] uppercase hover:border-gold hover:text-gold transition-all duration-300"
          >
            <GithubIcon />
            GitHub
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — hidden on mobile */}
      <motion.div
        {...fadeUp(1.3)}
        className="hidden md:flex absolute bottom-12 right-16 flex-col items-center gap-3"
      >
        <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#555] [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent scroll-bar" />
      </motion.div>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}