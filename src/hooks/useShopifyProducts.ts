import { useQuery } from '@tanstack/react-query';
import { 
  storefrontApiRequest, 
  PRODUCTS_QUERY, 
  PRODUCT_BY_HANDLE_QUERY, 
  COLLECTIONS_QUERY,
  PRODUCTS_BY_COLLECTION_QUERY,
  ShopifyProduct,
  ShopifyCollection 
} from '@/lib/shopify';

export function useShopifyProducts(limit: number = 20) {
  return useQuery({
    queryKey: ['shopify-products', limit],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: limit });
      if (!data?.data?.products?.edges) {
        throw new Error('Failed to fetch products');
      }
      return data.data.products.edges as ShopifyProduct[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useShopifyProduct(handle: string) {
  return useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      if (!data?.data?.productByHandle) {
        throw new Error('Product not found');
      }
      // Wrap in the expected format
      return { node: data.data.productByHandle } as ShopifyProduct;
    },
    enabled: !!handle,
    staleTime: 1000 * 60 * 5,
  });
}

export function useShopifyCollections(limit: number = 20) {
  return useQuery({
    queryKey: ['shopify-collections', limit],
    queryFn: async () => {
      const data = await storefrontApiRequest(COLLECTIONS_QUERY, { first: limit });
      if (!data?.data?.collections?.edges) {
        throw new Error('Failed to fetch collections');
      }
      return data.data.collections.edges as ShopifyCollection[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useShopifyProductsByCollection(collectionHandle: string | null, limit: number = 20) {
  return useQuery({
    queryKey: ['shopify-products-by-collection', collectionHandle, limit],
    queryFn: async () => {
      if (!collectionHandle) {
        // Fetch all products if no collection selected
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: limit });
        if (!data?.data?.products?.edges) {
          throw new Error('Failed to fetch products');
        }
        return data.data.products.edges as ShopifyProduct[];
      }
      
      const data = await storefrontApiRequest(PRODUCTS_BY_COLLECTION_QUERY, { 
        handle: collectionHandle, 
        first: limit 
      });
      if (!data?.data?.collection?.products?.edges) {
        throw new Error('Failed to fetch products from collection');
      }
      return data.data.collection.products.edges as ShopifyProduct[];
    },
    staleTime: 1000 * 60 * 5,
  });
}
