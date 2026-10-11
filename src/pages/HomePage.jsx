import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { Hero } from '../components/home/Hero';
import { StickyFeatures } from '../components/home/StickyFeatures';
import { ReadyCta } from '../components/home/ReadyCta';

export function HomePage() {
  useEffect(() => {
    applySEO('home');
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white text-slate-900 pb-0 mb-0">
      {/* 1. 80% Height Hero Component with Background Image & Vertical Column Platform Chooser */}
      <Hero />

      {/* 2. Explore Our Features (Sticky Left Column & Identical Size Cards) */}
      <StickyFeatures />

      {/* 3. Merged Section: Invoicing Ready CTA + Free Online Finance Suite (Stuck to footer with identical buttons) */}
      <ReadyCta />
    </main>
  );
}

export default HomePage;
