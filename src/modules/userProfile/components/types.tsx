export interface AddPaymentInterface {
    setPaymentMethodsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isChekout?:boolean
}

export interface UserExchangeinterface {
    exchangeOpen: boolean;
    setExchangeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}