import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'product' | 'article';
  image?: string;
  productData?: {
    name: string;
    description: string;
    price?: number;
    currency?: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
    brand?: string;
    sku?: string;
    images?: string[];
    priceValidUntil?: string;
    itemCondition?: string;
    url?: string;
  };
  faqData?: Array<{ question: string; answer: string }>;
  organizationData?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
  keywords?: string;
  videoData?: {
    name: string;
    description: string;
    thumbnailUrl: string;
    contentUrl: string;
    uploadDate: string;
  };
  hreflang?: string;
}

const SITE_URL = 'https://vellvii.com';
const DEFAULT_IMAGE = `${SITE_URL}/uploads/Vellvii-full-logo-transparent.png`;

export const SEO = ({
  title,
  description,
  canonical,
  type = 'website',
  image = DEFAULT_IMAGE,
  productData,
  faqData,
  organizationData,
  breadcrumbs,
  keywords,
  videoData,
  hreflang = 'en-us',
}: SEOProps) => {
  const fullTitle = title.includes('Vellvii') ? title : `${title} | Vellvii`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;
  const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  // Organization Schema
  const organizationSchema = organizationData
    ? {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Vellvii',
        url: SITE_URL,
        logo: `${SITE_URL}/uploads/Vellvii-full-logo-transparent.png`,
        description: 'Luxury sexual wellness brand redefining intimate pleasure with premium designer products and discreet storage solutions.',
        sameAs: [],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'info@vellvii.com',
          contactType: 'customer service',
        },
      }
    : null;

  // Product Schema
  const productSchema = productData
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productData.name,
        description: productData.description,
        brand: {
          '@type': 'Brand',
          name: productData.brand || 'Vellvii',
        },
        ...(productData.price && {
          offers: {
            '@type': 'Offer',
            price: productData.price,
            priceCurrency: productData.currency || 'USD',
            availability: `https://schema.org/${productData.availability || 'PreOrder'}`,
          },
        }),
        ...(productData.images && {
          image: productData.images.map((img) => `${SITE_URL}${img}`),
        }),
        ...(productData.sku && { sku: productData.sku }),
      }
    : null;

  // FAQ Schema
  const faqSchema = faqData && faqData.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${SITE_URL}${crumb.url}`,
        })),
      }
    : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content="Vellvii" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Vellvii" />

      {/* Structured Data */}
      {organizationSchema && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
