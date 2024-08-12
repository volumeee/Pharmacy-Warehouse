export interface Medicine {
  id: number;
  name: string;
  description: string | null;
  price: number;
  minStock: number;
  quantity: number;
  reorderLevel: number;
  supplierId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id: number;
  name: string;
  contactInfo: string;
  terms: string;
}
