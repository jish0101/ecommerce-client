import React from 'react';
import { Loader } from '@mantine/core';

const LoaderComponent = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Loader type="dots" size={'xl'} color="yellow" />
    </div>
  );
};

export default LoaderComponent;
