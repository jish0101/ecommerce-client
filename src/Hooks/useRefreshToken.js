import { API_URL, api } from '../Api/api';
import { logout, signin } from '../Store/reducers/Auth/authSlice';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const logoutFunc = async () => {
    const response = await api.post(API_URL.logout);
    return response;
  };

  const { mutateAsync: logoutApi, isPending: isLoadingLogout } = useMutation({
    mutationFn: logoutFunc,
  });

  const refresh = async () => {
    try {
      const {
        data: { status, data: userData },
      } = await api.get('/refresh', {
        withCredentials: true,
      });

      if (status) {
        dispatch(signin({ user: userData }));
      }
      return userData?.token;
    } catch (error) {
      console.log('Refresh Error => ', error);
      const status = error?.response?.status;
      if (status === 403) {
        dispatch(logout());
        await logoutApi();
      }
    }
  };
  return refresh;
};

export default useRefreshToken;
