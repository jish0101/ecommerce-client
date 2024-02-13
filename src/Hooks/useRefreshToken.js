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
      return dispatch(signin(userData));
    }
    return;
  };
  return refresh;
};

export default useRefreshToken;
