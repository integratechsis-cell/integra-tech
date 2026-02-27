import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, name = 'Integra Tech', type = 'website' }) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title} | {name}</title>
      <meta name='description' content={description} />
      
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* SSL/Security Hints (Browsers handle SSL, but this helps context) */}
      {/* Note: Real SSL requires a valid certificate on the hosting server */}
    </Helmet>
  );
}
