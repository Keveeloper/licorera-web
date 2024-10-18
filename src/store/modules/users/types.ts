import { reducer } from "../../store";
import { LoadingStatus } from "../../tools";

export type RootState = ReturnType<typeof reducer>;

export interface PersonalInfoState {
    data: ResponsePersonalInfo ;
    user?:any;
    info?:any;
    isWelcome?:boolean;
    isUserInfoComplete?:boolean;
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
    refresh_token?:string;
    token?:string;
}