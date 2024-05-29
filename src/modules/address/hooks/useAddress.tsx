import { getGoogleApi } from "../../../service/modules/address/address";

const useAddress = () => {

    const GetHookGoogleApi = async (reqData: string) => {
      try {
        const response = await getGoogleApi(reqData);
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
    
    return { GetHookGoogleApi };
  };
  
  export default useAddress;