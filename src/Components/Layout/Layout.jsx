import React, { Suspense, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from './Loader';
import AppLayout from '../AppLayout/AppLayout';
import Footer from '../Footer/Footer';
import { LoadingOverlay, ScrollArea } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../Store/reducers/globalLoader/loaderSelector';

const Layout = () => {
  const isLoading = useSelector(selectIsLoading);
  // const scrollRef = useRef();

  // const scrollTop = () => {
  //   try {
  //     if (scrollRef && scrollRef.current) {
  //       scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
