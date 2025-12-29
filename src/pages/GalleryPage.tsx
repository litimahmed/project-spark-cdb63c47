import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Footer from "@/components/sections/Footer";

// Import dental images
import dentalHeroBanner from "@/assets/gallery/dental-hero-banner.jpg";
import dentalTreatmentRoom from "@/assets/gallery/dental-treatment-room.jpg";
import dentalEquipment from "@/assets/gallery/dental-equipment.jpg";
import dentalWaitingRoom from "@/assets/gallery/dental-waiting-room.jpg";
import dentalChair from "@/assets/gallery/dental-chair.jpg";
import dentalSterilization from "@/assets/gallery/dental-sterilization.jpg";
import dentalConsultation from "@/assets/gallery/dental-consultation.jpg";
import dentalTeamWork from "@/assets/gallery/dental-team-work.jpg";
import dentalPatientSmile from "@/assets/gallery/dental-patient-smile.jpg";
import dentalConsultationPatient from "@/assets/gallery/dental-consultation-patient.jpg";
import dentalTechnology from "@/assets/gallery/dental-technology.jpg";
import dentalSmileResult from "@/assets/gallery/dental-smile-result.jpg";
import dentalReception from "@/assets/gallery/dental-reception.jpg";
import dentalCtaBanner from "@/assets/gallery/dental-cta-banner.jpg";

// Top row images - slides left (Equipment & Spaces)
const topRowImages = [
  {
    id: 1,
    src: dentalTreatmentRoom,
    alt: "Salle de traitement moderne",
    title: "Salle de Soins",
    description: "Équipement de pointe pour votre confort",
  },
  {
    id: 2,
    src: dentalEquipment,
    alt: "Équipement dentaire professionnel",
    title: "Technologie Avancée",
    description: "Instruments de précision modernes",
  },
  {
    id: 3,
    src: dentalWaitingRoom,
    alt: "Salle d'attente accueillante",
    title: "Espace Détente",
    description: "Un environnement apaisant vous attend",
  },
  {
    id: 4,
    src: dentalChair,
    alt: "Fauteuil dentaire moderne",
    title: "Confort Optimal",
    description: "Fauteuils ergonomiques dernière génération",
  },
  {
    id: 5,
    src: dentalSterilization,
    alt: "Zone de stérilisation",
    title: "Hygiène Irréprochable",
    description: "Normes de stérilisation strictes",
  },
  {
    id: 6,
    src: dentalConsultation,
    alt: "Cabinet de consultation",
    title: "Consultation Privée",
    description: "Espace dédié à votre écoute",
  },
];

// Bottom row images - slides right (Team & Results)
const bottomRowImages = [
  {
    id: 7,
    src: dentalTeamWork,
    alt: "Équipe dentaire au travail",
    title: "Notre Équipe",
    description: "Des professionnels dévoués à votre sourire",
  },
  {
    id: 8,
    src: dentalPatientSmile,
    alt: "Patient souriant après traitement",
    title: "Sourire Éclatant",
    description: "Des résultats qui parlent d'eux-mêmes",
  },
  {
    id: 9,
    src: dentalConsultationPatient,
    alt: "Consultation avec patient",
    title: "Écoute Attentive",
    description: "Votre santé bucco-dentaire, notre priorité",
  },
  {
    id: 10,
    src: dentalTechnology,
    alt: "Technologie dentaire avancée",
    title: "Innovation",
    description: "Scanner 3D et imagerie numérique",
  },
  {
    id: 11,
    src: dentalSmileResult,
    alt: "Transformation du sourire",
    title: "Avant / Après",
    description: "Des transformations remarquables",
  },
  {
    id: 12,
    src: dentalReception,
    alt: "Accueil chaleureux",
    title: "Accueil Souriant",
    description: "Un service personnalisé dès votre arrivée",
  },
];

