import { BaseResponse } from "../../tools/baseResponse";

export interface ResponsePromotions extends BaseResponse {
    data: Promotion[];
}

interface Promotion {
    id_customer: string,
    name: string,
    created: string,
    email: string,
    phone: string,
    address: string,
    cards: Cards[],
}

interface Cards {
    token: string,
    franchise: string,
    mask: string,
    created: string,
    default: boolean,
}
  