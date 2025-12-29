import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Calendar, Clock, Users, MapPin, Mail, Home } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

interface ReservationData {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  special_requests: string | null;
  status: string;
  created_at: string;
}

const ReservationConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);
  const [loading, setLoading] = useState(true);

  const reservationId = searchParams.get('id');

  useEffect(() => {
    // Ensure scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Get reservation data from navigation state (passed from ReservationsPage)
    const stateData = location.state?.reservation as ReservationData | undefined;

    if (!reservationId) {
      navigate('/');
      return;
    }

    if (stateData && stateData.id === reservationId) {
      // Use data from navigation state
      setReservationData(stateData);
      setLoading(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    } else {
      // No state data available (direct URL access) - show generic confirmation
      setReservationData({
        id: reservationId,
        name: 'Votre réservation',
        email: '',
        date: '',
        time: '',
        guests: 0,
        special_requests: null,
        status: 'pending',
        created_at: new Date().toISOString()
      });
      setLoading(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }
  }, [reservationId, navigate, location.state]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!reservationData) {
    return null;
  }

  // Format the date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate a confirmation number from the ID
  const confirmationNumber = `LS-${reservationData.id.slice(0, 8).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-charcoal">
      <PageHeader />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-end justify-center overflow-hidden pb-12 pt-32">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/50 to-charcoal" />
        
        {/* Decorative Elements */}
        <div className="absolute top-32 left-10 w-32 h-32 border border-gold/20 rotate-45 hidden md:block" />
        <div className="absolute bottom-24 right-16 w-24 h-24 border border-gold/30 rotate-12 hidden md:block" />
        
        {/* Success Icon */}
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-gold/80 flex items-center justify-center shadow-2xl shadow-gold/30 animate-scale-in">
            <CheckCircle size={48} className="text-charcoal" />
          </div>
          
          <h1 className="font-luxury text-4xl md:text-5xl tracking-wide text-offwhite mb-3 italic">
            Réservation Confirmée
          </h1>
          
          <p className="font-sans text-sm md:text-base text-offwhite/70 tracking-wide">
            Nous avons hâte de vous accueillir
          </p>
        </div>
      </section>

      {/* Confirmation Details */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-charcoal via-[#1a1a1a] to-charcoal">
        <div className="max-w-3xl mx-auto px-6">
          
          {/* Confirmation Number Card */}
          <div className={`mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-gradient-to-br from-gold to-gold/90 rounded-2xl p-6 text-center shadow-xl shadow-gold/20">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-charcoal/70 mb-1">Numéro de Confirmation</p>
              <p className="font-luxury text-3xl text-charcoal italic tracking-wider">{confirmationNumber}</p>
            </div>
          </div>

          {/* Main Details Card */}
          <div className={`bg-gradient-to-b from-offwhite/10 to-offwhite/5 backdrop-blur-sm rounded-3xl border border-offwhite/10 overflow-hidden transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Guest Name Header */}
            <div className="bg-offwhite/5 px-8 py-6 border-b border-offwhite/10">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold mb-2">Réservation pour</p>
              <h2 className="font-luxury text-2xl md:text-3xl text-offwhite italic">{reservationData.name}</h2>
            </div>

            {/* Details Grid - only show if we have full data */}
            {reservationData.date && reservationData.time && reservationData.guests > 0 ? (
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* Date */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Calendar size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans text-xs tracking-[0.15em] uppercase text-offwhite/50 mb-1">Date</p>
                      <p className="font-sans text-offwhite capitalize">{formatDate(reservationData.date)}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans text-xs tracking-[0.15em] uppercase text-offwhite/50 mb-1">Heure</p>
                      <p className="font-sans text-offwhite">{reservationData.time.slice(0, 5)}</p>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Users size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans text-xs tracking-[0.15em] uppercase text-offwhite/50 mb-1">Convives</p>
                      <p className="font-sans text-offwhite">{reservationData.guests} {reservationData.guests > 1 ? 'personnes' : 'personne'}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans text-xs tracking-[0.15em] uppercase text-offwhite/50 mb-1">Statut</p>
                      <p className="font-sans text-offwhite">
                        {reservationData.status === 'pending' ? 'En attente de confirmation' : 
                         reservationData.status === 'confirmed' ? 'Confirmée' :
                         reservationData.status === 'cancelled' ? 'Annulée' : 'Terminée'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {reservationData.special_requests && (
                  <div className="mt-8 pt-6 border-t border-offwhite/10">
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-offwhite/50 mb-3">Demandes Spéciales</p>
                    <p className="font-sans text-offwhite/80 italic leading-relaxed">"{reservationData.special_requests}"</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8">
                <p className="font-sans text-offwhite/70 text-center">
                  Votre réservation a été enregistrée. Vous recevrez un email de confirmation sous peu.
                </p>
              </div>
            )}
          </div>

          {/* Contact Info Card - only show if we have email */}
          {reservationData.email && (
            <div className={`mt-8 bg-gradient-to-b from-offwhite/10 to-offwhite/5 backdrop-blur-sm rounded-2xl border border-offwhite/10 p-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-offwhite/50 mb-4">Confirmation envoyée à</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gold" />
                  <span className="font-sans text-offwhite">{reservationData.email}</span>
                </div>
              </div>
            </div>
          )}

          {/* Restaurant Info */}
          <div className={`mt-8 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 text-offwhite/50 mb-2">
              <MapPin size={16} className="text-gold" />
              <span className="font-sans text-sm">7 Avenue des Champs-Élysées, 75008 Paris</span>
            </div>
            <p className="font-sans text-xs text-offwhite/40">
              Tenue décontractée chic appréciée
            </p>
          </div>

          {/* Action Buttons */}
          <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-sans text-sm tracking-[0.15em] uppercase hover:shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5 transition-all duration-300 font-medium"
            >
              <Home size={18} />
              Retour à l'Accueil
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-offwhite font-sans text-sm tracking-[0.15em] uppercase border border-offwhite/30 hover:border-gold hover:text-gold transition-all duration-300"
            >
              Découvrir Notre Carte
            </Link>
          </div>

          {/* Modification Notice */}
          <div className={`mt-12 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="font-sans text-sm text-offwhite/40">
              Pour toute modification ou annulation, veuillez nous contacter au{' '}
              <a href="tel:+33123456789" className="text-gold hover:underline">+33 1 23 45 67 89</a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal border-t border-offwhite/10 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="font-sans text-sm text-offwhite/40 tracking-wider">
            © {new Date().getFullYear()} Maison le Sept. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ReservationConfirmationPage;
