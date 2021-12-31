import { combineReducers } from '@reduxjs/toolkit';

import app from './app';
import preferences from './preferences';
import snake from './snake';
import tetris from './tetris';
import tictactoeMultiplayer from './tictactoe-multiplayer';
import tictactoeSingleplayer from './tictactoe-singleplayer';

export const rootReducer = combineReducers({
  app,
  preferences,
  snake,
  tetris,
  tictactoeMultiplayer,
  tictactoeSingleplayer,
});

export type RootState = ReturnType<typeof rootReducer>;
