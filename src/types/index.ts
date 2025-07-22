export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  origin: string;
  roast_level: 'light' | 'medium' | 'dark';
  tasting_notes: string[];
  stock: number;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  created_at: string;
}