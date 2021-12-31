import errorsForm from './errorsForm';
import games from './games';

const localization = {
  cs: {
    errorsForm: errorsForm.cs,
    games: games.cs,
    actions: {
      hireMe: 'Spolupracujme!',
      logout: 'Odhlásit se',
    },
    head: {
      description: 'Piškvorky, Tetris, Had a další hry. Zadarmo a open-source.',
      title: 'Piškvorky a další',
    },
    states: {
      loading: 'Chviličku ...',
      redirecting: 'Přesměrování ...',
    },
  },
  en: {
    errorsForm: errorsForm.en,
    games: games.en,
    head: {
      description: 'Tic Tac Toe, Tetris, Snake and more. Free and open-source.',
      title: 'Tic Tac Toe and more',
    },
    actions: {
      hireMe: 'Hire me!',
      logout: 'Logout',
    },
    states: {
      loading: 'One moment ...',
      redirecting: 'Redirecting ...',
    },
  },
  es: {
    loading: 'Un momento ...',
  },
  cat: {
    loading: 'Un moment ...',
  },
  ru: {
    loading: 'Oдин момент ...',
  },
};

export default localization;
