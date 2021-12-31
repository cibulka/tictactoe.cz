import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State, STATE_FAILURE, STATE_IDLE } from 'src/types/common';
import { ReduxError } from 'src/types/error';
import { UserData } from 'src/types/user';

interface AppStore {
  isLocalStorageInited: boolean;
  nickname?: string;
  userData?: UserData;
  userError?: ReduxError;
  userState: State;
}

const initialState: AppStore = {
  isLocalStorageInited: false,
  userState: STATE_IDLE,
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearNickname: (state) => {
      state.nickname = initialState.nickname;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    setUserError: (state, action: PayloadAction<ReduxError>) => {
      state.nickname = initialState.nickname;
      state.userData = initialState.userData;
      state.userError = action.payload;
      state.userState = STATE_FAILURE;
    },
    setUserState: (state, action: PayloadAction<State>) => {
      state.userState = action.payload;
      if (action.payload !== STATE_FAILURE) {
        state.userError = initialState.userError;
      }
    },
    setIsLocalStorageInited: (state) => {
      state.isLocalStorageInited = true;
    },
  },
});

export const {
  setIsLocalStorageInited,
  clearNickname,
  setNickname,
  setUserData,
  setUserError,
  setUserState,
} = slice.actions;

export default slice.reducer;
