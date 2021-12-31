import { useSelector } from 'src/redux';

export default function useDarkMode() {
  return useSelector((state) => {
    if (state.preferences.isDarkMode === undefined) return true;
    return state.preferences.isDarkMode;
  });
}