const allImages = [...topRowImages, ...bottomRowImages];

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface InfiniteCarouselProps {
  images: CarouselImage[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  onImageClick: (index: number) => void;
}

const InfiniteCarousel = ({ images, direction = "left", speed = "normal", onImageClick }: InfiniteCarouselProps) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Triple the images for truly seamless infinite loop
  const tripleImages = [...images, ...images, ...images];
  
  const speedDuration = {
    slow: "60s",
    normal: "40s",
    fast: "25s",
  };

  const animationName = direction === "left" ? "scroll-left-infinite" : "scroll-right-infinite";

  return (
    <div 
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient masks for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
      
      <div 
        className={`flex gap-6 ${animationName}`}
        style={{
          animationDuration: speedDuration[speed],
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {tripleImages.map((image, idx) => (
          <div
            key={`${image.id}-${idx}`}
            onClick={() => onImageClick(idx % images.length)}
            className="group relative flex-shrink-0 w-[280px] md:w-[360px] h-[200px] md:h-[280px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-charcoal/20"
          >
            {/* Image */}
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            {/* Gold accent line */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gold group-hover:w-full transition-all duration-700" />
            
            {/* Content on hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 text-center">
              <h3 className="font-luxury text-xl text-offwhite mb-1 italic transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{image.title}</h3>
              <p className="font-sans text-sm text-offwhite/70 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const handleImageClick = (row: "top" | "bottom", index: number) => {
    // Calculate actual index in allImages array
    const actualIndex = row === "top" ? index : topRowImages.length + index;
    setSelectedIndex(actualIndex);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => 
          prev !== null ? (prev + 1) % allImages.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => 
          prev !== null ? (prev - 1 + allImages.length) % allImages.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end justify-center overflow-hidden pb-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${dentalHeroBanner}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dental-dark/70 via-dental-dark/50 to-background" />
        
        {/* Hero Content */}
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-primary mb-4 font-medium">
            Clinique Dentaire du Parc
          </p>
          
          <h1 className="font-heading text-4xl md:text-6xl text-dental-light mb-4 font-semibold">
            Notre <span className="text-primary">Clinique</span>
          </h1>
          
          <p className="font-sans text-dental-light/70 max-w-lg mx-auto">
            Visite virtuelle de nos espaces modernes et accueillants
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-[#FAF8F5]">
        
        {/* Single Gallery Section with Two Rows */}
        <section className="py-16 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-20 h-px bg-gold/50" />
                <span className="font-sans text-xs tracking-[0.3em] uppercase text-charcoal/50">Nos Espaces</span>
                <div className="w-20 h-px bg-gold/50" />
              </div>
              <h2 className="font-luxury text-4xl md:text-5xl text-charcoal italic mb-4">
                Excellence & Innovation
              </h2>
              <p className="font-sans text-charcoal/60 max-w-xl mx-auto">
                Découvrez notre clinique moderne à travers ces images de nos installations et de notre équipe dévouée
              </p>
            </div>
          </div>
          
          {/* Top Row - Slides Left */}
          <InfiniteCarousel 
            images={topRowImages} 
            direction="left" 
            speed="normal"
            onImageClick={(idx) => handleImageClick("top", idx)}
          />
          
          {/* Spacing between rows */}
          <div className="h-6 md:h-10" />
          
          {/* Bottom Row - Slides Right */}
          <InfiniteCarousel 
            images={bottomRowImages} 
            direction="right" 
            speed="normal"
            onImageClick={(idx) => handleImageClick("bottom", idx)}
          />
        </section>
      </div>

      {/* Bottom CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${dentalCtaBanner}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dental-dark/90 via-dental-dark/85 to-dental-dark/90" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-primary mb-4 font-medium">
            Votre Sourire Nous Tient à Cœur
          </p>
          
          <h2 className="font-heading text-3xl md:text-5xl text-dental-light mb-6 font-semibold">
            Prenez Soin de Votre Sourire
          </h2>
          
          <p className="font-sans text-dental-light/70 text-lg mb-10 max-w-xl mx-auto">
            Prenez rendez-vous pour une consultation personnalisée. Nous vous accueillons dans un environnement chaleureux et professionnel.
          </p>
          
          <Link
            to="/reservations"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-[0.2em] uppercase rounded-full hover:bg-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            Prendre Rendez-vous
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-offwhite/60 hover:text-offwhite transition-colors z-10"
            aria-label="Fermer"
          >
            <X size={32} />
          </button>
          
          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => 
                prev !== null ? (prev - 1 + allImages.length) % allImages.length : null
              );
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-offwhite/60 hover:text-offwhite transition-colors p-2"
            aria-label="Image précédente"
          >
            <ChevronLeft size={40} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => 
                prev !== null ? (prev + 1) % allImages.length : null
              );
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-offwhite/60 hover:text-offwhite transition-colors p-2"
            aria-label="Image suivante"
          >
            <ChevronRight size={40} />
          </button>
          
          {/* Image container */}
          <div 
            className="relative max-w-5xl max-h-[80vh] mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allImages[selectedIndex].src}
              alt={allImages[selectedIndex].alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            
            {/* Caption */}
            <div className="mt-6 text-center">
              <div className="w-12 h-px bg-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-offwhite mb-2">
                {allImages[selectedIndex].title}
              </h3>
              <p className="font-sans text-offwhite/60">
                {allImages[selectedIndex].description}
              </p>
            </div>
          </div>
          
          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-sm text-offwhite/40 tracking-widest">
            {selectedIndex + 1} / {allImages.length}
          </div>
        </div>
      )}

      {/* Add CSS animations for infinite scroll */}
      <style>{`
        @keyframes scrollLeftInfinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-33.333%));
          }
        }
        
        @keyframes scrollRightInfinite {
          0% {
            transform: translateX(calc(-33.333%));
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .scroll-left-infinite {
          animation: scrollLeftInfinite linear infinite;
        }
        
        .scroll-right-infinite {
          animation: scrollRightInfinite linear infinite;
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
