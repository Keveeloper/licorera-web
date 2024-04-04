import axios from 'axios';

import { BASE_URL } from '../tools/constans';
import { useSelector } from 'react-redux';
import { selectAllPersonalInfo, selectToken } from '../../store/modules/users/selectors/users.selector';

export const base = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


base.interceptors.response.use(
  function (response) {
    if (response.status === 204) {
    return { ...response, data: 'Successful update' };
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
