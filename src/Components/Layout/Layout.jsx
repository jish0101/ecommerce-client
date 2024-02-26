import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from './Loader';
import AppLayout from '../AppLayout/AppLayout';
import { LoadingOverlay } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../Store/reducers/globalLoader/loaderSelector';

const Layout = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <Suspense fallback={<Loader />}>
      <div>
        <LoadingOverlay visible={isLoading} loaderProps={{ children: <Loader /> }} />
        <div className="bg-amazon_light">
          <AppLayout>
            <Outlet />
          </AppLayout>
        </div>
      </div>
    </Suspense>
  );
};

export default Layout;
