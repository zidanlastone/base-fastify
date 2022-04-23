import {KnexRepository} from './BaseRepository';

export interface Product {
  id: number;
  product_name: string;
  product_price: number;
  created_at: Date;
  updated_at: Date;
}

export class ProductRepository extends KnexRepository<Product> {

}