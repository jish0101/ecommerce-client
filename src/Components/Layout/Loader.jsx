import React from 'react';
import { Loader } from '@mantine/core';
const loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Loader color="yellow" size={30} />
    </div>
  );
};

export default loader;
