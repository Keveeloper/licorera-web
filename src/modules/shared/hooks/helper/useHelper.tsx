import { postDelivery } from "../../../../service/modules/address/address";
import { DeliveryRequest } from "../../../../service/modules/address/type";
import useAddressHook from "../addressHook/useAddressHook";

const useHelperHook = () => {
    const { getAddress } = useAddressHook();

    const calculateTotal = async (products:any) => {
      console.log(products);
        let newtotal = 0;
        products?.forEach((item:any) => {
          let newPrice = item.price;
            if(item.discount > 0){
              newPrice = item.price - (item.price * item.discount / 100) 
            }
            if (item.price) {
                newtotal += item.quantity * newPrice;
            }
        });
        const delivery = await calculateDelivery(newtotal)
        return [newtotal, parseInt(delivery)];
    };

    const calculateDelivery = async (total:number) => {
        const address = getAddress();
        if (address?.coords?.latitude && address?.coords?.longitude) {
          const request: DeliveryRequest = {
            latitude: address.coords?.latitude,
            longitude: address.coords?.longitude,
            orderValue: total,
          };
          try {
            const response = await postDelivery(request);
            if (response.success && response.response.data) {
              console.log(response);
              return response.response.data;
            } else {
              throw { error: "Failed to fetch data", success: response.success };
            }
          } catch (error) {
            return error as Error;
          }
        }
      };
  
  
    return {
      calculateTotal
    };
  };
  
  export default useHelperHook;