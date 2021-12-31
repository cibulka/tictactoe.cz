import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import getInitialSnake from 'src/containers/snake/helpers/getInitialSnake';
import getNextSnakeHead from 'src/containers/snake/helpers/getNextSnakeHead';
import getNewDot from 'src/containers/snake/helpers/getNewDot';
import getNewSnake from 'src/containers/snake/helpers/getNewSnake';
import isEdge from 'src/containers/snake/helpers/isEdge';
import { Direction, GameSpeedLevel } from 'src/types/snake';

interface SnakeStore {
  direction: Direction;
  directionNext: Direction;
  dot: number | false;
  dots: number;
  isOver: boolean;
  isPaused: boolean;
  snake: number[];
  speedLevel: GameSpeedLevel;
  isLocalStorageLoaded: boolean;
}

const initialState: SnakeStore = {
  direction: 'right',
  directionNext: 'right',
  speedLevel: 0,
  dot: 43,
  dots: 0,
  isLocalStorageLoaded: false,
  isOver: false,
  isPaused: true,
  snake: getInitialSnake(),
};

export const slice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    tick: (state) => {
      const { dot, snake, directionNext } = state;
      const nextHead = getNextSnakeHead(snake, directionNext);

      const isOver = snake.includes(nextHead) || isEdge(nextHead, directionNext);
      if (isOver) {
        state.isOver = true;
        return;
      }

      const isDot = dot === nextHead;
      const newSnake = getNewSnake(snake, nextHead, isDot);
      const newDot = isDot ? getNewDot(snake) : dot;

      state.direction = directionNext;
      state.dot = newDot;
      if (isDot) state.dots += 1;
      state.snake = newSnake;
    },
    pause: (state, action: PayloadAction<boolean | undefined>) => {
      state.isPaused = action.payload === undefined ? !state.isPaused : action.payload;
    },
    // TODO: `action.payload === state.direction` => speed up
    setDirection: (state, action: PayloadAction<Direction>) => {
      const { direction } = state;
      const directionNext = action.payload;

      state.isPaused = false;

      if (directionNext === 'top' && direction === 'bottom') return;
      if (directionNext === 'right' && direction === 'left') return;
      if (directionNext === 'bottom' && direction === 'top') return;
      if (directionNext === 'left' && direction === 'right') return;

      state.directionNext = action.payload;
    },
    setStoreFromLocalStorage: (_state, action: PayloadAction<string>) => ({
      ...JSON.parse(action.payload),
      isLocalStorageLoaded: true,
      isPaused: true,
    }),
    startNewGame: (_state, action: PayloadAction<{ speedLevel: GameSpeedLevel }>) => ({
      ...initialState,
      dot: getNewDot(initialState.snake),
      isPaused: true,
      speedLevel: action.payload.speedLevel,
    }),
  },
});

export const { pause, setDirection, setStoreFromLocalStorage, startNewGame, tick } = slice.actions;

export default slice.reducer;
