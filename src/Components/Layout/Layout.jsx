import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from './Loader';
import Navbar from '../Navbar/Navbar';
import AppLayout from '../AppLayout/AppLayout';
import Footer from '../Footer/Footer';
import { Box } from '@mantine/core';

function LoadingScreen() {
  return <Loader color="#ffffff" size={'large'} />;
}

const Layout = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppLayout />
      <Box mt={100}>
        <Outlet />
        <Footer />
      </Box>
    </Suspense>
  );
};

export default Layout;
