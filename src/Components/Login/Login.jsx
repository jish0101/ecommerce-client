import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Store/reducers/Auth/authSlice';
import { selectIsAuth } from '../../Store/reducers/Auth/authSelector';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userData, setUserData] = useState({});
  const isAuthenticatedRedux = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      login({
        name: 'Jishan',
        email: userData?.email,
        password: userData?.password,
        role: 'admin'
      })
    );
  };

  useEffect(() => {
    if (isAuthenticatedRedux) {
      navigate('/');
    }
  }, [isAuthenticatedRedux]);

  return (
    <div>
      <div>
        <input
          type="text"
          value={userData?.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="text"
          value={userData?.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
