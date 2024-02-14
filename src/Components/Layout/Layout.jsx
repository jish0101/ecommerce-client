import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from './Loader';
import Navbar from '../Navbar/Navbar';
import AppLayout from '../AppLayout/AppLayout';
import Footer from '../Footer/Footer';

function LoadingScreen() {
  return <Loader color="#ffffff" size={'large'} />;
}

const Layout = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div>
        <AppLayout>
          <Outlet />
        </AppLayout>
        <Footer />
      </div>
    </Suspense>
  );
};

export default Layout;
