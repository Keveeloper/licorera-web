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
    products: Products[] | null,
  }

export interface Products {
    id: number,
    campaigns_id: number,
    store_product_id: number,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    store: Store | null
}

interface Store {
    id: number,
    product_id: number,
    quantity: number,
    price: number,
    status: boolean,
    start_date: string,
    end_date: string,
    store_type: number,
    points: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    ranking: number,
    recommended: boolean,
    newproduct: boolean,
    ean: string,
    trademark: string,
    maker: string,
    presentation: string,
    bannerImage: string,
    discount: number,
    product: Product
}

interface Product {
    id: number,
    name: string,
    serial: string,
    lot: string,
    image: string,
    description: string,
    category_id: number,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    url: string,
}