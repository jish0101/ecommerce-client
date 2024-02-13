import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from './Loader';

function LoadingScreen() {
  return <Loader color="#ffffff" size={'large'} />;
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
