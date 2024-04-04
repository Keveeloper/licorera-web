export interface Product {
    id: number;
    name: string;
    serial: string | null;
    lot: string | null;
    image: string;
    description: string;
    category_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    store: Store;
  }
  
  interface Store {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
    status: boolean;
    start_date: string | null;
    end_date: string | null;
    store_type: number;
    points: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    ranking: number | null;
    recommended: boolean;
    newproduct: number;
    ean: string;
    trademark: string;
    maker: string;
    presentation: string;
    bannerImage: string;
    discount: number;
    features_string: string[];
    features: Feature[];
  }
  
  interface Feature {
    id: number;
    store_products_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }