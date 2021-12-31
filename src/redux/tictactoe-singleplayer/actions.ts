import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { createReduxThunkError } from 'src/helpers/error';
import { RootState } from 'src/redux/reducers';
import { ReduxError } from 'src/types/error';
import { MovePayload, MoveResponse } from 'src/types/tictactoe/singleplayer';

// Actions
// =============================================================================

export async function move(payload: MovePayload): Promise<MoveResponse> {
  const [response] = await Promise.all([
    axios.post('/api/tictactoe/singleplayer/move', payload),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);
  return response.data;
}

// Thunks
// =============================================================================

const MOVE = 'ticTacToeSingleplayer/move';
export const moveThunk = createAsyncThunk<MoveResponse, number, { rejectValue: ReduxError }>(
  MOVE,
  async (_moveIndex: number, action) => {
    const store = action.getState() as RootState;
    const { cells } = store.tictactoeSingleplayer;

    try {
      return await move({ cells });
    } catch (error) {
      return action.rejectWithValue(createReduxThunkError(error, MOVE));
    }
  },
);
