export interface Product {
  id: string;
  name: string;
  description: string;
  partner: string;
  updated_at: Date | null;
  created_at: Date;
  offers: Offer[];
}

export interface Offer {
  id: string;
  name: string;
  price: number;
  description: string;
  external_service_id: number;
  grace_period: number;
  created_at: Date;
  updated_at: Date | null;
}
