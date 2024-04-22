import { reducer } from "../../store";
import { LoadingStatus } from "../../tools";

export type RootState = ReturnType<typeof reducer>;

export interface PromotionState {
    state: Data ;
    error: string | null | undefined;
    loadingStatus: LoadingStatus;
}

export interface Data {
    data:Promotion[];
    success:boolean;
    message:string
}

export interface Promotion {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
    status: boolean;
    start_date: string;
    end_date: string;
    store_type: number;
    points: number;
    presentation: string;
    features_string: string[];
    isExchange: boolean;
    product: Product;
  }

  interface Product {
    id: number;
    name: string;
    serial: string;
    lot: string;
    image: string;
    description: string;
    category_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  }