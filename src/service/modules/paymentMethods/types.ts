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

export interface posPaymentCredit {
    cardNumber: string,
    cardCvc: string,
    cardExpYear: string,
    cardExpMonth: string,
    value: number,
    orderId: number,
    dues:number,
    _cardTokenId: string
}
  