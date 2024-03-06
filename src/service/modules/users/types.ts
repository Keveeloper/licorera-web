export type ResponseAuth = {
    access_token: string;
    refreshToken: string;
    expires: number;
    partner?: {[key: string]: any}
    status?: number
};

export type LoginRequest = {
    email:string,
    password:string
};

  