import { createContext, useContext } from 'react';
import { ParsedUrlQuery } from 'querystring';

export const ServerRouterLocaleContext = createContext<null | {
  locale: string;
  locales: string[];
  pathname: string;
  query: ParsedUrlQuery;
}>(null);

export function useServerRouterLocaleContext() {
  return useContext(ServerRouterLocaleContext);
}
