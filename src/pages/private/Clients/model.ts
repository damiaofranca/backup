export interface Client {
  id: string;
  name: string;
  email: string;
  document: string;
  birth_date: string;
  brand_card: string;
  update_at: string | Date;
  create_at: string | Date;
  last_four_numbers: string;
}
