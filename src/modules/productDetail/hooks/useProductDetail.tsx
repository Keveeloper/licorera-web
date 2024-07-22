import { getIsActive } from "../../../service/modules/info/info";
import { getStoreProductsById } from "../../../service/modules/store/store";

const useProductDetailHook = () => {

    const getStoreProduct = async (id:number) => {
      try {
        const response = await getStoreProductsById(id);
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

    return { getStoreProduct };
  };
  
  export default useProductDetailHook;