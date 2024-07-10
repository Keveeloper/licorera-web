export interface CreateLocationRequest {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    detail: string;
    favorite:boolean;
}

export interface DeliveryRequest {
    latitude : number;
    longitude : number;
    orderValue : number;
}

export interface FavoriteRequest {
    id: number;
}