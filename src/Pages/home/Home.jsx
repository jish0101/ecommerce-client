import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../Store/reducers/Auth/authSelector';
import { logout } from '../../Store/reducers/Auth/authSlice';
import { Button } from '@mantine/core';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <div className="grid text-center p-3 gap-2 text-slate-900">
      <h1 className="text-5xl font-bold">Welcome! Fellow Dev</h1>
      <p>To logout hover over top right accounts column.</p>
    </div>
  );
};

export default Home;
