import { reducer } from "../../store";
import { LoadingStatus } from "../../tools";

export type RootState = ReturnType<typeof reducer>;

export interface PromotionState {
    data: Promotion ;
    error: string | null | undefined;
    loadingStatus: LoadingStatus;
}

export interface Promotion {
    id?: number;
    name?: string;
    image?: string;
    quantity?: number;
    start_date?: string;
    end_date?: string;
    promotion_type?: number;
    store_product_id?: number;
    discount?: null | number;
    quantity_minimal?: null | number;
    divider?: null | number;
    multiplier?: null | number;
    price?: number;
    description?: string;
  }