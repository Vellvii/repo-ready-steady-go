import { toast } from 'sonner';

// Shopify API Configuration
export const SHOPIFY_API_VERSION = '2025-07';
export const SHOPIFY_STORE_PERMANENT_DOMAIN = 'vellvii-site-2h1iu.myshopify.com';
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = 'ccac5d8a630596d8084334c5ca58fd93';

// Media Types for 3D models, videos, and images
export interface ShopifyMediaSource {
  url: string;
  format: string;
  mimeType: string;
}

export interface ShopifyMediaImage {
  mediaContentType: 'IMAGE';
  image: {
    url: string;
    altText: string | null;
  };
}

export interface ShopifyMediaModel3d {
  mediaContentType: 'MODEL_3D';
  alt: string | null;
  sources: ShopifyMediaSource[];
}

export interface ShopifyMediaVideo {
  mediaContentType: 'VIDEO';
  sources: ShopifyMediaSource[];
}

export type ShopifyMedia = ShopifyMediaImage | ShopifyMediaModel3d | ShopifyMediaVideo;

export interface ShopifyCollection {
  node: {
    id: string;
    title: string;
    handle: string;
  };
}

// Product Types
export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    media?: {
      edges: Array<{
        node: ShopifyMedia;
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          image?: {
            url: string;
            altText: string | null;
          } | null;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;

        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
    metafields?: Array<{
      key: string;
      namespace: string;
      value: string;
      type: string;
    } | null>;
  };
}

// Parse Judge.me review metafields. Returns null when there are no real reviews
// so we never emit fake or empty aggregateRating data into Product JSON-LD.
export function parseReviewMetafields(
  product: ShopifyProduct | null | undefined
): { ratingValue: number; reviewCount: number } | null {
  const mfs = product?.node?.metafields;
  if (!mfs || !Array.isArray(mfs)) return null;

  const ratingMf = mfs.find((m) => m && m.namespace === 'reviews' && m.key === 'rating');
  const countMf = mfs.find((m) => m && m.namespace === 'reviews' && m.key === 'rating_count');

  if (!ratingMf || !countMf) return null;

  // Judge.me stores rating as a JSON rating type: {"value":"4.8","scale_min":"1.0","scale_max":"5.0"}
  let ratingValue = 0;
  try {
    const parsed = JSON.parse(ratingMf.value);
    ratingValue = typeof parsed === 'object' ? parseFloat(parsed.value) : parseFloat(ratingMf.value);
  } catch {
    ratingValue = parseFloat(ratingMf.value);
  }

  const reviewCount = parseInt(countMf.value, 10);

  if (!reviewCount || reviewCount <= 0 || !ratingValue || isNaN(ratingValue)) return null;

  return { ratingValue, reviewCount };
}

// Storefront API helper function
export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active billing plan. Visit admin.shopify.com to upgrade.",
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

// GraphQL Queries
// Product fragment for reuse
const PRODUCT_FIELDS = `
  id
  title
  description
  handle
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  images(first: 50) {
    edges {
      node {
        url
        altText
      }
    }
  }
  media(first: 50) {
    edges {
      node {
        mediaContentType
        ... on MediaImage {
          image {
            url
            altText
          }
        }
        ... on Model3d {
          alt
          sources {
            url
            format
            mimeType
          }
        }
        ... on Video {
          sources {
            url
            format
            mimeType
          }
        }
      }
    }
  }
  variants(first: 20) {
    edges {
      node {
        id
        title
        price {
          amount
          currencyCode
        }
        availableForSale
        selectedOptions {
          name
          value
        }
      }
    }
  }
  options {
    name
    values
  }
  metafields(identifiers: [
    { namespace: "reviews", key: "rating" },
    { namespace: "reviews", key: "rating_count" }
  ]) {
    key
    namespace
    value
    type
  }
`;

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ${PRODUCT_FIELDS}
    }
  }
`;

export const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

export const PRODUCTS_BY_COLLECTION_QUERY = `
  query GetProductsByCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      title
      products(first: $first) {
        edges {
          node {
            ${PRODUCT_FIELDS}
          }
        }
      }
    }
  }
`;

// Cart Queries/Mutations
export const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

// Helper functions for cart operations
export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    // Shopify returns the URL on the store's primary domain (vellvii.com),
    // but that domain serves the Lovable SPA - not Shopify's checkout. Force
    // the host to the Shopify permanent domain so checkout actually loads.
    if (url.hostname !== SHOPIFY_STORE_PERMANENT_DOMAIN) {
      url.hostname = SHOPIFY_STORE_PERMANENT_DOMAIN;
      url.protocol = 'https:';
      url.port = '';
    }
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

export function isCartNotFoundError(userErrors: Array<{ field: string[] | null; message: string }>): boolean {
  return userErrors.some(e => 
    e.message.toLowerCase().includes('cart not found') || 
    e.message.toLowerCase().includes('does not exist')
  );
}
