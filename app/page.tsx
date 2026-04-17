import Cursor       from '@/components/Cursor';
import SmoothScroll from '@/components/SmoothScroll';
import Nav          from '@/components/Nav';
import Hero         from '@/components/Hero';
import About        from '@/components/About';
import Skills       from '@/components/Skills';
import Experience   from '@/components/Experience';
import Projects     from '@/components/Projects';
import Contact      from '@/components/Contact';
import Footer       from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Cursor />
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
