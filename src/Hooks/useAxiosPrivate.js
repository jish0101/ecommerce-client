import { useEffect } from 'react';
import { axiosPrivate } from '../Api/api';
import useRefreshToken from './useRefreshToken.jsx';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectToken } from '../Store/reducers/Auth/authSelector';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const auth = useSelector(selectIsAuth);
  const token = useSelector(selectToken);

  useEffect(() => {
    let requestInterceptor;
    let responseIntercept;
    try {
      requestInterceptor = axiosPrivate.interceptors.request.use(
        (config) => {
          if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
          return config;
        },
        (err) => Promise.reject(err),
      );

      responseIntercept = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (err) => {
          const prevRequest = err?.config;
          if (err?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newToken = await refresh();
            prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return axiosPrivate(prevRequest);
          }
          return Promise.reject(err);
        },
      );
    } catch (error) {
      console.log(error);
    }

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
