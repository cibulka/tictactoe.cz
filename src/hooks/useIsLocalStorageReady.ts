import { useSelector } from 'src/redux';

export default function useIsLocalStorageReady() {
  const isPreferencesSet = useSelector((state) => Boolean(state.preferences.privacyPreferences));
  const isLocalStorageAllowed = useSelector(
    (state) => state.preferences.privacyPreferences?.isLocalStorage,
  );
  const isLocalStorageInited = useSelector((state) => state.app.isLocalStorageInited);
  return Boolean(isPreferencesSet && (!isLocalStorageAllowed || isLocalStorageInited));
}
