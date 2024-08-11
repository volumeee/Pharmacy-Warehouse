// Define the Medicine type as required by your application
export interface Medicine {
  id: number;
  name: string;
  description: string | null;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  minStock: number;
  quantity: number;
  reorderLevel: number;
  suplierId: number;
}

export interface Supplier {
  id: number;
  name: string;
  contactInfo: string;
  terms: string;
}
