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
    // id: number;
    // name: string;
    // image: string;
    // quantity: number;
    // start_date: string;
    // end_date: string;
    // promotion_type: number;
    // store_product_id: number;
    // discount: number | null;
    // quantity_minimal: number | null;
    // divider: number | null;
    // multiplier: number | null;
    // price: number;
    // description: string;
    // diageo: number;
    id: number,
    product_id: number,
    quantity: number,
    price: number,
    status: boolean,
    start_date: string,
    end_date: string,
    store_type: number,
    points: number,
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
    discount: number, //required
    features_string: string[],
    product: Product,
}

export interface Product {
    id: number,
    name: string, //required
    serial: string,
    lot: string,
    image: string, //requrired
    description: string,
    category_id: number,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    url: string,
}