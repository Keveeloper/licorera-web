import { BaseResponse } from "../../tools/baseResponse";

export interface ResponsePromotions extends BaseResponse {
    data: Promotion[];
}

export type ExchangeRequest = {
    page: number;
};

interface Promotion {
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
  