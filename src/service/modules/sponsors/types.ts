import { BaseResponse } from "../../tools/baseResponse";

export interface ResponsePromotions extends BaseResponse {
    data: Promotion[];
}

interface Promotion {
    id: number;
    name: string;
    imageUrl: string;
    active: number;
}
  