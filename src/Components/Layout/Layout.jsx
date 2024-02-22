import React, { Suspense, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from './Loader';
import AppLayout from '../AppLayout/AppLayout';
import Footer from '../Footer/Footer';
import { ScrollArea } from '@mantine/core';

function LoadingScreen() {
  return <Loader color="#ffffff" size={'large'} />;
}

const Layout = () => {
  const scrollRef = useRef();

  const scrollTop = () => {
    try {
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppLayout>
        <div className="h-full bg-amazon_light">
          <ScrollArea
            viewportRef={scrollRef}
            scrollbarSize={15}
            style={{ height: 'calc(100vh - 100px)' }}
          >
            <div className="bg-white" style={{ minHeight: 'calc(80vh)' }}>
              <Outlet />
            </div>
            <div>
              <Footer scrollTop={scrollTop} />
            </div>
          </ScrollArea>
        </div>
      </AppLayout>
    </Suspense>
  );
};

export default Layout;
