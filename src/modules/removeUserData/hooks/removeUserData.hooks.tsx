import { postRemoveUser,  } from "../../../service/modules/info/info";

const useRemoveDatanHook = () => {

    const postRemoveUserApi = async (request:any) => {
      try {
        const response = await postRemoveUser(request);
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

    return { postRemoveUserApi };
  };
  
  export default useRemoveDatanHook;