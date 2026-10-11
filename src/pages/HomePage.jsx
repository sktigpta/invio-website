import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { Hero } from '../components/home/Hero';
import { StickyFeatures } from '../components/home/StickyFeatures';
import { FreeToolsBanner } from '../components/home/FreeToolsBanner';
import { ReadyCta } from '../components/home/ReadyCta';

export function HomePage() {
  useEffect(() => {
    applySEO('home');
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white text-slate-900 pb-0 mb-0">
      {/* 1. 80% Height Hero Component with Background Image & Left-to-Right Overlay */}
      <Hero />

      {/* 2. Explore Our Features (Sticky Left Column & Identical Size Cards) */}
      <StickyFeatures />

      {/* 3. Free Online Finance Tools Banner (100% full width, context width matching navbar) */}
      <FreeToolsBanner />

      {/* 4. Ready to Get Started Call to Action (90% width, centered, stuck to footer) */}
      <ReadyCta />
    </main>
  );
}

export default HomePage;
