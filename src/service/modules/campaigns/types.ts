import { BaseResponse } from "../../tools/baseResponse";

export interface ResponsePromotions extends BaseResponse {
    data: PromotionCampaign[];
}

interface PromotionCampaign {
    id: number;
    name: string;
    description: string;
    mainImageUrl: string;
    secondImageUrl: string;
    type: number;
    categoryId: number,
    categoryName: string,
}
  