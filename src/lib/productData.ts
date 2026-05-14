// Central product data source for consistency across the app
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  features: string[];
  route: string;
}

export const PRODUCTS: Record<string, Product> = {
  pulse: {
    id: 'pulse',
    name: 'Vellvii Pulse',
    price: 299,
    description: 'Rhythmic Clitoral Stimulator',
    images: ['/uploads/Pulse1.jpg', '/uploads/Pulse2.jpg'],
    features: ['10 Intensities', 'Designed for Everyday Care', 'Whisper Quiet'],
    route: '/pulse'
  },
  vibe: {
    id: 'vibe',
    name: 'Vellvii Vibe',
    price: 349,
    description: 'Internal & External Vibrator',
    images: ['/uploads/Vibe1.jpg', '/uploads/Vibe2.jpg'],
    features: ['8 Vibration Modes', 'Ergonomic Design', 'Smart Memory'],
    route: '/vibe'
  },
  'g-vibe': {
    id: 'g-vibe',
    name: 'Vellvii G-Vibe',
    price: 279,
    description: 'G-Spot Vibrator',
    images: ['/uploads/G-Vibe1.jpg', '/uploads/G-Vibe2.jpg', '/uploads/G-Vibe3.jpg'],
    features: ['6 Patterns', 'G-Spot Angled', 'LED Glow'],
    route: '/g-vibe'
  },
  dox: {
    id: 'dox',
    name: 'Vellvii DOX',
    price: 899,
    description: 'Luxury Storage Box',
    images: ['/uploads/Dox1.jpg', '/uploads/Dox2.jpg', '/uploads/Dox3.jpg', '/uploads/Dox4.jpg', '/uploads/Dox5.jpg'],
    features: ['Refined Textured Exterior', 'Biometric Lock Box', 'Designed for Everyday Care'],
    route: '/dox'
  }
};

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS[id];
};

export const getAllProducts = (): Product[] => {
  return Object.values(PRODUCTS);
};