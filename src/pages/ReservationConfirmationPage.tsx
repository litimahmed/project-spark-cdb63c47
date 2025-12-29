import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Calendar, Clock, User, MapPin, Mail, Home, Phone, Stethoscope, ArrowRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Footer from "@/components/sections/Footer";

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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const stateData = location.state?.reservation as ReservationData | undefined;

    if (!reservationId) {
      navigate('/');
      return;
    }

    if (stateData && stateData.id === reservationId) {
      setReservationData(stateData);
      setLoading(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    } else {
      setReservationData({
        id: reservationId,
        name: 'Votre rendez-vous',
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!reservationData) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const confirmationNumber = `CDP-${reservationData.id.slice(0, 8).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dental-dark/80 via-dental-dark/70 to-background" />
        
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
          {/* Success Animation */}
          <div className="relative mb-8">
            <div className="absolute inset-0 w-28 h-28 mx-auto rounded-full bg-primary/30 animate-ping" />
            <div className="relative w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/40">
              <CheckCircle size={56} className="text-primary-foreground" strokeWidth={2.5} />
            </div>
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl text-dental-light mb-4 font-semibold">
            Rendez-vous <span className="text-primary">Confirmé</span>
          </h1>
          
          <p className="font-sans text-dental-light/70 max-w-md mx-auto text-lg">
            Merci pour votre confiance. Nous avons hâte de vous accueillir.
          </p>
        </div>
      </section>

      {/* Confirmation Details */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          
          {/* Confirmation Number */}
          <div className={`mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 md:p-8 text-center shadow-xl shadow-primary/20">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary-foreground/70 mb-2">
                Numéro de Confirmation
              </p>
              <p className="font-heading text-3xl md:text-4xl text-primary-foreground font-bold tracking-wider">
                {confirmationNumber}
              </p>
            </div>
          </div>

          {/* Main Details Card */}
          <div className={`bg-card rounded-3xl border border-border shadow-xl overflow-hidden transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Card Header */}
            <div className="bg-muted/50 px-8 py-6 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <User className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                    Rendez-vous pour
                  </p>
                  <h2 className="font-heading text-2xl text-foreground font-semibold">
                    {reservationData.name}
                  </h2>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            {reservationData.date && reservationData.time ? (
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* Date */}
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-2xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="text-primary" size={22} />
                    </div>
                    <div>
                      <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">Date</p>
                      <p className="font-sans text-foreground font-medium capitalize">{formatDate(reservationData.date)}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-2xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="text-primary" size={22} />
                    </div>
                    <div>
                      <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">Heure</p>
                      <p className="font-sans text-foreground font-medium">{reservationData.time.replace(':', 'h')}</p>
                    </div>
                  </div>

                  {/* Service Type (from occasion field) */}
                  {reservationData.special_requests && (
                    <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-2xl">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Stethoscope className="text-primary" size={22} />
                      </div>
                      <div>
                        <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">Consultation</p>
                        <p className="font-sans text-foreground font-medium">{reservationData.special_requests}</p>
                      </div>
                    </div>
                  )}

                  {/* Status */}
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-2xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-primary" size={22} />
                    </div>
                    <div>
                      <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">Statut</p>
                      <p className="font-sans text-foreground font-medium">
                        {reservationData.status === 'pending' ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                            En attente de confirmation
                          </span>
                        ) : reservationData.status === 'confirmed' ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full" />
                            Confirmé
                          </span>
                        ) : 'Traité'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="text-primary" size={28} />
                  </div>
                  <p className="font-sans text-muted-foreground max-w-md mx-auto">
                    Votre demande de rendez-vous a été enregistrée. Vous recevrez un email de confirmation sous 24 heures.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Email Confirmation Notice */}
          {reservationData.email && (
            <div className={`mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-sans text-sm text-foreground font-medium">Email de confirmation envoyé à</p>
                  <p className="font-sans text-primary">{reservationData.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Clinic Info */}
          <div className={`mt-8 bg-card rounded-2xl border border-border p-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="font-heading text-lg text-foreground font-semibold mb-4">Informations pratiques</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-primary flex-shrink-0" size={18} />
                <span className="font-sans text-sm text-muted-foreground">123 Avenue de la Santé, 75014 Paris</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={18} />
                <a href="tel:+33142681234" className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">
                  01 42 68 12 34
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-wide uppercase rounded-full hover:bg-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-medium"
            >
              <Home size={18} />
              Retour à l'Accueil
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-foreground font-sans text-sm tracking-wide uppercase border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300"
            >
              Découvrir Notre Clinique
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Modification Notice */}
          <div className={`mt-12 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="font-sans text-sm text-muted-foreground">
              Pour toute modification ou annulation, veuillez nous contacter au{' '}
              <a href="tel:+33142681234" className="text-primary hover:underline font-medium">01 42 68 12 34</a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReservationConfirmationPage;
