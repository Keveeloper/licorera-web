import { reducer } from "./store";
import { LoadingStatus } from "./tools";

export type RootState = ReturnType<typeof reducer>;

export interface PersonalInfoState {
    data: ResponsePersonalInfo ;
    error: string | null | undefined;
    loadingStatus: LoadingStatus;
}

export interface ResponsePersonalInfo {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    token?:string;
}