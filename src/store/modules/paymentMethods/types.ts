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
    name: string;
    image: string;
    quantity: number;
    start_date: string;
    end_date: string;
    promotion_type: number;
    store_product_id: number;
    discount: number | null;
    quantity_minimal: number | null;
    divider: number | null;
    multiplier: number | null;
    price: number;
    description: string;
    diageo: number;
  }