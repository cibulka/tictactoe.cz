import { configureStore, Store } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { createSelectorHook, useDispatch as useReduxDispatch } from 'react-redux';

import { rootReducer, RootState } from './reducers';

export const makeStore: MakeStore<Store<RootState>> = () => {
  const store = configureStore({
    reducer: rootReducer,
    /** @link https://redux-toolkit.js.org/usage/usage-with-typescript#correct-typings-for-the-dispatch-type */
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV === 'development',
  });
  return store;
};

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  // debug: process.env.NODE_ENV === 'development',
  debug: false,
});

export const useSelector = createSelectorHook<RootState>();

export const useDispatch: any = () => useReduxDispatch<any>();
