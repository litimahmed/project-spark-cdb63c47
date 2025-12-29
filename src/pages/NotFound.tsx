import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal">
      <div className="text-center">
        <h1 className="mb-4 font-luxury text-6xl text-gold italic">404</h1>
        <p className="mb-6 text-xl text-offwhite/70">Page non trouvée</p>
        <a href="/" className="inline-flex px-8 py-3 bg-gold text-charcoal font-sans text-sm tracking-[0.15em] uppercase rounded-full hover:bg-gold/90 transition-all">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
