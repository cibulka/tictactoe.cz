import React, { FC } from 'react';
import Link from 'next/link';
import Switch from '@mui/material/Switch';

import ButtonViewGame from 'src/components/button-view-game/ButtonViewGame';
import useDarkMode from 'src/hooks/useDarkMode';
import useGamesList from 'src/hooks/useGamesList';
import { IconMoon, IconPrivacy, IconUser, IconWork, IconX } from 'src/icons';
import { useDispatch } from 'src/redux';
import { setDarkMode } from 'src/redux/preferences';
import { GameName } from 'src/types/app';
import { Translate } from 'src/types/translate';

import NavLocaleAccordion from './NavLocaleAccordion';

const NavHamburgerDrawer: FC<{
  gameName?: string;
  onClose: () => void;
  translate: Translate;
}> = (props) => {
  const gamesList = useGamesList();
  const gameNames = Object.keys(gamesList) as GameName[];

  const dispatch = useDispatch();
  const isDarkMode = useDarkMode();

  return (
    <nav className="relative">
      <div className="sticky top-0 flex justify-end p-2">
        <button type="button" onClick={() => props.onClose()} className="w-6 h-6">
          <IconX />
        </button>
      </div>
      <div className="mb-8">
        <h2 className="tic-h3 px-2 mb-2">{props.translate('mobileNav.games.title')}</h2>
        <ul>
          {gameNames.map((gameName, i) => (
            <li key={gameName}>
              <Link href={gamesList[gameName].href}>
                <a className="flex">
                  <ButtonViewGame
                    className="pr-8"
                    classNameIconSize="tic-icon-big"
                    gameName={gameName}
                    isBorder={i > 0}
                    isPadding
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="px-2 tic-h3 mb-2">{props.translate('mobileNav.info.title')}</h2>
        <ul className="text-sm">
          {[
            {
              Icon: IconUser,
              href: '/account',
              label: props.translate('mobileNav.info.account'),
            },
            {
              Icon: IconWork,
              href: '/about',
              label: props.translate('mobileNav.info.about'),
            },
            {
              Icon: IconPrivacy,
              href: '/privacy',
              label: props.translate('mobileNav.info.privacy'),
            },
          ].map(({ Icon, href, label }) => (
            <li key={href} className="border-b p-2 tic-border">
              <Link href={href}>
                <a className="flex items-center">
                  <span className="dark:text-gray-300 text-gray-600 tic-icon-md mr-3">
                    <Icon />
                  </span>
                  <span className="underline">{label}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="tic-h3 mb-2 px-2">{props.translate('mobileNav.settings.title')}</h2>
        <ul className="text-xs">
          <li>
            <label className="flex items-center p-2">
              <span className="text-yellow-500 tic-icon-md mr-3">
                <IconMoon />
              </span>
              <span className="underline flex-1 mr-3">
                {props.translate('mobileNav.settings.darkMode')}
              </span>
              <Switch
                className="-mr-2"
                color="secondary"
                checked={true}
                onChange={() => dispatch(setDarkMode(!isDarkMode))}
              />
            </label>
          </li>
          <li className="border-t tic-border">
            <NavLocaleAccordion translate={props.translate} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavHamburgerDrawer;
