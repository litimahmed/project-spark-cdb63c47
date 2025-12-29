import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop',
    alt: 'Salle de soins moderne',
    title: 'Nos Équipements',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop',
    alt: 'Sourire éclatant',
    title: 'Résultats',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1970&auto=format&fit=crop',
    alt: 'Équipe dentaire',
    title: 'Notre Équipe',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=2070&auto=format&fit=crop',
    alt: 'Instruments dentaires',
    title: 'Technologie',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1445527815219-ecbfec67492e?q=80&w=2071&auto=format&fit=crop',
    alt: 'Salle d\'attente confortable',
    title: 'Espace Accueil',
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=2070&auto=format&fit=crop',
    alt: 'Consultation dentaire',
    title: 'Consultations',
    span: 'md:col-span-1 md:row-span-1',
  },
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? null : prev === 0 ? galleryImages.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : prev === galleryImages.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-padding bg-muted/30 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-sans text-sm tracking-[0.2em] uppercase text-primary mb-4 font-medium">
            Notre Clinique
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 font-semibold">
            Visite <span className="text-primary">Virtuelle</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-primary rounded-full" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-primary rounded-full" />
          </div>
        </div>

        {/* Bento Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px] transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`group relative overflow-hidden cursor-pointer rounded-2xl ${image.span}`}
              style={{ animationDelay: `${index * 100}ms` }}
              aria-label={`View ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dental-dark/80 via-dental-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Content on hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center mb-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <span className="text-primary text-2xl font-light">+</span>
                </div>
                <span className="font-heading text-lg font-medium text-dental-light">{image.title}</span>
              </div>
              
              {/* Corner accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 rounded-full" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-dental-dark/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-dental-light/60 hover:text-dental-light transition-colors p-2"
            aria-label="Close gallery"
          >
            <X size={32} />
          </button>

          {/* Navigation - Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev === null ? null : prev === 0 ? galleryImages.length - 1 : prev - 1
              );
            }}
            className="absolute left-4 md:left-8 text-dental-light/60 hover:text-dental-light transition-colors p-2"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Navigation - Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev === null ? null : prev === galleryImages.length - 1 ? 0 : prev + 1
              );
            }}
            className="absolute right-4 md:right-8 text-dental-light/60 hover:text-dental-light transition-colors p-2"
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>

          {/* Image */}
          <img
            src={galleryImages[selectedIndex].src}
            alt={galleryImages[selectedIndex].alt}
            className="max-w-full max-h-[85vh] object-contain animate-scale-in rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-sm text-dental-light/60 tracking-widest">
            {selectedIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;