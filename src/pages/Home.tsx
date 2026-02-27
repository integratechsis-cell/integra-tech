import React from 'react';
import { Hero } from '../components/home/Hero';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CTASection } from '../components/home/CTASection';
import { SEO } from '../components/common/SEO';

export const Home: React.FC = () => {
  return (
    <div>
      <SEO title="Inicio" description="Bienvenido a Integra Tech, tu aliado en soluciones tecnológicas." />
      <Hero />
      <ServicesPreview />
      <FeaturedProducts />
      <CTASection />
    </div>
  );
};
