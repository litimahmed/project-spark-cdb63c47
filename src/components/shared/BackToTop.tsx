import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled more than 1.5 viewport heights
      setIsVisible(window.scrollY > window.innerHeight * 1.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 z-40 group
        w-12 h-12 flex items-center justify-center
        bg-charcoal/80 backdrop-blur-sm border border-gold/30
        text-gold hover:bg-gold hover:text-charcoal
        shadow-lg hover:shadow-xl hover:shadow-gold/20
        transition-all duration-500 transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
        hover:scale-110
      `}
      aria-label="Retour en haut"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Arrow with bounce animation */}
      <ChevronUp 
        size={20} 
        className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      
      {/* Progress ring - decorative */}
      <svg 
        className="absolute inset-0 w-full h-full -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        viewBox="0 0 48 48"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="138"
          strokeDashoffset="0"
          className="text-gold/30"
        />
      </svg>
    </button>
  );
};

export default BackToTop;
