import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Calendar, Clock, MessageSquare, MapPin, ChevronDown, Loader2, Stethoscope, Shield, Heart, Star, Award, Users } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Footer from "@/components/sections/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

import dentalReservationBanner from "@/assets/dental-reservation-banner.jpg";

const timeSlots = ["09h00", "09h30", "10h00", "10h30", "11h00", "11h30", "14h00", "14h30", "15h00", "15h30", "16h00", "16h30", "17h00", "17h30", "18h00"];

const serviceOptions = [
  "Consultation générale",
  "Détartrage & Nettoyage",
  "Blanchiment dentaire",
  "Soins d'urgence",
  "Implantologie",
  "Orthodontie",
  "Pédodontie",
  "Autre"
];

// Validation schema
const reservationSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Adresse email invalide").max(255),
  phone: z.string().trim().min(8, "Numéro de téléphone invalide").max(20),
  date: z.string().min(1, "Date requise"),
  time: z.string().min(1, "Heure requise"),
  service: z.string().min(1, "Type de consultation requis"),
  requests: z.string().max(1000).optional()
});

const ReservationsPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    requests: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = reservationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Veuillez corriger les erreurs du formulaire");
      return;
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setErrors({ date: "La date doit être aujourd'hui ou dans le futur" });
      toast.error("La date doit être aujourd'hui ou dans le futur");
      return;
    }

    setIsSubmitting(true);
    try {
      const reservationId = crypto.randomUUID();
      const timeFormatted = formData.time.replace('h', ':');

      const reservationData = {
        id: reservationId,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        time: timeFormatted,
        guests: 1,
        occasion: formData.service,
        special_requests: formData.requests?.trim() || null,
        status: 'pending' as const
      };

      const { error } = await supabase.from('reservations').insert(reservationData);

      if (error) {
        console.error('Reservation error:', error);
        toast.error("Une erreur est survenue. Veuillez réessayer.");
        return;
      }

      toast.success("Rendez-vous demandé avec succès!");
      window.scrollTo(0, 0);
      navigate(`/reservations/confirmation?id=${reservationId}`, {
        state: {
          reservation: {
            id: reservationId,
            name: reservationData.name,
            email: reservationData.email,
            date: reservationData.date,
            time: reservationData.time,
            guests: reservationData.guests,
            special_requests: reservationData.special_requests,
            status: reservationData.status,
            created_at: new Date().toISOString()
          }
        }
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end justify-center overflow-hidden pb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dental-dark/70 via-dental-dark/50 to-background" />
        
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-primary mb-4 font-medium">
            Centre Dentaire
          </p>
          <h1 className="font-heading text-4xl md:text-6xl text-dental-light mb-4 font-semibold">
            Prendre <span className="text-primary">Rendez-vous</span>
          </h1>
          <p className="font-sans text-dental-light/70 max-w-lg mx-auto">
            Réservez votre consultation en quelques clics
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            
            {/* Left Side - Info Cards */}
            <div className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              
              {/* Hours Card */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock size={18} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-sm tracking-wide uppercase text-foreground font-medium">Horaires</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-sm text-muted-foreground">Lun — Ven</span>
                    <span className="font-sans text-sm text-foreground font-medium">9h00 — 19h00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-sm text-muted-foreground">Samedi</span>
                    <span className="font-sans text-sm text-foreground font-medium">9h00 — 13h00</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="font-sans text-sm text-muted-foreground">Dimanche</span>
                    <span className="font-sans text-sm text-muted-foreground italic">Fermé</span>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-sm tracking-wide uppercase text-foreground font-medium">Adresse</h3>
                </div>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  123 Avenue de la Santé<br />
                  75014 Paris, France
                </p>
              </div>

              {/* Contact Card */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-sm tracking-wide uppercase text-foreground font-medium">Contact</h3>
                </div>
                <div className="space-y-2">
                  <a href="tel:+33142681234" className="block font-sans text-foreground hover:text-primary transition-colors">
                    01 42 68 12 34
                  </a>
                  <a href="mailto:contact@centredentaire.fr" className="block font-sans text-muted-foreground hover:text-primary transition-colors text-sm">
                    contact@centredentaire.fr
                  </a>
                </div>
              </div>

              {/* Urgence Card */}
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-primary-foreground">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <Phone size={18} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-sans text-sm tracking-wide uppercase font-medium">Urgences</h3>
                </div>
                <p className="font-sans text-primary-foreground/80 text-sm leading-relaxed mb-3">
                  En cas d'urgence dentaire, contactez-nous immédiatement.
                </p>
                <a href="tel:+33142681234" className="font-heading text-xl font-semibold">
                  01 42 68 12 34
                </a>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className={`lg:col-span-3 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border">
                {/* Decorative top accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                  <Calendar size={24} className="text-primary-foreground" />
                </div>

                {/* Form Header */}
                <div className="text-center mb-10 pt-6">
                  <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2 font-semibold">
                    Réservez Votre Consultation
                  </h2>
                  <p className="font-sans text-sm text-muted-foreground">
                    Confirmation sous 24 heures
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-sans text-xs tracking-wide uppercase text-muted-foreground">
                      Nom complet <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User size={18} />
                      </div>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        className={`w-full bg-background border rounded-xl pl-12 pr-4 py-4 text-foreground font-sans placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${errors.name ? 'border-destructive' : 'border-border'}`}
                        placeholder="Jean Dupont" 
                      />
                    </div>
                    {errors.name && <p className="font-sans text-xs text-destructive">{errors.name}</p>}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block font-sans text-xs tracking-wide uppercase text-muted-foreground">
                        Email <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Mail size={18} />
                        </div>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          required 
                          className={`w-full bg-background border rounded-xl pl-12 pr-4 py-4 text-foreground font-sans placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${errors.email ? 'border-destructive' : 'border-border'}`}
                          placeholder="votre@email.com" 
                        />
                      </div>
                      {errors.email && <p className="font-sans text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block font-sans text-xs tracking-wide uppercase text-muted-foreground">
                        Téléphone <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Phone size={18} />
                        </div>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          required 
                          className={`w-full bg-background border rounded-xl pl-12 pr-4 py-4 text-foreground font-sans placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${errors.phone ? 'border-destructive' : 'border-border'}`}
                          placeholder="06 12 34 56 78" 
                        />
                      </div>
                      {errors.phone && <p className="font-sans text-xs text-destructive">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Service Type */}
                  <div className="space-y-2">
                    <label htmlFor="service" className="block font-sans text-xs tracking-wide uppercase text-muted-foreground">
                      Type de consultation <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Stethoscope size={18} />
                      </div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                        <ChevronDown size={18} />
                      </div>
                      <select 
                        id="service" 
                        name="service" 
                        value={formData.service} 
                        onChange={handleChange} 
                        required 
                        className={`w-full bg-background border rounded-xl pl-12 pr-10 py-4 text-foreground font-sans focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer ${errors.service ? 'border-destructive' : 'border-border'}`}
                      >
                        <option value="" disabled>Sélectionnez le type de soin</option>
                        {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    {errors.service && <p className="font-sans text-xs text-destructive">{errors.service}</p>}
                  </div>

                  {/* Date & Time */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="date" className="block font-sans text-xs tracking-wide uppercase text-muted-foreground">
                        Date souhaitée <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Calendar size={18} />
                        </div>
                        <input 
                          type="date" 
                          id="date" 
                          name="date" 
                          value={formData.date} 
                          onChange={handleChange} 
                          min={getMinDate()} 
                          required 
                          className={`w-full bg-background border rounded-xl pl-12 pr-4 py-4 text-foreground font-sans focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer ${errors.date ? 'border-destructive' : 'border-border'}`}
                        />
                      </div>
                      {errors.date && <p className="font-sans text-xs text-destructive">{errors.date}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="time" className="block font-sans text-xs tracking-wide uppercase text-muted-foreground">
                        Heure préférée <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Clock size={18} />
                        </div>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                          <ChevronDown size={18} />
                        </div>
                        <select 
                          id="time" 
                          name="time" 
                          value={formData.time} 
                          onChange={handleChange} 
                          required 
                          className={`w-full bg-background border rounded-xl pl-12 pr-10 py-4 text-foreground font-sans focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer ${errors.time ? 'border-destructive' : 'border-border'}`}
                        >
                          <option value="" disabled>Sélectionnez l'heure</option>
                          {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
                        </select>
                      </div>
                      {errors.time && <p className="font-sans text-xs text-destructive">{errors.time}</p>}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <label htmlFor="requests" className="block font-sans text-xs tracking-wide uppercase text-muted-foreground">
                      Message (optionnel)
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-4 text-muted-foreground">
                        <MessageSquare size={18} />
                      </div>
                      <textarea 
                        id="requests" 
                        name="requests" 
                        value={formData.requests} 
                        onChange={handleChange} 
                        rows={3} 
                        className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-4 text-foreground font-sans placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        placeholder="Décrivez vos symptômes ou besoins particuliers..." 
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full mt-8 px-8 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-wide uppercase rounded-full hover:bg-secondary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Demander un Rendez-vous"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-primary mb-4">
              Pourquoi nous choisir
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground font-semibold">
              Votre Confort, Notre Priorité
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Stethoscope className="text-primary" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Équipement Moderne</h3>
              <p className="font-sans text-sm text-muted-foreground">
                Technologies de pointe pour des soins précis et efficaces.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Heart className="text-primary" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Approche Douce</h3>
              <p className="font-sans text-sm text-muted-foreground">
                Des soins attentifs dans un environnement apaisant.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Shield className="text-primary" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Hygiène Stricte</h3>
              <p className="font-sans text-sm text-muted-foreground">
                Protocoles rigoureux pour votre sécurité sanitaire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dentalReservationBanner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dental-dark/95 via-dental-dark/85 to-dental-dark/95" />
        
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-primary mb-4 font-medium">
                Clinique Dentaire du Parc
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-dental-light font-semibold mb-6">
                Des Soins d'Excellence pour Toute la Famille
              </h2>
              <p className="font-sans text-dental-light/70 leading-relaxed mb-8">
                Notre équipe de dentistes qualifiés vous accompagne avec professionnalisme et bienveillance. 
                Nous utilisons les technologies les plus avancées pour garantir des soins de qualité optimale.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Award className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-heading text-2xl text-dental-light font-semibold">15+</p>
                    <p className="font-sans text-xs text-dental-light/60 uppercase tracking-wide">Ans d'expérience</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-heading text-2xl text-dental-light font-semibold">10 000+</p>
                    <p className="font-sans text-xs text-dental-light/60 uppercase tracking-wide">Patients satisfaits</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Star className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-heading text-2xl text-dental-light font-semibold">4.9/5</p>
                    <p className="font-sans text-xs text-dental-light/60 uppercase tracking-wide">Note moyenne</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="bg-dental-light/10 backdrop-blur-sm rounded-3xl p-8 border border-dental-light/20">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                    <Phone className="text-primary-foreground" size={24} />
                  </div>
                  <h3 className="font-heading text-xl text-dental-light font-semibold mb-2">Besoin d'aide ?</h3>
                  <p className="font-sans text-dental-light/60 text-sm mb-4">Notre équipe est à votre écoute</p>
                  <a 
                    href="tel:+33142681234" 
                    className="font-heading text-2xl text-primary font-semibold hover:text-secondary transition-colors"
                  >
                    01 42 68 12 34
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReservationsPage;