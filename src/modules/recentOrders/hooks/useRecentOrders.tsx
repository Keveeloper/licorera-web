import { getOrder, getOrders } from "../../../service/modules/orders/order";

const useRecentOrders = () => {

    const GetOrdersApi = async (page:number) => {
      try {
        const response = await getOrders(page);
        console.log(response)
        if (response.success && response.response) {
          return response.response;
        } else {
          throw { error: 'Failed to fetch data', success: response.success };
        }
      } catch (error) {
        return error as Error;
      } finally {
  
      }
    };

    const getOrderApi = async (id:number) => {
        try {
          const response = await getOrder(id);
          console.log(response)
          if (response.success && response.response) {
            return response.response;
          } else {
            throw { error: 'Failed to fetch data', success: response.success };
          }
        } catch (error) {
          return error as Error;
        } finally {
    
        }
    };

    

    
    return { GetOrdersApi, getOrderApi};
  };
  
  export default useRecentOrders;