import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';

export function HomePage() {
  useEffect(() => {
    applySEO('home');
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex-1 w-full min-h-[calc(100vh-16rem)]">
      {/* Blank canvas - Ready for custom sections */}
    </main>
  );
}

export default HomePage;
