import { getIsActive, postSuggestion } from "../../../service/modules/info/info";

const useSuggestionHook = () => {

    const postSuggestionApi = async (request:any) => {
      try {
        const response = await postSuggestion(request);
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

    return { postSuggestionApi };
  };
  
  export default useSuggestionHook;