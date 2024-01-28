import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Store/reducers/Auth/authSelector';

const Home = () => {
  const user = useSelector(selectUser);
  return (
    <div>
      Home
      {JSON.stringify(user)}
    </div>
  );
};

export default Home;
