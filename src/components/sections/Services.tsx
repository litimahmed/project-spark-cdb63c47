import { useState, useEffect, useRef } from 'react';
import { 
  Stethoscope, 
  Sparkles, 
  CircleDot, 
  Baby, 
  ArrowRight,
  Clock,
  Shield,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  featured?: boolean;
}

const services: Service[] = [
  {
    icon: <Stethoscope className="w-7 h-7" />,
    title: 'Soins Dentaires',
    description: 'Examens complets, détartrages professionnels et traitements des caries pour maintenir votre santé bucco-dentaire.',
    features: ['Examens annuels', 'Détartrage', 'Obturations'],
  },
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: 'Esthétique Dentaire',
    description: 'Blanchiment professionnel, facettes et corrections esthétiques pour un sourire éclatant et harmonieux.',
    features: ['Blanchiment', 'Facettes', 'Composite'],
  },
  {
    icon: <CircleDot className="w-7 h-7" />,
    title: 'Implantologie',
    description: 'Implants dentaires de haute qualité pour remplacer les dents manquantes avec des résultats naturels et durables.',
    features: ['Implants unitaires', 'All-on-4', 'Greffes osseuses'],
    featured: true,
  },
  {
    icon: <Baby className="w-7 h-7" />,
    title: 'Pédodontie',
    description: 'Soins dentaires adaptés aux enfants dans un environnement chaleureux et rassurant.',
    features: ['Prévention', 'Scellements', 'Suivi croissance'],
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: 'Orthodontie',
    description: 'Alignement dentaire avec appareils traditionnels ou aligneurs invisibles pour tous les âges.',
    features: ['Aligneurs', 'Bagues', 'Contention'],
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: 'Urgences Dentaires',
    description: 'Prise en charge rapide des urgences : douleurs aiguës, traumatismes et infections.',
    features: ['Disponibilité', 'Sans RDV', 'Soins immédiats'],
  },
];

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-background"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/[0.03] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Floating decorative shapes */}
      <div className="absolute top-32 left-12 w-20 h-20 border border-primary/10 rounded-full hidden lg:block" />
      <div className="absolute top-40 left-16 w-12 h-12 border border-primary/5 rounded-full hidden lg:block" />
      <div className="absolute bottom-40 right-16 w-32 h-32 border border-secondary/10 rounded-2xl rotate-12 hidden lg:block" />
      <div className="absolute top-1/2 right-8 w-16 h-16 bg-primary/5 rounded-full hidden xl:block" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Excellence & Expertise
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
            Nos <span className="text-primary">Services</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Des soins dentaires complets et personnalisés, réalisés avec les technologies 
            les plus avancées par notre équipe d'experts.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/50" />
            <Shield className="w-5 h-5 text-primary/60" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${service.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div
                className={`relative h-full rounded-2xl p-8 transition-all duration-500 ${
                  service.featured
                    ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-xl shadow-primary/20'
                    : 'bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5'
                }`}
              >
                {/* Featured badge */}
                {service.featured && (
                  <div className="absolute -top-3 left-8">
                    <span className="px-4 py-1.5 bg-background text-primary text-xs font-medium tracking-wide rounded-full shadow-md">
                      Spécialité
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-all duration-500 ${
                    service.featured
                      ? 'bg-primary-foreground/20'
                      : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                  }`}
                >
                  {service.icon}
                </div>

                {/* Content */}
                <h3
                  className={`font-heading text-xl lg:text-2xl mb-3 ${
                    service.featured ? 'text-primary-foreground' : 'text-foreground'
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    service.featured
                      ? 'text-primary-foreground/80'
                      : 'text-muted-foreground'
                  }`}
                >
                  {service.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-2 text-sm ${
                        service.featured
                          ? 'text-primary-foreground/90'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          service.featured ? 'bg-primary-foreground' : 'bg-primary'
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Link */}
                <Link
                  to="/reservations"
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group/link ${
                    service.featured
                      ? 'text-primary-foreground hover:gap-3'
                      : 'text-primary hover:gap-3'
                  }`}
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>

                {/* Hover glow effect for non-featured */}
                {!service.featured && (
                  <div className="absolute -inset-px bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-border" />
            <div className="w-2 h-2 rotate-45 bg-primary/40" />
            <div className="w-12 h-px bg-border" />
          </div>
          <Link
            to="/reservations"
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
          >
            <span>Prendre rendez-vous</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
