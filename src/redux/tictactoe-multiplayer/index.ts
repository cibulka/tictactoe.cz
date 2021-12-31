import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReduxError } from 'src/types/error';
import { Match } from 'src/types/tictactoe/multiplayer';

interface TicTacToeMultiplayerStore {
  error?: ReduxError;
  matches?: Record<string, Match>;
}

const initialState: TicTacToeMultiplayerStore = {
  matches: {},
};

export const slice = createSlice({
  name: 'ticTacToeMultiplayer',
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<Match[]>) => {
      action.payload.forEach((match) => {
        if (!state.matches) state.matches = {};
        state.matches[match.id.toString()] = match;
      });
    },
    removeMatch: (state, action: PayloadAction<string>) => {
      const matchId = action.payload;
      if (!state.matches || !state.matches[matchId]) return;
      delete state.matches[matchId];
    },
    setError: (state, action: PayloadAction<ReduxError>) => {
      state.error = action.payload;
    },
  },
});

export const { setMatches, removeMatch, setError } = slice.actions;

export default slice.reducer;
