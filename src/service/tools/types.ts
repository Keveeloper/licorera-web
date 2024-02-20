import { AxiosError } from 'axios';

export * as Users from '../modules/users/types';

export type ApiResponse<
  T = any | undefined,
  partner = { parnertInfo: any; tokenDecryptedInfo: any } | undefined
> = {
  success: boolean;
  status?: number;
  statusCode?: number | null;
  errorMessage?: string | null;
  response?: T;
  error?: AxiosError;
  articule?: any;
  data?: any;
  partner?: partner;
};

export type HTTPServicesResponse<T = any> = {
  success: boolean;
  statusCode?: number | null;
  errorMessage?: string | null;
  payload?: T | null;
  error?: AxiosError;
};
