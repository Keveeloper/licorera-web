export type ResponseAuth = {
    access_token: string;
    refreshToken: string;
    expires: number;
    partner?: {[key: string]: any}
    status?: number
};

export type LoginRequest = {
    data: login;
};

type login={
    email:string,
    password:string
}
  