import { getIsActive } from "../../../service/modules/info/info";

const useHomeHook = () => {

    const isActiveApi = async () => {
      try {
        const response = await getIsActive();
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

    return { isActiveApi };
  };
  
  export default useHomeHook;