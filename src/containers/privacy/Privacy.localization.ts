import { browser } from 'process';

const localization = {
  cs: {
    title: 'Piškvorky',
    subtitle: 'Informace o soukromí',
    info: 'Moje aplikace používá různé nástroje, aby se vám hrálo lépe. Zde si můžete nastavit pokud některé z nich nechcete používat.',
    formTitle: 'Nastavení soukromí',
    googleLogin: {
      title: 'O přihlášení',
      why: 'Pokud se do aplikace přihlásíte, můžete vstoupit do multiplayeru Piškvorek. Zároveň budu ukládat vaše nejlepší skóre.',
      what: 'Do aplikace se lze přihlásit skrz Google účet, informace o tomto přihlášení ukládá přímo Google ve službě Firebase. Moje aplikace má přístup pouze k vaší e-mailové adrese a profilové fotografii. ',
      note: 'Přihlášení není povinné.',
    },
    localStorage: {
      title: 'Ukládání stavu her do mezipaměti',
      info: 'Stav vašich her ukládám do mezipaměti prohlížeče. Hru tedy neztratíte pokud omylem zavřete okno nebo hru přerušíte jinak.',
    },
    googleAnalytics: {
      title: 'Google Analytics',
      info: 'Abych věděl jak hry zlepšovat, potřebuju měřit. K tomu používám Google Analytics a výsledky ukládam anonymizovaně. Je to OK?',
    },
    googleAccount: {
      title: 'Google Login',
      info: 'Pokud se do aplikace přihlásíte skrz svůj Google účet, budu ukládat vaše nejlepší skóre a umožním vám přístup do Multiplayeru.',
    },
    notification: {
      success: 'Preference uloženy!',
    },
    pageTitle: 'Nastavení soukromí',
    submit: 'Uložit a začít hrát',
  },
  en: {
    title: 'Tic Tac Toe',
    subtitle: 'Privacy information',
    info: 'My app uses various tools to optimize your playing. If you want to opt out from some of those tools, you can do it here.',
    formTitle: 'Privacy settings',
    localStorage: {
      title: 'Saving state of your game in local storage',
      info: "I'm saving the state of your games in the local storage of your browser. That way you don't lose your progress if you accidentaly close the browser or interupt the game in any way.",
    },
    googleAnalytics: {
      title: 'Google Analytics',
      info: 'To improve the games, I need to measure how are they being used. I use Google Analytics (anonymously) for that. Is that OK?',
    },
    googleAccount: {
      title: 'Google Login',
      info: 'if you login to the app with your Google account, I will save your best scores and let you on Multiplayer.',
    },
    notification: {
      success: 'Preferences saved!',
    },
    pageTitle: 'Privacy settings',
    submit: 'Save and start to play',
  },
};

export default localization;
