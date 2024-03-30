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

export type putUserRequest = {
    name: string | undefined,
    last_name: string | undefined,
    birthday: string | undefined,
    email: string | undefined,
    cellphone: string | undefined,
}

  