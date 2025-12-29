import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop')`,
          transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0002})`,
        }}
      >
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-dental-dark/70 via-dental-dark/50 to-dental-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-dental-dark/40 via-transparent to-dental-dark/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Decorative Line */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent mb-8 opacity-0 animate-fade-in" />

        {/* Tagline */}
        <p className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-6 opacity-0 animate-fade-in animation-delay-200">
          Centre Dentaire d'Excellence
        </p>

        {/* Main Headline */}
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-dental-light mb-6 opacity-0 animate-fade-in animation-delay-300">
          Votre Sourire,{' '}
          <span className="text-primary">Notre Priorité</span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-lg md:text-xl lg:text-2xl text-dental-light/90 mb-3 opacity-0 animate-fade-in animation-delay-400 max-w-2xl">
          Des soins dentaires modernes et personnalisés pour toute la famille
        </p>

        {/* Decorative Separator */}
        <div className="flex items-center gap-4 my-6 opacity-0 animate-fade-in animation-delay-500">
          <div className="w-16 h-px bg-primary/50" />
          <div className="w-2 h-2 rounded-full bg-primary/50" />
          <div className="w-16 h-px bg-primary/50" />
        </div>

        {/* Secondary Tagline */}
        <p className="font-sans text-sm md:text-base tracking-wide text-dental-light/60 mb-12 opacity-0 animate-fade-in animation-delay-600">
          Équipe experte • Technologies avancées • Environnement apaisant
        </p>

        {/* CTA Button */}
        <a
          href="#reservations"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative px-10 py-4 bg-primary text-primary-foreground font-sans text-sm font-medium tracking-wide uppercase overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-primary/30 opacity-0 animate-fade-in animation-delay-700 rounded-full hover:bg-secondary"
        >
          <span className="relative z-10 transition-colors duration-500">
            Prendre Rendez-vous
          </span>
        </a>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dental-light/50 hover:text-primary transition-colors cursor-pointer opacity-0 animate-fade-in animation-delay-800"
        aria-label="Défiler vers la section à propos"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Découvrir</span>
        <ChevronDown className="animate-scroll-indicator" size={20} />
      </button>

      {/* Side decorative elements */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-dental-light/20 to-transparent" />
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-dental-light/30 writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Défiler
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-dental-light/20 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;