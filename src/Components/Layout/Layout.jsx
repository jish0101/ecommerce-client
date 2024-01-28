import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from './Loader';

function LoadingScreen() {
  return (
    <div className="flex js-centre items-center h-screen">
      <Loader color="#ffffff" size={'large'} />
    </div>
  );
}

const Layout = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div>
        <Outlet />
      </div>
    </Suspense>
  );
};

export default Layout;
