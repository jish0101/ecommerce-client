import { API_URL, api } from '../Api/api';
import { logout, signin } from '../Store/reducers/Auth/authSlice';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { XCircle } from 'lucide-react';

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const { mutateAsync: logoutApi } = useMutation({
    mutationFn: async () => {
      const response = await api.post(API_URL.logout);
      return response;
    },
  });

  const refresh = async () => {
    try {
      const {
        data: { status, data: userData },
      } = await api.get('/refresh');

      if (status) {
        dispatch(signin({ user: userData }));
      }
      return userData?.token;
    } catch (error) {
      const status = error?.response?.status;
      if (status === 403 || status === 401) {
        dispatch(logout());
        await logoutApi();
        notifications.show({
          id: 'Refresh Failed',
          withCloseButton: true,
          autoClose: 2000,
          title: <h4 className="font-bold text-lg">Oops!</h4>,
          message: <p className="text-base">Your session has expired, Please Signin Again!</p>,
          color: 'red',
          radius: 'lg',
          icon: <XCircle size={50} key={'Refresh Failed'} />,
        });
      }
    }
  };
  return refresh;
};

export default useRefreshToken;
