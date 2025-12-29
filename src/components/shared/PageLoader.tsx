import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import loaderAnimation from '@/assets/loader.json';

interface PageLoaderProps {
  onLoadComplete?: () => void;
}

const PageLoader = ({ onLoadComplete }: PageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Wait for images and resources to load
    const handleLoad = () => {
      // Reduced minimum display time for faster page loads
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
          onLoadComplete?.();
        }, 400); // Match fade-out animation duration
      }, 600); // Reduced minimum loader display time
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [onLoadComplete]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Loader Animation */}
      <div className="w-32 h-32 md:w-40 md:h-40">
        <Lottie 
          animationData={loaderAnimation} 
          loop={true}
          className="w-full h-full"
        />
      </div>
      
      {/* Restaurant Name */}
      <h1 className="mt-6 font-serif text-2xl md:text-3xl tracking-[0.3em] text-foreground">
        MAISON LE SEPT
      </h1>
      

      {/* Decorative gold line */}
      <div className="mt-6 w-24 gold-line" />
    </div>
  );
};

export default PageLoader;
