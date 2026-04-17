'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

export default function SplitText({
  text, className = '', style, delay = 0, stagger = 0.04, as: Tag = 'h2',
}: Props) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration: 0.65,
              delay: delay + wi * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}