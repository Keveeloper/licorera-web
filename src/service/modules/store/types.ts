export type CategoriesResponse = {
    data: any;
    success: boolean;
    message: string;
};

export type CategoriesRequest = {
    id: number;
    page: number;
    sort?:string;
};
