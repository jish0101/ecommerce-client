import { api } from '../Api/api';
import { signin } from '../Store/reducers/Auth/authSlice';
import { useDispatch } from 'react-redux';

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const {
      data: { status, data: userData },
    } = await api.get('/refresh', {
      withCredentials: true,
    });

    if (status) {
      dispatch(signin({ user: userData }));
    }
    return {
      status,
      data: userData,
    };
  };
  return refresh;
};

export default useRefreshToken;
