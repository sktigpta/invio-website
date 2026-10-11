import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { Hero } from '../components/home/Hero';
import { LatestUpdate } from '../components/home/LatestUpdate';
import { StickyFeatures } from '../components/home/StickyFeatures';
import { FreeToolsBanner } from '../components/home/FreeToolsBanner';
import { HomeFaq } from '../components/home/HomeFaq';
import { ReadyCta } from '../components/home/ReadyCta';

export function HomePage() {
  useEffect(() => {
    applySEO('home');
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white text-slate-900">
      {/* 1. 80% Height Hero Component with Background Image & Left-to-Right White-to-Transparent Overlay */}
      <Hero />

      {/* 2. Latest Update Component */}
      <LatestUpdate />

      {/* 3. Explore Our Features (Sticky Left Column & Smooth Scrolling Right Cards) */}
      <StickyFeatures />

      {/* 4. Free Online Finance Tools Banner */}
      <FreeToolsBanner />

      {/* 5. Frequently Asked Questions */}
      <HomeFaq />

      {/* 6. Ready to Get Started Call to Action */}
      <ReadyCta />
    </main>
  );
}

export default HomePage;
