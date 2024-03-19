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
    price: number;
    bannerImage: string;
    product: Product;
}

interface Product {
    id: string;
    name: string;
    description: string;
}