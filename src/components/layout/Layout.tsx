import React, { FC, ReactNode } from 'react';
import Head from 'next/head';
import Drawer from '@mui/material/Drawer';

import { useAuth } from 'src/firebase';
import { useSelector } from 'src/redux';
import { GameName } from 'src/types/app';

import Nav from './nav/Nav';
import DarkModeObserver from './hooks/DarkModeObserver';
import LocalStorageObserver from './hooks/LocalStorageObserver';
import TictactoeMultiplayerMatchesObserver from './hooks/TictactoeMultiplayerMatchesObserver';
import UserDataObserver from './hooks/UserDataObserver';
import PrivacyPopup from './privacy/Privacy';
import useGamesList from 'src/hooks/useGamesList';
import useTranslate from 'src/hooks/useTranslate';

const Hooks: FC = () => {
  const [auth] = useAuth();

  const nickname = useSelector((state) => state.app.nickname);

  return (
    <>
      <DarkModeObserver />
      <LocalStorageObserver />
      {auth && (
        <>
          <UserDataObserver />
          {nickname && <TictactoeMultiplayerMatchesObserver userId={auth.uid} />}
        </>
      )}
    </>
  );
};

const Layout: FC<{
  children: ReactNode;
  classNameNavigation?: string;
  gameName?: GameName;
  isGameMenu?: boolean;
  isOverflow?: boolean;
  isPrivacyPage?: boolean;
  pageTitle?: string;
}> = (props) => {
  const games = useGamesList();
  const translate = useTranslate();
  const game = props.gameName ? games[props.gameName] : undefined;
  const gameLabel = game ? game.label : undefined;
  const pageTitle = [props.pageTitle || gameLabel || null, translate('common.head.title') as string]
    .filter(Boolean)
    .join(' | ');

  const isPrivacyPreferencesResolved = useSelector((state) =>
    Boolean(state.preferences.privacyPreferences),
  );

  let imageSrc: string;
  switch (props.gameName) {
    case 'tictactoeMultiplayer':
      imageSrc = '/og-tictactoe-multiplayer.png';
      break;
    case 'snake':
      imageSrc = '/og-snake.png';
      break;
    case 'tetris':
      imageSrc = '/og-tetris.png';
      break;
    default:
      imageSrc = '/og-tictactoe-singleplayer.png';
      break;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={translate('common.head.description') as string} />
        <meta property="og:image" content={imageSrc} />
      </Head>
      <Hooks />
      <div
        className={['relative flex flex-col flex-1', !props.isOverflow && 'overflow-hidden'].join(
          ' ',
        )}
      >
        {props.children}
      </div>
      <Nav className={props.classNameNavigation} gameName={props.gameName} />
      <Drawer anchor="top" open={!isPrivacyPreferencesResolved && !props.isPrivacyPage}>
        <PrivacyPopup />
      </Drawer>
    </>
  );
};

export default Layout;
