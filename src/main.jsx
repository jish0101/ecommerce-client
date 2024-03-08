import './index.css';
import App from './App';
import React from 'react';
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { persistor, store } from './Store/store';
import { BrowserRouter } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import LoaderComponent from './Components/Layout/Loader';
import { PersistGate } from 'redux-persist/integration/react';
import { colorSchemeManager, theme } from './Theme/themeConfig';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
