import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { Hero } from '../components/home/Hero';
import { StickyFeatures } from '../components/home/StickyFeatures';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { ModularPlatformSection } from '../components/home/ModularPlatformSection';
import { ReadyCta } from '../components/home/ReadyCta';

export function HomePage() {
  useEffect(() => {
    applySEO('home');
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white text-slate-900 pb-0 mb-0">
      {/* 1. 80% Height Hero Component with Background Image & Platform Chooser */}
      <Hero />

      {/* 2. Explore Our Features (Sticky Left Column & Filterable Grid) */}
      <StickyFeatures />

      {/* 3. How Invio Works in 3 Simple Steps */}
      <HowItWorksSection />

      {/* 4. Modularity & Official Extensions Overview */}
      <ModularPlatformSection />

      {/* 5. Merged Section: Invoicing Ready CTA + Free Online Finance Suite (Stuck to footer with identical buttons) */}
      <ReadyCta />
    </main>
  );
}

export default HomePage;
