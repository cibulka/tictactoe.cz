import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PrivacyPreferences } from 'src/types/app';

interface PreferencesStore {
  isDarkMode?: boolean;
  isLocalStorageLoaded: boolean;
  privacyPreferences?: PrivacyPreferences;
}

const initialState: PreferencesStore = {
  isDarkMode: undefined,
  isLocalStorageLoaded: false,
};

export const slice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setPrivacyPreferences: (state, action: PayloadAction<PrivacyPreferences>) => {
      state.privacyPreferences = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setStoreFromLocalStorage: (_state, action: PayloadAction<string>) => ({
      ...JSON.parse(action.payload),
      isLocalStorageLoaded: true,
    }),
  },
});

export const { setDarkMode, setPrivacyPreferences, setStoreFromLocalStorage } = slice.actions;

export default slice.reducer;
