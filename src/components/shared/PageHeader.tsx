import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { name: 'À Propos', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Galerie', href: '/gallery' },
  { name: 'Contact', href: '/#contact' },
];

const PageHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-lg py-4'
          : 'bg-gradient-to-b from-dental-dark/80 to-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center"
          >
            <span className={`font-heading text-xl font-semibold tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-foreground' : 'text-dental-light'
            } group-hover:text-primary`}>
              Clinique Dentaire du Parc
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative font-sans text-sm font-medium transition-all duration-300 py-2 group ${
                  isScrolled ? 'text-foreground/70 hover:text-primary' : 'text-dental-light/80 hover:text-dental-light'
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+33142681234"
              className={`flex items-center gap-2 font-sans text-sm font-medium transition-colors ${
                isScrolled ? 'text-foreground/70 hover:text-primary' : 'text-dental-light/80 hover:text-dental-light'
              }`}
            >
              <Phone size={16} />
              <span>01 42 68 12 34</span>
            </a>
            <Link
              to="/reservations"
              onClick={() => window.scrollTo(0, 0)}
              className="px-6 py-2.5 font-sans text-sm font-medium transition-all duration-300 bg-primary text-primary-foreground rounded-full hover:bg-secondary hover:shadow-lg hover:shadow-primary/25"
            >
              Rendez-vous
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-foreground hover:text-primary' : 'text-dental-light hover:text-primary'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`flex flex-col gap-1 py-6 border-t ${isScrolled ? 'border-border' : 'border-dental-light/10'}`}>
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-sans text-sm font-medium py-3 px-4 transition-all duration-300 rounded-lg ${
                  isScrolled 
                    ? 'text-foreground/70 hover:text-primary hover:bg-muted' 
                    : 'text-dental-light/80 hover:text-dental-light hover:bg-dental-light/5'
                }`}
                style={{ 
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/reservations"
              onClick={() => { setIsMobileMenuOpen(false); window.scrollTo(0, 0); }}
              className="mt-4 mx-4 px-6 py-3 bg-primary text-primary-foreground font-sans text-sm font-medium text-center rounded-full hover:bg-secondary transition-all duration-300"
              style={{ 
                transitionDelay: isMobileMenuOpen ? `${navLinks.length * 50}ms` : '0ms',
              }}
            >
              Prendre Rendez-vous
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PageHeader;