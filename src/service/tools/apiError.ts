import type { AxiosError } from 'axios';
import { hasIn, isPlainObject, isString } from 'lodash';

import { HTTPServicesResponse } from './types';

export const handleSubModuleError = (
  error: AxiosError | any
): HTTPServicesResponse<AxiosError> => {
  return {
    success: false,
    errorMessage: getErrorMessage(error) || error.message,
    statusCode: error.response?.status,
    payload: error,
  };
};

export const getErrorMessage = (error: AxiosError<any>): string => {
  const defaultErrMsg = "Something didn't go right but let's try again.";
  try {
    let errors = error.response?.data?.errors;
    if (Array.isArray(errors)) errors = errors[0];

    if (errors?.code === 'INTERNAL_SERVER_ERROR') {
      return defaultErrMsg;
    }
    // Check if status code is 409
    if (
      (!errors || (isPlainObject(errors) && !errors.detail)) &&
      error.response?.data?.message
    ) {
      errors = { detail: error.response.data.message };
    }

    let errorMessage = errors?.detail;

    if (!isString(errorMessage)) {
      if (Array.isArray(errorMessage)) {
        errorMessage = errorMessage[0];
      }
      if (isPlainObject(errorMessage) && hasIn(errorMessage, 'message')) {
        errorMessage = errorMessage.message;
      } else {
        errorMessage = defaultErrMsg;
      }
    }

    if (!isString(errorMessage)) {
      errorMessage = defaultErrMsg;
    }

    return errorMessage as string;
  } catch (error) {
    return defaultErrMsg;
  }
};
