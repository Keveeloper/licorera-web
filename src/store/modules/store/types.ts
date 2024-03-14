import { productExchange } from "../../../modules/exchangeProducts/types";
import { reducer } from "../../store";
import { LoadingStatus } from "../../tools";

export type RootState = ReturnType<typeof reducer>;

export interface PersonalInfoState {
    productDetail?:productExchange;
    data: ResponsePersonalInfo ;
    categories:any;
    error: string | null | undefined;
    loadingStatus: LoadingStatus;
}

export interface ResponsePersonalInfo {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    token?:string;
    isWelcome?:boolean;
}