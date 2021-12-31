import { useEffect, useState, FC } from 'react';

import { useDispatch, useSelector } from 'src/redux';
import { setIsLocalStorageInited } from 'src/redux/app';
import { setStoreFromLocalStorage as setPreferencesStoreFromLocalStorage } from 'src/redux/preferences';
import { setStoreFromLocalStorage as setSnakeStoreFromLocalStorage } from 'src/redux/snake';
import { setStoreFromLocalStorage as setTetrisStoreFromLocalStorage } from 'src/redux/tetris';
import { setStoreFromLocalStorage as setTicTacToeSingleplayerStoreFromLocalStorage } from 'src/redux/tictactoe-singleplayer';

const LocalStorageObserver: FC = () => {
  const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false);
  const dispatch = useDispatch();

  const isLocalStorageAllowed = useSelector((state) => {
    return Boolean(state.preferences.privacyPreferences?.isLocalStorage);
  });

  const preferences = useSelector((state) => state.preferences);
  const preferencesStr = JSON.stringify(preferences);

  const snake = useSelector((state) => state.snake);
  const snakeStr = JSON.stringify(snake);

  const tetris = useSelector((state) => state.tetris);
  const tetrisStr = JSON.stringify(tetris);

  const tictactoeSingleplayer = useSelector((state) => state.tictactoeSingleplayer);
  const tictactoeSingleplayerStr = JSON.stringify(tictactoeSingleplayer);

  useEffect(() => {
    if (!window || !window.localStorage) return;

    const preferencesStore = window.localStorage.getItem('preferencesStore');
    if (preferencesStore) dispatch(setPreferencesStoreFromLocalStorage(preferencesStore));
  }, [dispatch]);

  useEffect(() => {
    if (!window || !window.localStorage) return;

    if (isLocalStorageAllowed) {
      const snakeStore = window.localStorage.getItem('snakeStore');
      if (snakeStore) dispatch(setSnakeStoreFromLocalStorage(snakeStore));

      const tetrisStore = window.localStorage.getItem('tetrisStore');
      if (tetrisStore) dispatch(setTetrisStoreFromLocalStorage(tetrisStore));

      const tictactoeSingleplayerStore = window.localStorage.getItem('tictactoeSingleplayerStore');
      if (tictactoeSingleplayerStore)
        dispatch(setTicTacToeSingleplayerStoreFromLocalStorage(tictactoeSingleplayerStore));
    }

    setIsLocalStorageLoaded(true);
    dispatch(setIsLocalStorageInited());
  }, [isLocalStorageAllowed, dispatch]);

  useEffect(() => {
    if (!window || !window.localStorage || !isLocalStorageLoaded) return;

    if (preferencesStr) window.localStorage.setItem('preferencesStore', preferencesStr);

    if (!isLocalStorageAllowed) return;

    if (snakeStr) window.localStorage.setItem('snakeStore', snakeStr);
    if (tetrisStr) window.localStorage.setItem('tetrisStore', tetrisStr);
    if (tictactoeSingleplayerStr)
      window.localStorage.setItem('tictactoeSingleplayerStore', tictactoeSingleplayerStr);
  }, [
    isLocalStorageAllowed,
    preferencesStr,
    snakeStr,
    tetrisStr,
    tictactoeSingleplayerStr,
    isLocalStorageLoaded,
  ]);

  return null;
};

export default LocalStorageObserver;
