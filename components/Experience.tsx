'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import SplitText from './SplitText';

const jobs = [
  {
    period: '2026',
    role: 'Full Stack Developer',
    company: 'Trivgoo',
    desc: 'Engineered a next-generation Online Travel Agency platform featuring an AI-driven itinerary planner. Built real-time booking, campaign management, flash sales, and multi-role agent system from the ground up using React, Node.js, and MySQL.',
    tags: ['React', 'Node.js', 'MySQL', 'AI', 'Express.js'],
  },
  {
    period: '2024 – 2025',
    role: 'Freelance Full Stack Developer',
    company: 'Portalog',
    desc: 'Designed and developed a comprehensive web-based management system for small-to-medium freight forwarding companies — automating manual workflows, improving data accuracy, and providing real-time visibility into the shipping lifecycle.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL'],
  },
  {
    period: '2023 – 2024',
    role: 'Freelance Frontend Developer',
    company: 'Self Employed',
    desc: 'Delivered scalable front-end architectures for FinTech (Forex), Car Rental, Hospitality, and Tourism clients. Built 7+ production-grade web applications independently using Next.js and React.',
    tags: ['Next.js', 'React', 'Tailwind', 'Vercel'],
  },
  {
    period: '2020 – 2022',
    role: 'Full Stack Developer',
    company: 'PT. Appkey',
    desc: 'Developed and maintained web applications including Toyota Smile, a workforce outsourcing platform operating in Japan. Responsible for both frontend and backend development.',
    tags: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
  },
  {
    period: '2019 – 2020',
    role: 'Backend Developer',
    company: 'Mindimedia',
    desc: 'Maintained and enhanced an internal Property Management System (PMS) called Guirez for managing hotels, villas, and accommodation properties owned by Mindimedia\'s clients.',
    tags: ['PHP', 'Laravel', 'MySQL'],
  },
  {
    period: '2018 – 2019',
    role: 'Backend Developer',
    company: 'CV. Harmoni Permata',
    desc: 'Developed RESTful APIs using Slim Framework for lightweight microservices and Laravel for complex full-stack systems. Designed and optimized relational MySQL databases.',
    tags: ['PHP', 'Slim Framework', 'Laravel', 'MySQL'],
  },
];

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" ref={ref} className="py-32 px-8 md:px-16 bg-[#0d0d0d]">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
        <div className="section-tag">03 — Experience</div>
        <div className="font-display font-light mb-20"
          style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.15 }}>
          <div className="flex flex-wrap items-baseline gap-x-[0.25em]">
            <SplitText text="Where I've"
              as="span" className="text-white"
              style={{ fontSize: 'inherit', fontFamily: 'var(--font-display)', fontWeight: 300 }}
              delay={0.1} stagger={0.07} />
            <SplitText text="built."
              as="span" className="italic text-gold"
              style={{ fontSize: 'inherit', fontFamily: 'var(--font-display)', fontWeight: 300 }}
              delay={0.28} stagger={0.07} />
          </div>
        </div>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1e1e1e] to-transparent" />

        <div className="space-y-0">
          {jobs.map((job, i) => (
            <motion.div key={job.company}
              initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="relative pl-10 md:pl-16 py-10 border-b border-[#1e1e1e] last:border-b-0 group"
            >
              {/* Dot */}
              <motion.div
                className="absolute left-[-4px] top-[2.8rem] w-2 h-2 rounded-full border border-gold bg-[#0d0d0d]"
                whileHover={{ scale: 1.8, backgroundColor: '#c9a84c' }}
                transition={{ duration: 0.2 }}
              />

              <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-10">
                <div>
                  <div className="font-mono text-[0.65rem] tracking-[0.12em] text-gold mb-1">{job.period}</div>
                  <div className="font-mono text-[0.6rem] tracking-[0.08em] text-soft uppercase">{job.role}</div>
                </div>
                <div>
                  <motion.div 
                    className="font-display text-3xl font-light text-white mb-3"
                    whileHover={{ x: 6, color: '#e8c97a' }}
                    transition={{ duration: 0.25 }}
                  >
                    {job.company}
                  </motion.div>
                  <p className="text-soft text-sm leading-[1.85] mb-4 max-w-2xl">{job.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(t => (
                      <span key={t} className="font-mono text-[0.55rem] tracking-[0.1em] px-2 py-0.5 border border-[#1e1e1e] text-[#555]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
