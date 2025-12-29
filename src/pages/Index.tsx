import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Doctors from '@/components/sections/Doctors';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import Reservations from '@/components/sections/Reservations';
import Footer from '@/components/sections/Footer';
import BackToTop from '@/components/shared/BackToTop';

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Doctors />
      <Gallery />
      <Testimonials />
      <Reservations />
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Index;
