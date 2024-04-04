import { reducer } from "../../store";
import { LoadingStatus } from "../../tools";

export type RootState = ReturnType<typeof reducer>;

export interface PersonalInfoState {
    data: ResponsePersonalInfo ;
    user?:any;
    isWelcome?:boolean;
    error: string | null | undefined;
    loadingStatus: LoadingStatus;
}

export interface ResponsePersonalInfo {
    id?: string,
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string
    birthday?: string;
    token?:string;
    refresh_token?:string;
}