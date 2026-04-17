'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SplitText from './SplitText';

const categories = [
  { label: 'Frontend',       tags: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
  { label: 'Backend',        tags: ['Node.js', 'Express.js', 'PHP', 'Laravel', 'Slim Framework', 'REST APIs'] },
  { label: 'Database',       tags: ['MySQL', 'PostgreSQL', 'Query Optimization', 'Schema Design'] },
  { label: 'DevOps & Tools', tags: ['Git', 'Bash', 'Linux CLI', 'Vercel', 'GitHub'] },
];

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} className="py-32 px-8 md:px-16 bg-[#080808]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="section-tag">02 — Tech Stack</div>
        <div className="font-display font-light mb-16"
          style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.15 }}>
          <div className="flex flex-wrap items-baseline gap-x-[0.25em]">
            <SplitText text="Tools of the"
              as="span" className="text-white"
              style={{ fontSize: 'inherit', fontFamily: 'var(--font-display)', fontWeight: 300 }}
              delay={0.1} stagger={0.07} />
            <SplitText text="trade."
              as="span" className="italic text-gold"
              style={{ fontSize: 'inherit', fontFamily: 'var(--font-display)', fontWeight: 300 }}
              delay={0.32} stagger={0.07} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-[#1e1e1e]">
        {categories.map((cat, i) => (
          <motion.div key={cat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
            className="bg-panel p-8 hover:bg-[#141414] transition-colors group border-r border-b border-[#1e1e1e] relative overflow-hidden"
          >
            {/* Gold line reveal on hover */}
            <motion.div
              className="absolute top-0 left-0 w-0.5 bg-gold"
              initial={{ height: 0 }}
              whileHover={{ height: '100%' }}
              transition={{ duration: 0.35 }}
            />
            <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-gold mb-5">{cat.label}</div>
            <div className="flex flex-wrap gap-2">
              {cat.tags.map((tag, ti) => (
                <motion.span key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.08 + ti * 0.04 }}
                  whileHover={{ borderColor: 'rgba(201,168,76,0.5)', color: '#c9a84c', y: -2 }}
                  className="px-3 py-1 border border-[#1e1e1e] font-mono text-[0.65rem] tracking-[0.08em] text-light transition-all duration-200 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}