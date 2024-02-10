import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { colorSchemeManager, theme } from './Theme/themeConfig';
import App from './App';
import { store } from './Store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider
      defaultColorScheme="light"
      theme={theme}
      colorSchemeManager={colorSchemeManager}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
);
