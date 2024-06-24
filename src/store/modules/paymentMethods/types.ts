import { reducer } from "../../store";
import { LoadingStatus } from "../../tools";

export type RootState = ReturnType<typeof reducer>;

export interface PaymentMethodState {
    success:boolean;
    message:string;
    state: PaymentMethods ;
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

export interface AddPaymentResponse {
    success: boolean,
    data: AddPaymentData,
    message: string,
}

interface AddPaymentData {
    exp_month: string,
    exp_year: string,
    name: string,
    mask: string,
}