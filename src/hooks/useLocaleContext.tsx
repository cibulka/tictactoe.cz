import { useContext } from 'react';
import { ServerRouterLocaleContext } from 'src/context';

export default function useLocaleContext() {
  return useContext(ServerRouterLocaleContext);
}
