import { getGoogleApi, getGoogleReverseApi } from "../../../service/modules/address/address";

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

    const GetHookGoogleReverseApi = async (latitude:number,longitude:number) => {
        try {
          const response = await getGoogleReverseApi(latitude, longitude );
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
    
    return { GetHookGoogleApi , GetHookGoogleReverseApi};
  };
  
  export default useAddress;