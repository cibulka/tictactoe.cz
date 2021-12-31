import { Fragment, StrictMode, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import type { AppProps } from 'next/app';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';

import { ServerRouterLocaleContext } from 'src/context';
import { googleAnalyticsPageView } from 'src/helpers/googleAnalytics';
import { useSelector, wrapper } from 'src/redux';
import getTheme from 'src/theme/mui';

import '../styles/tailwind.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  const Wrap = process.env.NODE_ENV === 'development' ? StrictMode : Fragment;

  const isDarkMode = useSelector((state) => {
    if (state.preferences.isDarkMode === undefined) return true;
    return state.preferences.isDarkMode;
  });
  const muiTheme = createTheme({
    ...getTheme(isDarkMode),
    palette: {
      ...getTheme(isDarkMode).palette,
      mode: isDarkMode ? 'dark' : undefined,
    },
  });

  // GA
  useEffect(() => {
    router.events.on('routeChangeComplete', googleAnalyticsPageView);
    return () => router.events.off('routeChangeComplete', googleAnalyticsPageView);
  }, [router]);

  if (!router.locale || !router.locales) throw Error('Badly configured locales');

  return (
    <ServerRouterLocaleContext.Provider
      value={{
        locale: router.locale,
        locales: router.locales,
        pathname: router.pathname,
        query: router.query,
      }}
    >
      <Wrap>
        <SnackbarProvider>
          <ThemeProvider theme={muiTheme}>
            <StyledEngineProvider injectFirst>
              <Component {...pageProps} />
            </StyledEngineProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </Wrap>
    </ServerRouterLocaleContext.Provider>
  );
}

export default wrapper.withRedux(MyApp);
