import { FC, useEffect } from 'react';

import useDarkMode from 'src/hooks/useDarkMode';

const DarkModeObserver: FC = () => {
  const isDarkMode = useDarkMode();

  useEffect(() => {
    if (!document) return;
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return null;
};

export default DarkModeObserver;
