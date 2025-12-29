import { useEffect, useRef, useState } from 'react';
import { Shield, Heart, Award } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: Shield, title: 'Sécurité', desc: 'Protocoles stricts d\'hygiène' },
    { icon: Heart, title: 'Confort', desc: 'Approche douce et attentive' },
    { icon: Award, title: 'Excellence', desc: 'Équipe hautement qualifiée' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1970&auto=format&fit=crop"
                alt="Équipe dentaire professionnelle"
                className="w-full h-full object-cover"
              />
              {/* Accent Border */}
              <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-primary/20 rounded-xl pointer-events-none" />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -right-4 lg:-right-8 bg-primary text-primary-foreground p-6 md:p-8 shadow-2xl rounded-xl">
              <p className="font-heading text-4xl md:text-5xl font-bold mb-2">15+</p>
              <p className="font-sans text-xs tracking-widest uppercase text-primary-foreground/80">
                Années d'Expérience
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`lg:pl-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Section Label */}
            <p className="font-sans text-sm tracking-[0.2em] uppercase text-primary mb-4 font-medium">
              À Propos de Nous
            </p>

            {/* Heading */}
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight font-semibold">
              Des Soins Dentaires{' '}
              <span className="text-primary">Modernes</span> et Personnalisés
            </h2>

            {/* Accent Line */}
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />

            {/* Description */}
            <div className="space-y-5 font-sans text-muted-foreground leading-relaxed">
              <p>
                Bienvenue au Centre Dentaire Excellence, où nous combinons expertise 
                médicale de pointe et approche humaine pour offrir des soins dentaires 
                exceptionnels à toute votre famille.
              </p>
              <p>
                Notre équipe de professionnels passionnés s'engage à créer une expérience 
                positive et confortable, utilisant les dernières technologies pour des 
                traitements précis et des résultats durables.
              </p>
              <p>
                Du simple contrôle aux traitements spécialisés, nous vous accompagnons 
                avec bienveillance vers un sourire éclatant de santé.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-4 bg-muted/50 rounded-xl">
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-heading font-semibold text-foreground text-sm mb-1">{feature.title}</h4>
                  <p className="font-sans text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="w-16 h-px bg-border" />
              <div>
                <p className="font-heading text-xl font-semibold text-foreground">Dr. Sophie Martin</p>
                <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mt-1">
                  Directrice & Chirurgien-Dentiste
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;