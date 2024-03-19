import { BaseResponse } from "../../tools/baseResponse";

export interface ResponsePromotions extends BaseResponse {
    data: Promotion[];
}

interface Promotion {
    id: number;
    price: number;
    bannerImage: string;
    product: Product;
}

interface Product {
    id: string;
    name: string;
    description: string;
}
  