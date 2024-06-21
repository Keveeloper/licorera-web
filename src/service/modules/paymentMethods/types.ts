export interface DeletePaymentMethod {
    token: string,
    franchise: string,
    mask: string,
}

export interface AddPaymentMethod {
    number: string,
    cvv: string,
    name: string,
    favorite: boolean,
    exp_month: string,
    exp_year: string,
}
  