import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Store/reducers/Auth/authSelector';

const Home = () => {
  const user = useSelector(selectUser);
  return (
    <div className="grid max-w-[80%] mx-auto p-3 gap-2 my-12">
      <p>User Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p className="break-all">Token: {user.token}</p>
    </div>
  );
};

export default Home;
