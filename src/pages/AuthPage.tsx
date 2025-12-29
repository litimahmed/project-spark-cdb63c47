import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/auth/AuthForm';
import { Helmet } from 'react-helmet-async';
import { UtensilsCrossed } from 'lucide-react';

const AuthPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/admin');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Connexion | Maison le Sept</title>
        <meta name="description" content="Connectez-vous à votre espace administrateur Maison le Sept." />
      </Helmet>
      
      <div className="min-h-screen h-screen w-full flex relative">
        {/* Left Side - Background Image */}
        <div className="hidden lg:block relative w-1/2 h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-charcoal/70" />
          
          {/* Left Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="p-16 max-w-lg">
              <a href="/" className="mb-12 block">
                <span className="font-luxury text-4xl text-offwhite italic tracking-wide">
                  Maison le Sept
                </span>
              </a>
              <h1 className="font-serif text-5xl text-offwhite mb-6 leading-tight">
                Espace<br />Administrateur
              </h1>
              <p className="text-offwhite/60 text-lg">
                Gérez votre établissement avec élégance.
              </p>
              <div className="gold-line w-24 mt-8" />
            </div>
          </div>
        </div>

        {/* Center Divider with Icon */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-gold/50 flex items-center justify-center shadow-2xl">
            <UtensilsCrossed className="w-7 h-7 text-gold" />
          </div>
        </div>

        {/* Right Side - Login Form (Full Height) */}
        <div className="w-full lg:w-1/2 h-full bg-slate-900 flex flex-col">
          {/* Mobile Header */}
          <div className="lg:hidden p-6 border-b border-offwhite/10">
            <a href="/" className="font-luxury text-2xl text-offwhite italic tracking-wide">
              Maison le Sept
            </a>
          </div>

          {/* Form Container */}
          <div className="flex-1 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="mb-10">
                <h2 className="font-serif text-3xl text-offwhite mb-3">Connexion</h2>
                <p className="text-slate-500 text-sm tracking-wide">Accédez à votre tableau de bord</p>
              </div>

              <AuthForm />

              {/* Footer */}
              <div className="mt-10 pt-6 border-t border-slate-700/30">
                <p className="text-slate-600 text-xs text-center tracking-wide uppercase">
                  Accès réservé aux administrateurs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;