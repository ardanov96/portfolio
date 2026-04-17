'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import SplitText from './SplitText';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } },
};

// ── Magnetic link ──
function MagneticLink({ href, icon, label, external }: {
  href: string; icon: string; label: string; external?: boolean;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    setPos({ x: (e.clientX - rect.left - rect.width/2) * 0.25, y: (e.clientY - rect.top - rect.height/2) * 0.25 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.15em] uppercase text-soft hover:text-gold transition-colors duration-250"
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-gold text-xs">{icon}</span>
      {label}
    </motion.a>
  );
}

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref}
      className="py-40 px-8 md:px-16 bg-[#0d0d0d] text-center relative overflow-hidden">

      {/* Animated background glow */}
      <motion.div
  className="absolute inset-0 pointer-events-none"
  initial={{ opacity: 0 }}
  animate={inView ? { opacity: 1 } : {}}
  transition={{ duration: 1.5 }}
>
  {/* Breathing center orb */}
  <motion.div
    className="absolute inset-0"
    animate={{
      background: [
        'radial-gradient(ellipse 55% 35% at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 70%)',
        'radial-gradient(ellipse 75% 50% at 50% 100%, rgba(201,168,76,0.13) 0%, transparent 70%)',
        'radial-gradient(ellipse 55% 35% at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 70%)',
      ],
    }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
  />

  {/* Drifting side orbs */}
  <motion.div
    className="absolute inset-0"
    animate={{
      background: [
        'radial-gradient(ellipse 30% 25% at 20% 80%, rgba(201,168,76,0.05) 0%, transparent 60%)',
        'radial-gradient(ellipse 30% 25% at 30% 90%, rgba(201,168,76,0.08) 0%, transparent 60%)',
        'radial-gradient(ellipse 30% 25% at 20% 80%, rgba(201,168,76,0.05) 0%, transparent 60%)',
      ],
    }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
  />
  <motion.div
    className="absolute inset-0"
    animate={{
      background: [
        'radial-gradient(ellipse 30% 25% at 80% 85%, rgba(201,168,76,0.05) 0%, transparent 60%)',
        'radial-gradient(ellipse 30% 25% at 70% 75%, rgba(201,168,76,0.09) 0%, transparent 60%)',
        'radial-gradient(ellipse 30% 25% at 80% 85%, rgba(201,168,76,0.05) 0%, transparent 60%)',
      ],
    }}
    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
  />

  {/* Horizontal shimmer sweep */}
  <motion.div
    className="absolute inset-0"
    style={{
      background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.03) 50%, transparent 100%)',
      backgroundSize: '200% 100%',
    }}
    animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
  />
</motion.div>

      {/* Decorative corner lines */}
      {[
        'top-12 left-12 border-t border-l',
        'top-12 right-12 border-t border-r',
        'bottom-12 left-12 border-b border-l',
        'bottom-12 right-12 border-b border-r',
      ].map((cls, i) => (
        <motion.div key={i} className={`absolute w-8 h-8 ${cls} border-[#1e1e1e]`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }} />
      ))}

      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <motion.div variants={item}>
          <div className="section-tag justify-center">05 — Contact</div>
          <div className="font-display font-light text-white mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', lineHeight: 1.2 }}>
            <SplitText
              text="Let's build something"
              as="span"
              className="block whitespace-nowrap"
              style={{ fontSize: 'inherit', fontFamily: 'var(--font-display)', fontWeight: 300 }}
              delay={0.1}
              stagger={0.06}
            />
            <SplitText
              text="remarkable."
              as="span"
              className="block italic text-gold"
              style={{ fontSize: 'inherit', fontFamily: 'var(--font-display)', fontWeight: 300 }}
              delay={0.4}
              stagger={0.08}
            />
          </div>
        </motion.div>

        <motion.p variants={item}
          className="text-soft leading-[1.85] mb-12 max-w-md mx-auto">
          Open to senior engineering roles, ambitious freelance projects, and long-term
          collaborations. Based in Bali — available globally.
        </motion.p>

        {/* Email with underline animation */}
        <motion.div variants={item} className="inline-block relative group">
          <a href="mailto:ardanov96@gmail.com"
            className="font-cormorant font-light italic text-white hover:text-gold transition-colors duration-300 pb-1 relative"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)' }}
          >
            ardanov96@gmail.com
            <motion.span
              className="absolute bottom-0 left-0 h-px bg-gold"
              initial={{ width: '40%' }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.35 }}
            />
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-4 my-10 max-w-xs mx-auto"
          variants={item}
        >
          <div className="flex-1 h-px bg-[#1e1e1e]" />
          <span className="font-mono text-[0.55rem] tracking-[0.2em] text-[#333] uppercase">or reach via</span>
          <div className="flex-1 h-px bg-[#1e1e1e]" />
        </motion.div>

        <motion.div
          variants={item}
          className="flex justify-center flex-wrap gap-10"
        >
          <MagneticLink href="https://github.com/ardanov96" icon="⌥" label="GitHub" external />
          <MagneticLink href="tel:+6289563464759" icon="✆" label="+62 895 6346 47599" />
          <MagneticLink href="#" icon="◎" label="Bali, Indonesia" />
        </motion.div>
      </motion.div>
    </section>
  );
}