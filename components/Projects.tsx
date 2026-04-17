'use client';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SplitText from './SplitText';

const projects = [
  { name: 'Trivgoo',      thumb: '/trivgoo.png',     domain: 'Travel Tech · OTA Platform',       desc: 'Next-gen Online Travel Agency with AI-driven itinerary planner, real-time booking, flash sales, and multi-agent management.', url: 'https://trivgoo.com/id',             stack: ['React','Node.js','MySQL','AI'], featured: true },
  { name: 'Nusantacar',   thumb: '/nusantacar.png',  domain: 'Automotive · Car Rental',          desc: 'Full-featured car rental platform with booking management, fleet showcase, and real-time availability for Indonesian market.', url: 'https://nusantacar.vercel.app/',     stack: ['Next.js','React','Tailwind']},
  { name: 'Kelana Trip',  thumb: '/kelanatrip.png',  domain: 'Tourism · Travel Agency',          desc: 'Tourism and travel booking platform featuring curated destinations, tour packages, and seamless reservation flow.',            url: 'https://kelanatrip.vercel.app/',     stack: ['Next.js','React','Tailwind']},
  { name: 'Leanbrew',     thumb: '/leanbrew.png',    domain: 'Hospitality · Coffee & Lifestyle', desc: 'Lifestyle brand web presence for a modern coffee shop — menu showcase, brand storytelling, and membership.',                 url: 'https://leanbrew.vercel.app/',       stack: ['Next.js','React','Tailwind']},
  { name: 'Nextfit',      thumb: '/nextfit.png',     domain: 'Hospitality · Fitness',            desc: 'Premium gym and fitness studio platform with class scheduling, membership tiers, and trainer profiles.',                      url: 'https://nextfit-chi.vercel.app/',    stack: ['Next.js','React','Tailwind']},
  { name: 'Jinah Trade',  thumb: '/jinahtrade.png',  domain: 'FinTech · Forex Trading',          desc: 'High-performance Forex trading frontend with real-time data visualization and trading interface for financial markets.',      url: 'https://jinah-trade.vercel.app/',    stack: ['Next.js','React','Chart.js']},
  { name: 'Fufawork',     thumb: '/fufawork.png',    domain: 'SaaS · Workforce Management',      desc: 'Workforce management platform for HR operations, employee scheduling, and company productivity tools.',                       url: 'https://fufawork.vercel.app/',       stack: ['Next.js','React','Tailwind']},
  { name: 'Nornickel ID', thumb: '/nornickel.png',   domain: 'Corporate · Mining & Resources',   desc: 'Corporate website for mining and natural resources company — company profile, operations, and investor relations.',           url: 'https://nornickel-id.vercel.app/',   stack: ['Next.js','React','Tailwind']},
  { name: 'Toyota Smile', thumb: '/toyotasmile.png', domain: 'Automotive · Workforce · Japan',   desc: 'Official platform for Toyota Smile, a workforce outsourcing company in Japan. Built during tenure at PT. Appkey.',           url: 'https://www.toyotasmile.co.jp/',     stack: ['PHP','Laravel','MySQL']},
];

// ── 3D tilt card ──
function TiltCard({ children, className, href }: {
  children: React.ReactNode; className?: string; href: string;
}) {
  const ref   = useRef<HTMLDivElement>(null);
  const rotX  = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotY  = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const glowX = useTransform(rotY, [-10, 10], ['0%', '100%']);
  const glowY = useTransform(rotX, [10, -10], ['0%', '100%']);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    rotX.set(-((e.clientY - rect.top)  / rect.height - 0.5) * 8);
    rotY.set( ((e.clientX - rect.left) / rect.width  - 0.5) * 8);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { rotX.set(0); rotY.set(0); }}
      onClick={() => window.open(href, '_blank', 'noreferrer')}
      data-cursor
      style={{
        rotateX: rotX, rotateY: rotY,
        transformPerspective: 800,
        cursor: 'none',       
        pointerEvents: 'auto', 
      }}
      className={className}
    >
      {/* Moving gold sheen */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(201,168,76,0.07) 0%, transparent 65%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" ref={ref} className="py-32 px-8 md:px-16 bg-[#080808]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="section-tag">04 — Projects</div>
        <div className="font-display font-light mb-16"
          style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.15 }}>
          <div className="flex flex-wrap items-baseline gap-x-[0.25em]">
            <SplitText text="Selected"
              as="span" className="text-white"
              style={{ fontSize: 'inherit', fontFamily: 'var(--font-display)', fontWeight: 300 }}
              delay={0.1} stagger={0.07} />
            <SplitText text="work."
              as="span" className="italic text-gold"
              style={{ fontSize: 'inherit', fontFamily: 'var(--font-display)', fontWeight: 300 }}
              delay={0.24} stagger={0.07} />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {projects.map((p) => (
          <motion.div key={p.name} variants={cardVariant} style={{ transformStyle: 'preserve-3d' }}>
            <TiltCard
              href={p.url}
              className="group relative bg-panel border border-[#1e1e1e] hover:border-[#8a6825] transition-all duration-400 block overflow-hidden h-full"
            >

              {/* ── Thumbnail ── */}
              <div className="h-44 bg-[#0d0d0d] border-b border-[#1e1e1e] relative overflow-hidden">

                {/* Screenshot */}
                <img
                  src={p.thumb}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: 'brightness(0.82) saturate(0.85)' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />

                {/* Hover overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                {/* Featured badge */}
                {p.featured && (
                  <motion.div
                    className="absolute top-3 left-3 font-mono text-[0.55rem] tracking-[0.15em] uppercase px-2 py-1 border border-gold text-gold bg-[#080808]/80 z-10"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    Featured
                  </motion.div>
                )}

                {/* Arrow — kanan atas, anchor proper untuk right-click */}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="absolute top-3 right-3 z-10 w-8 h-8 border border-[#333] bg-[#080808]/80 flex items-center justify-center text-[#555] text-sm hover:border-gold hover:text-gold hover:-rotate-45 transition-all duration-300"
                >
                  ↗
                </a>
              </div>

              {/* ── Body ── */}
              <div className="p-6">
                <div className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-gold mb-2">
                  {p.domain}
                </div>

                <div className="overflow-hidden mb-2">
                  <motion.div
                    className="font-display text-2xl font-light text-white group-hover:text-gold-lt transition-colors duration-300"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {p.name}
                  </motion.div>
                </div>

                <p className="text-soft text-xs leading-[1.75] mb-4">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map(s => (
                    <motion.span key={s}
                      className="font-mono text-[0.55rem] tracking-[0.08em] px-2 py-0.5 border border-[#1e1e1e] text-[#555]"
                      whileHover={{ borderColor: 'rgba(201,168,76,0.4)', color: '#c9a84c' }}
                      transition={{ duration: 0.2 }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>

            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}