import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import config from 'src/config';
import getInitialBoard from 'src/helpers/tictactoe/getInitialBoard';
import getMinSize from 'src/helpers/tictactoe/getMinSize';
import { ReduxError } from 'src/types/error';
import { Cell, Side, WinnerCellIndexes } from 'src/types/tictactoe';

import { moveThunk } from './actions';

const { TIC_TAC_TOE_SHOWN } = config;

interface TictactoeSingleplayerStore {
  cellsIndexesWinner?: WinnerCellIndexes;
  cells: Cell[];
  error?: ReduxError;
  isDraw: boolean;
  isLocalStorageLoaded: boolean;
  isPlaying: boolean;
  isWinner?: boolean;
  size: number;
}

const initialState: TictactoeSingleplayerStore = {
  cells: getInitialBoard(),
  isDraw: false,
  isLocalStorageLoaded: false,
  isPlaying: true,
  size: TIC_TAC_TOE_SHOWN,
};

export const slice = createSlice({
  name: 'tictactoeSingleplayer',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(moveThunk.pending, (state, action) => {
        const index = action.meta.arg;
        const newCells = [
          ...state.cells.slice(0, index),
          'cross' as Side,
          ...state.cells.slice(index + 1),
        ];

        state.isPlaying = false;
        state.cells = newCells;
      })
      .addCase(moveThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(moveThunk.fulfilled, (state, action) => {
        const { isDraw, move, winner, winnerCellIndexes } = action.payload;

        const cells = move
          ? [...state.cells.slice(0, move), 'circle' as Side, ...state.cells.slice(move + 1)]
          : state.cells;
        state.cells = cells;
        state.size = Math.max(state.size, getMinSize(cells));
        state.isPlaying = true;

        if (isDraw) {
          state.isDraw = true;
          return;
        }

        if (winner && winnerCellIndexes) {
          state.isWinner = winner === 'cross';
          state.cellsIndexesWinner = winnerCellIndexes;
        }
      });
  },
  reducers: {
    setSize: (state, action: PayloadAction<number>) => {
      state.size = Math.max(state.size, action.payload);
    },
    startNewGame: (state) => {
      return {
        ...initialState,
        isLocalStorageLoaded: state.isLocalStorageLoaded,
      };
    },
    setStoreFromLocalStorage: (_state, action: PayloadAction<string>) => ({
      ...JSON.parse(action.payload),
      error: initialState.error,
      isLocalStorageLoaded: true,
    }),
  },
});

export const { startNewGame, setSize, setStoreFromLocalStorage } = slice.actions;

export default slice.reducer;
