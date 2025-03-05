import '@fishing_cat/index.css'; // TODO: refactor with styled component
import '@fishing_cat/App.css'; // TODO: refactor with styled component
import '@fishing_cat/api/interceptors.ts'; // TODO: Merge the two Toast implementations and standardize them into a single component

import { createTheme } from '@mui/material'; // `createTheme` must be imported from `/material` for MUI components
import * as Sentry from '@sentry/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { v4 as uuid4 } from 'uuid';

import i18nInstance from '@/i18n/i18n';
import { store } from '@/redux/store';
import router from '@/router/index';
import GlobalStyle, { RootStyle } from '@/styles/globalResetStyle';
import muiThemeConfig from '@/styles/muiThemeConfig';

if (import.meta.env.VITE_NODE_ENV === 'production') {
  // eslint-disable-next-line no-console
  console.log = () => {};
}

// Sentry
Sentry.init({
  dsn: 'https://61e4ee4f7d66dd6d53f3b522d43304f0@o4508005887442944.ingest.us.sentry.io/4508249751486464',
  integrations: [],
  environment: import.meta.env.VITE_NODE_ENV,
  beforeSend: (event) => {
    const searchParams = new URLSearchParams(window.location.search);
    const roomId = searchParams.get('roomId') ?? 'unknown';
    const lessonId = searchParams.get('lessonId') ?? 'unknown';
    const version = import.meta.env.VITE_APP_VERSION.split('-')[0] || 'Unknown';
    const eventTags = event.tags ?? {};

    const customEventTags = Object.assign(eventTags, {
      roomId,
      lessonId,
      version,
    });
    return {
      ...event,
      tags: customEventTags,
    };
  },
});

// mixpanel
const deviceId = window.localStorage.getItem('deviceId');
if (!deviceId) {
  const newDeviceId = uuid4();
  window.localStorage.setItem('deviceId', newDeviceId);
}

const theme = createTheme(muiThemeConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18nInstance}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
          <RootStyle />
          <GlobalStyle />
        </Provider>
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>,
);
