'use client';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import SplitText from './SplitText';

// ── Animated counter ──
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref       = useRef<HTMLSpanElement>(null);
  const inView    = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring    = useSpring(motionVal, { duration: 1400, bounce: 0 });
  const display   = useTransform(spring, v => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, to, motionVal]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const stats = [
  { num: 8,  suffix: '+', label: 'Years Experience' },
  { num: 9,  suffix: '+', label: 'Live Projects'    },
  { num: 6,  suffix: '',  label: 'Companies'         },
  { num: 5,  suffix: '',  label: 'Industries'        },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } },
};

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="py-32 px-8 md:px-16 bg-[#0d0d0d] overflow-hidden">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
      >
        <div className="section-tag">01 — About</div>
        <div className="font-display font-light mb-16"
          style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.15 }}>
          <div className="flex flex-wrap items-baseline gap-x-[0.25em]">
            <SplitText text="Crafting"
              as="span" className="text-white"
              style={{ fontSize: 'inherit', fontFamily: 'var(--font-display)', fontWeight: 300 }}
              delay={0.1} stagger={0.06} />
            <SplitText text="solutions,"
              as="span" className="italic text-gold"
              style={{ fontSize: 'inherit', fontFamily: 'var(--font-display)', fontWeight: 300 }}
              delay={0.22} stagger={0.06} />
          </div>
          <SplitText text="not just code."
            as="span" className="block text-white"
            style={{ fontSize: 'inherit', fontFamily: 'var(--font-display)', fontWeight: 300 }}
            delay={0.38} stagger={0.05} />
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

        {/* ── Text + Stats ── */}
        <div>
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="space-y-5 text-soft leading-[1.9]"
          >
            {[
              <>I'm <span className="text-light font-medium">Bagus Putu Ardha Putra Putra</span>, a self-driven Full Stack Developer based in Denpasar, Bali. I started my journey in 2018 as a backend developer and have since evolved into a versatile engineer capable of owning entire product lifecycles — from database architecture to polished frontend experiences.</>,
              <>Over 8 years, I've delivered solutions across <span className="text-light">FinTech</span>, <span className="text-light">automotive</span>, <span className="text-light">hospitality</span>, <span className="text-light">logistics</span>, and <span className="text-light">travel tech</span> — working solo or leading small teams, always as the person who gets things shipped.</>,
              <>Currently available for <span className="text-gold">freelance projects</span> and <span className="text-gold">senior engineering roles</span> that value craftsmanship and product thinking.</>,
            ].map((text, i) => (
              <motion.p key={i} variants={item}>{text}</motion.p>
            ))}
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 gap-px mt-12 border border-[#1e1e1e]"
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={item}
                className="bg-panel p-6 group hover:bg-[#141414] transition-colors relative overflow-hidden border-r border-b border-[#1e1e1e] last:border-r-0"
              >
                {/* Gold line reveal */}
                <motion.div
                  className="absolute top-0 left-0 w-0.5 bg-gold"
                  initial={{ height: 0 }}
                  whileHover={{ height: '100%' }}
                  transition={{ duration: 0.35 }}
                />
                <div className="font-cormorant text-5xl font-light text-gold leading-none">
                  <Counter to={s.num} suffix={s.suffix} />
                </div>
                <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-soft mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Profile Photo ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22,1,0.36,1] }}
          className="hidden md:block"
        >
          <motion.div
            className="relative w-80"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Gold offset border — animate in */}
            <motion.div
              className="absolute border border-[#8a6825]"
              initial={{ top: 0, left: 0, right: 0, bottom: 0, opacity: 0 }}
              animate={inView ? { top: 16, left: 16, right: -16, bottom: -16, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22,1,0.36,1] }}
            />

            {/* Photo */}
            <div className="relative z-10 aspect-[3/4] overflow-hidden border border-[#2a2a2a]">
              <motion.div
                className="w-full h-full"
                initial={{ scale: 1.08 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22,1,0.36,1] }}
              >
                <Image
                  src="/profile-photo.png"
                  alt="Bagus Ardha Putra"
                  fill
                  className="object-cover object-top"
                  style={{ filter: 'grayscale(25%) contrast(1.05) brightness(0.92)' }}
                  priority
                />
              </motion.div>

              {/* Scan line effect */}
              <motion.div
                className="absolute inset-x-0 h-px pointer-events-none"
                style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)' }}
                initial={{ top: '0%' }}
                animate={inView ? { top: ['0%', '100%', '0%'] } : {}}
                transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'linear' }}
              />

              {/* Bottom overlay */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(8,8,8,0.65) 100%)' }} />

              {/* Name tag */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 px-4 py-3"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 100%)' }}
              >
                <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-gold">
                  Bagus Ardha Putra
                </p>
                <p className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-[#555] mt-0.5">
                  Senior Full Stack Developer · Bali
                </p>
              </motion.div>
            </div>

            {/* Availability badge */}
            <motion.div
              className="absolute -top-3 -right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-[#0d0d0d] border border-[#1e1e1e]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.0, type: 'spring', bounce: 0.4 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-green-400">
                Available
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}