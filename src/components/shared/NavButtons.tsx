import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  to: string;
  label: string;
}

interface ReserveButtonProps {
  variant?: 'outline' | 'solid';
  className?: string;
}

// Consistent back button - transparent bg, no border radius
export const BackButton = ({ to, label }: BackButtonProps) => {
  return (
    <Link 
      to={to}
      className="group flex items-center gap-3 px-5 py-3 backdrop-blur-md border border-gold/30 hover:border-gold transition-all duration-500"
    >
      <ArrowLeft size={18} className="text-gold group-hover:-translate-x-1 transition-transform duration-300" />
      <span className="font-sans text-xs tracking-[0.2em] uppercase text-offwhite/80 group-hover:text-gold transition-colors">
        {label}
      </span>
    </Link>
  );
};

// Consistent reserve button - no border radius
export const ReserveButton = ({ variant = 'outline', className = '' }: ReserveButtonProps) => {
  const baseClasses = "px-6 py-3 font-sans text-xs tracking-[0.15em] uppercase transition-all duration-500";
  
  const variantClasses = variant === 'outline' 
    ? "text-gold border border-gold hover:bg-gold hover:text-charcoal"
    : "bg-gold text-charcoal border border-gold hover:bg-gold/90";
  
  return (
    <Link 
      to="/reservations"
      onClick={() => window.scrollTo(0, 0)}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      Réserver
    </Link>
  );
};

// Floating navigation with scroll-aware background
interface FloatingNavProps {
  backTo: string;
  backLabel: string;
}

export const FloatingNav = ({ backTo, backLabel }: FloatingNavProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-charcoal/95 backdrop-blur-lg py-4' : 'py-6'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to={backTo}
          className={`group flex items-center gap-3 px-5 py-3 transition-all duration-500 ${
            isScrolled 
              ? 'border-transparent hover:text-gold' 
              : 'backdrop-blur-md border border-gold/30 hover:border-gold'
          }`}
        >
          <ArrowLeft size={18} className="text-gold group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-offwhite/80 group-hover:text-gold transition-colors">
            {backLabel}
          </span>
        </Link>
        <Link 
          to="/reservations"
          onClick={() => window.scrollTo(0, 0)}
          className="px-6 py-3 font-sans text-xs tracking-[0.15em] uppercase transition-all duration-500 text-gold border border-gold hover:bg-gold hover:text-charcoal"
        >
          Réserver
        </Link>
      </div>
    </nav>
  );
};

// For homepage navigation (uses anchor tag for hash links)
export const ReserveButtonAnchor = ({ className = '' }: { className?: string }) => {
  return (
    <Link 
      to="/reservations"
      onClick={() => window.scrollTo(0, 0)}
      className={`px-5 py-2 font-sans text-xs tracking-[0.15em] uppercase transition-all duration-500 text-gold border border-gold/50 hover:bg-gold hover:text-charcoal ${className}`}
    >
      Réserver
    </Link>
  );
};
