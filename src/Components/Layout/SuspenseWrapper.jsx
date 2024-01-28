import React, { Suspense } from 'react';
import Loader from './Loader';
import { Outlet } from 'react-router-dom';

function LoadingScreen() {
  return (
    <div className="flex-k js-center-k items-center-k h-75vh-k">
      <Loader size={'large'} />
    </div>
  );
}

const SuspenseWrapper = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
};

export default SuspenseWrapper;
