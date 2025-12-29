import { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

const testimonials = [
  {
    id: 1,
    name: 'Marie Dubois',
    role: 'Patiente depuis 5 ans',
    quote: 'Une équipe exceptionnelle ! J\'avais une peur bleue du dentiste, mais ici l\'ambiance est si apaisante et le personnel si attentionné que je n\'ai plus aucune appréhension.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Philippe Martin',
    role: 'Patient régulier',
    quote: 'Des soins de qualité exceptionnelle avec des équipements de dernière génération. Je recommande vivement ce centre pour toute la famille.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    role: 'Nouvelle patiente',
    quote: 'Accueil chaleureux, explications claires des traitements, et résultats impeccables. Mon sourire n\'a jamais été aussi beau !',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
  },
];

// Animated Stats Component
const AnimatedStats = ({ isVisible }: { isVisible: boolean }) => {
  const patientsCount = useCountUp({ end: 5000, duration: 2500, suffix: '+', enabled: isVisible });
  const satisfactionCount = useCountUp({ end: 98, duration: 2000, delay: 200, suffix: '%', enabled: isVisible });
  const yearsCount = useCountUp({ end: 15, duration: 1800, delay: 400, enabled: isVisible });

  const stats = [
    { value: patientsCount.displayValue, label: 'Patients satisfaits' },
    { value: satisfactionCount.displayValue, label: 'Taux de satisfaction' },
    { value: yearsCount.displayValue, label: 'Ans d\'excellence' },
  ];

  return (
    <div 
      className={`grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 transition-all duration-1000 delay-400 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <p className="font-heading text-2xl md:text-3xl font-bold text-primary mb-1 tabular-nums">{stat.value}</p>
          <p className="font-sans text-[10px] md:text-xs tracking-wide uppercase text-dental-light/50">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-dental-dark overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-primary/80 mb-3 font-medium">
            Témoignages
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-dental-light font-semibold mb-4">
            Ce que disent nos <span className="text-primary">patients</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-primary/50 rounded-full" />
            <Quote className="w-5 h-5 text-primary/40" />
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-primary/50 rounded-full" />
          </div>
        </div>

        {/* Featured Testimonial */}
        <div 
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative">
            {/* Quote mark */}
            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/10" />
            
            {/* Testimonial content */}
            <div className="bg-white/[0.03] border border-white/10 p-8 md:p-12 relative overflow-hidden rounded-2xl">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-2xl" />
              
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-700 ${
                    index === activeIndex 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                  }`}
                >
                  {index === activeIndex && (
                    <div className="text-center">
                      {/* Stars */}
                      <div className="flex justify-center gap-1 mb-8">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-5 h-5 text-primary fill-primary" 
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <blockquote className="font-sans text-xl md:text-2xl text-dental-light/90 leading-relaxed mb-10">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-heading text-lg font-semibold text-dental-light">{testimonial.name}</p>
                          <p className="font-sans text-xs tracking-wide uppercase text-primary/70">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-white/20 w-2 hover:bg-white/40'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats with Animated Counters */}
        <AnimatedStats isVisible={isVisible} />
      </div>
    </section>
  );
};

export default Testimonials;