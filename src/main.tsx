import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';

import App from './App';
import setupStore from './store';

import { GlobalStyles } from './styles/global';
import { theme } from './styles/theme/default';

const store = setupStore({});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#ffc107',
              colorLinkHover: '#ffc107',
              colorLink: '#ffc107',
              colorLinkActive: '#ffc107',
            },
          }}
        >
          <GlobalStyles />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
