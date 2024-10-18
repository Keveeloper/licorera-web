import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectRefreshToken, selectToken } from "../../store/modules/users/selectors/users.selector";
import { base } from "./base";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { error } from "console";
import { refreshUserLogin } from "../modules/users/users";
import { store, useAppDispatch } from "../../store/store";
import { refreshToken } from "../../store/modules/users/actions/users.actions";

interface RequestInterceptorProps {
  children: JSX.Element;
}
const RequestInterceptor: FC<RequestInterceptorProps> = ({ children }) => {
  //const token = useSelector(selectToken);
  //const refresh = useSelector(selectRefreshToken); 
  const dispatch = useAppDispatch();
  let isRefreshing = false;
  
  const getNewToken = async (): Promise<string> => {
    const refresh = store.getState().user?.data?.refresh_token;
    const newToken = await dispatch(refreshToken(refresh || '')).unwrap()
    if(newToken?.response?.token){
      return Promise.resolve(newToken.response.token);
    }
    else{
      return Promise.reject("error");
    }
  };

  const requestInterceptor = (
    config: AxiosRequestConfig
  ): AxiosRequestConfig | any => {
    const token = store.getState().user?.data?.token;
    const cleanedToken = token?.replace(/^Bearer\s+/i, '');
    if (token && config.url?.includes("/v2/")) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${cleanedToken}`;
    }
    return config;
  };

  const responseInterceptor = (response: AxiosResponse<any>) => {
    return response;
  };

  const errorInterceptor = async (error: AxiosError<any>) => {
    const status = error.response ? error.response.status : 0;
  
    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true; 
        try {
          const newToken = await getNewToken();
          if (error.config && newToken) {
            const originalRequest = error.config;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return axios(originalRequest);
          } else {
            console.error("Error al reintentar la solicitud: error.config no está definido.");
            return Promise.reject(error);
          }
        } catch (refreshError) {
          console.error("Error al refrescar el token:", refreshError);
          await new Promise(reject => setTimeout(reject, 1500));
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 500)); 
        if(error.config){
          return axios(error.config); 
        }
      }
    }
  };

  base.interceptors.request.use(requestInterceptor);
  base.interceptors.response.use(responseInterceptor, errorInterceptor)

  return <>{children}</>;
};

export default RequestInterceptor;
