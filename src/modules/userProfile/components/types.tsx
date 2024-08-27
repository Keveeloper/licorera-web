export interface AddPaymentInterface {
    setPaymentMethodsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isChekout?:boolean
    updateOrder?: () => void;
}

export interface UserExchangeinterface {
    exchangeOpen: boolean;
    setExchangeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}