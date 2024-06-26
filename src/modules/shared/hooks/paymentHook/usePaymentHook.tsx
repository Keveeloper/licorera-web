import { useDispatch, useSelector } from "react-redux";



import { selectAllPaymentSeleted } from "../../../../store/modules/paymentMethods/selectors/paymentMethods.selector";
import { paymentMethodsActions } from "../../../../store/modules/paymentMethods";

export interface  PaymentSelected{
  type:string,
  payment:string,
  ref_payco?:string
}

const usePaymentHook = () => {
  const dispatch = useDispatch();
  const payment = useSelector(selectAllPaymentSeleted);

  const getPayment = () => {
    return payment;
  };

  const addToPayment = (payment: PaymentSelected) => {;
    dispatch(paymentMethodsActions.setPaymentSelected(payment))
  };

  const updatePaymentItem = (updatedpayment: PaymentSelected) => {
    const newPayment = {...payment, ...updatedpayment};
    dispatch(paymentMethodsActions.setPaymentSelected(newPayment))
  };

  const removePaymentItem = (productId: number) => {
    dispatch(paymentMethodsActions.setPaymentSelected({}))
  };

  return {
    getPayment,
    addToPayment,
    updatePaymentItem,
    removePaymentItem
  };
};

export default usePaymentHook;

