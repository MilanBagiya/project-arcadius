import { Product } from './product.model';

export interface PurchaseOrder {
  orderNumber: string;
  description: string;
  date: Date;
  products: Product[];
  status?: 'active' | 'pending' | 'completed';
  totalItems?: number;
}
