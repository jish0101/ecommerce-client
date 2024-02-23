import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { colorSchemeManager, theme } from './Theme/themeConfig';
import App from './App';
import { persistor, store } from './Store/store';
import { Notifications } from '@mantine/notifications';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoaderComponent from './Components/Layout/Loader';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        defaultColorScheme="light"
        theme={theme}
        colorSchemeManager={colorSchemeManager}
      >
        <BrowserRouter>
          <Provider store={store}>
            <PersistGate loading={<LoaderComponent />} persistor={persistor}>
              <Notifications />
              <ReactQueryDevtools initialIsOpen={false} />
              <App />
            </PersistGate>
          </Provider>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
