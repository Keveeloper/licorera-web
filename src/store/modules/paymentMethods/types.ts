import { reducer } from "../../store";
import { LoadingStatus } from "../../tools";

export type RootState = ReturnType<typeof reducer>;

export interface PaymentMethodState {
    state: PaymentMethods ;
    paymentSelected: any,
    error: string | null | undefined;
    loadingStatus: LoadingStatus;
}

export interface Data {
    data: PaymentMethods;
    success:boolean;
    message:string
}

export interface PaymentMethods {
    id_customer: string;
    name: string;
    created: string;
    email: string;
    phone: string;
    address: string;
    cards: Card[];
}

export interface Card {
    token: string;
    franchise: string;
    mask: string;
    created: string;
    default: boolean;
}