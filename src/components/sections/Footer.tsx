import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-dental-dark text-dental-light">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-heading text-xl font-semibold text-dental-light">Clinique Dentaire du Parc</span>
            </div>
            <p className="font-sans text-sm text-dental-light/60 leading-relaxed mb-6">
              Votre sourire, notre priorité. Nous offrons des soins dentaires de qualité 
              dans un environnement moderne et accueillant pour toute la famille.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-dental-light/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-dental-light/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-dental-light/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-dental-light mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary flex-shrink-0 mt-1" size={18} />
                <span className="font-sans text-sm text-dental-light/60">
                  123 Avenue de la Santé
                  <br />
                  75014 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={18} />
                <a
                  href="tel:+33142681234"
                  className="font-sans text-sm text-dental-light/60 hover:text-primary transition-colors"
                >
                  01 42 68 12 34
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary flex-shrink-0" size={18} />
                <a
                  href="mailto:contact@centredentaire.fr"
                  className="font-sans text-sm text-dental-light/60 hover:text-primary transition-colors"
                >
                  contact@centredentaire.fr
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-dental-light mb-6">Horaires</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="text-primary flex-shrink-0 mt-1" size={18} />
                <div className="font-sans text-sm text-dental-light/60">
                  <p className="mb-1">Lundi - Vendredi</p>
                  <p className="text-dental-light font-medium">9h00 - 19h00</p>
                </div>
              </li>
              <li className="flex items-start gap-3 pl-[30px]">
                <div className="font-sans text-sm text-dental-light/60">
                  <p className="mb-1">Samedi</p>
                  <p className="text-dental-light font-medium">9h00 - 13h00</p>
                </div>
              </li>
              <li className="flex items-start gap-3 pl-[30px]">
                <div className="font-sans text-sm text-dental-light/60">
                  <p>Dimanche - Fermé</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Services Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-dental-light mb-6">Nos Services</h4>
            <ul className="space-y-3">
              {['Dentisterie générale', 'Orthodontie', 'Implants dentaires', 'Blanchiment', 'Soins pédiatriques', 'Urgences dentaires'].map((service) => (
                <li key={service}>
                  <a href="#services" className="font-sans text-sm text-dental-light/60 hover:text-primary transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dental-light/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="font-sans text-xs text-dental-light/40">
              © {currentYear} Clinique Dentaire du Parc. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-sans text-xs text-dental-light/40 hover:text-primary transition-colors">
                Politique de Confidentialité
              </a>
              <a href="#" className="font-sans text-xs text-dental-light/40 hover:text-primary transition-colors">
                Mentions Légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;