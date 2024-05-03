import { reducer } from "../../store";
import { LoadingStatus } from "../../tools";

export type RootState = ReturnType<typeof reducer>;

export interface PromotionState {
    state: Data ;
    error: string | null | undefined;
    loadingStatus: LoadingStatus;
}

export interface Data {
    data:PromotionCampaign[];
    success:boolean;
    message:string
}

export interface PromotionCampaign {
    id: number;
    name: string;
    description: string;
    mainImageUrl: string;
    secondImageUrl: string;
    type: number;
    categoryId: number,
    categoryName?: string,
    products?: Products[],
  }

interface Products {
    
}