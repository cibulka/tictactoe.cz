(function () {
  var currentMode;

  function set(mode) {
    document.documentElement.classList.toggle('dark', mode !== 'light');
  }

  function getFromLocalStorage() {
    try {
      const str = localStorage.getItem('preferencesStore');
      if (!str) return null;
      const pref = JSON.parse(str);
      return pref.isDarkMode ? 'dark' : 'light';
    } catch (e) {
      return null;
    }
  }

  /* Dark mode is the default
  function getFromSystem() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  */

  try {
    currentMode = getFromLocalStorage() || 'dark';
    set(currentMode);
  } catch (err) {
    console.error(new Error('darkMode: Error happened.'), err);
  }
})();
