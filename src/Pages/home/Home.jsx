import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../Store/reducers/Auth/authSelector';
import { logout } from '../../Store/reducers/Auth/authSlice';
import { Button } from '@mantine/core';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <div className="grid max-w-[80%] mx-auto gap-2">
      <p>User Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p className="break-all">Token: {user.token}</p>
      <Button variant="outline" onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
