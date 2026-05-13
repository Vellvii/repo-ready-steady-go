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
    aggregateRating?: {
      ratingValue: number;
      reviewCount: number;
    };
  };
  faqData?: Array<{ question: string; answer: string }>;
  articleData?: {
    headline: string;
    description: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
    url?: string;
    section?: string;
  };
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
  /** When true, emits `noindex, follow` so this page is excluded from search indexes but links are still crawled. */
  noindex?: boolean;
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
  articleData,
  organizationData,
  breadcrumbs,
  keywords,
  videoData,
  hreflang = 'en-us',
  noindex = false,
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
            itemCondition: `https://schema.org/${productData.itemCondition || 'NewCondition'}`,
            ...(productData.priceValidUntil && { priceValidUntil: productData.priceValidUntil }),
            ...(productData.url && { url: productData.url.startsWith('http') ? productData.url : `${SITE_URL}${productData.url}` }),
            seller: { '@type': 'Organization', name: 'Vellvii' },
          },
        }),
        ...(productData.images && {
          image: productData.images.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`)),
        }),
        ...(productData.sku && { sku: productData.sku }),
        ...(productData.aggregateRating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: productData.aggregateRating.ratingValue,
            reviewCount: productData.aggregateRating.reviewCount,
          },
        }),
      }
    : null;

  // Video Schema
  const videoSchema = videoData
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: videoData.name,
        description: videoData.description,
        thumbnailUrl: videoData.thumbnailUrl.startsWith('http') ? videoData.thumbnailUrl : `${SITE_URL}${videoData.thumbnailUrl}`,
        contentUrl: videoData.contentUrl.startsWith('http') ? videoData.contentUrl : `${SITE_URL}${videoData.contentUrl}`,
        uploadDate: videoData.uploadDate,
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

  // Article Schema
  const articleSchema = articleData
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: articleData.headline,
        description: articleData.description,
        datePublished: articleData.datePublished,
        dateModified: articleData.dateModified || articleData.datePublished,
        ...(articleData.section && { articleSection: articleData.section }),
        image: (articleData.image
          ? (articleData.image.startsWith('http') ? articleData.image : `${SITE_URL}${articleData.image}`)
          : `${SITE_URL}/uploads/Vellvii-full-logo-transparent.png`),
        author: { '@type': 'Organization', name: 'Vellvii', url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'Vellvii',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/uploads/Vellvii-full-logo-transparent.png`,
          },
        },
        ...(articleData.url && {
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleData.url.startsWith('http') ? articleData.url : `${SITE_URL}${articleData.url}`,
          },
        }),
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
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hrefLang={hreflang} href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content="Vellvii" />
      <meta property="og:locale" content="en_US" />
      {productData?.price && (
        <meta property="product:price:amount" content={String(productData.price)} />
      )}
      {productData?.price && (
        <meta property="product:price:currency" content={productData.currency || 'USD'} />
      )}
      {productData?.availability && (
        <meta property="product:availability" content={productData.availability.toLowerCase()} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional SEO */}
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
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
      {videoSchema && (
        <script type="application/ld+json">
          {JSON.stringify(videoSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
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
