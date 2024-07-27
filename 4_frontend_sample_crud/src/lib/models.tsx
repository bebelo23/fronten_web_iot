export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  detail: string;
  synopsis: string;
  category: string;
  is_published: boolean;
}

export interface Coffee {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface Order {
  id: number;
  coffee_id: number;
  quantity: number;
  total_price: number;
  notes: string;
}
