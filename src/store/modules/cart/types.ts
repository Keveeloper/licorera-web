import { reducer } from "../../store";
import { LoadingStatus } from "../../tools";

export type RootState = ReturnType<typeof reducer>;

export interface CartState {
    state: Data ;
    error: string | null | undefined;
    loadingStatus: LoadingStatus;
}

export interface Data {
    products:Products[];
    order:number;
    total:number;
    phone?:string;
}

export interface Products {
    id: number;
    name: string;
    quantity:number;
    price:number;
    image?:string
}
