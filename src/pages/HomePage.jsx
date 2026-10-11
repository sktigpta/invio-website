import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { Hero } from '../components/home/Hero';
import { LatestUpdate } from '../components/home/LatestUpdate';
import { StickyFeatures } from '../components/home/StickyFeatures';
import { FreeToolsBanner } from '../components/home/FreeToolsBanner';
import { ReadyCta } from '../components/home/ReadyCta';

export function HomePage() {
  useEffect(() => {
    applySEO('home');
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white text-slate-900">
      {/* 1. 80% Height Hero Component with Background Image & Left-to-Right Overlay */}
      <Hero />

      {/* 2. Latest Update Component */}
      <LatestUpdate />

      {/* 3. Explore Our Features (Sticky Left Column & Clean Cards without Category Badges) */}
      <StickyFeatures />

      {/* 4. Free Online Finance Tools Banner (Full width edge-to-edge, context width matching navbar) */}
      <FreeToolsBanner />

      {/* 5. Ready to Get Started Call to Action */}
      <ReadyCta />
    </main>
  );
}

export default HomePage;
