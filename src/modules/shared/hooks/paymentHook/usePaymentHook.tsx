import { useSelector } from "react-redux";
import { selectAllPaymentMethods } from "../../../../store/modules/paymentMethods";

const usePaymentHook = () => {

    const paymentMethodsRedux = useSelector(selectAllPaymentMethods); 
  
    const getPaymentMethods = () => {
        return paymentMethodsRedux;
    };
  
    return {
        paymentMethodsRedux,
    };
  };
  
  export default usePaymentHook;