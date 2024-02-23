import { useEffect } from 'react';
import { axiosPrivate } from '../Api/api';
import useRefreshToken from './useRefreshToken';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectUser } from '../Store/reducers/Auth/authSelector';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const auth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);

  useEffect(() => {
    try {
      const requestInterceptor = axiosPrivate.interceptors.request.use(
        (config) => {
          if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${user?.token}`;
          }
          return config;
        },
        (err) => Promise.reject(err),
      );

      const responseIntercept = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (err) => {
          const prevRequest = err?.config;
          if (err?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const { data } = await refresh();
            prevRequest.headers['Authorization'] = `Bearer ${data?.token}`;
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
