import { useState, useEffect, useRef } from 'react';
import { Award, GraduationCap, Clock } from 'lucide-react';

interface Doctor {
  name: string;
  title: string;
  specialty: string;
  experience: string;
  education: string;
  image: string;
}

const doctors: Doctor[] = [
  {
    name: 'Dr. Sophie Martin',
    title: 'Directrice & Chirurgien-Dentiste',
    specialty: 'Implantologie & Esthétique',
    experience: '18 ans',
    education: 'Université Paris Descartes',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Dr. Thomas Bernard',
    title: 'Chirurgien-Dentiste',
    specialty: 'Implantologie Avancée',
    experience: '15 ans',
    education: 'Université de Strasbourg',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Dr. Camille Lefebvre',
    title: 'Orthodontiste',
    specialty: 'Orthodontie Invisible',
    experience: '12 ans',
    education: 'Université de Lyon',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop',
  },
];

const Doctors = () => {
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
      id="equipe"
      ref={sectionRef}
      className="py-20 lg:py-28 relative overflow-hidden bg-muted/20"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Équipe Médicale
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
            Nos <span className="text-primary">Praticiens</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Une équipe de spécialistes passionnés, dédiés à votre bien-être 
            et à l'excellence des soins dentaires.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/50" />
            <Award className="w-5 h-5 text-primary/60" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>

        {/* Doctors Grid - 3 Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.name}
              className={`group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Modern Card */}
              <div className="relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  
                  {/* Specialty badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-background/90 backdrop-blur-md text-foreground text-xs font-medium tracking-wide rounded-full border border-border/50">
                      {doctor.specialty}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 -mt-12 relative z-10">
                  {/* Avatar ring effect */}
                  <div className="w-20 h-20 rounded-full border-4 border-card overflow-hidden mb-4 shadow-lg">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <h3 className="font-heading text-xl text-foreground mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-4">
                    {doctor.title}
                  </p>

                  {/* Info pills */}
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full text-xs text-muted-foreground">
                      <GraduationCap className="w-3.5 h-3.5 text-primary" />
                      <span className="truncate max-w-[120px]">{doctor.education}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
