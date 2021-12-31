import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Squash as Hamburger } from 'hamburger-react';
import { useRouter } from 'next/router';
import Drawer from '@mui/material/Drawer';

import HireMeIcon from 'src/components/hire-me-icon/HireMeIcon';
import useTranslate from 'src/hooks/useTranslate';
import useDarkMode from 'src/hooks/useDarkMode';
import { IconMoon, IconSun, IconUser, IconWork } from 'src/icons';
import { useDispatch } from 'src/redux';
import { setDarkMode } from 'src/redux/preferences';
import { GameName } from 'src/types/app';

import NavHamburgerDrawer from './NavHamburgerDrawer';
import NavLocaleMenu from './NavLocaleMenu';
import NavLogo from './NavLogo';
import localization from './Nav.localization';

const Nav: FC<{ className?: string; gameName?: GameName }> = (props) => {
  const [isHamburgerDrawerOpen, setIsHamburgerDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const translate = useTranslate(localization);
  const isDarkMode = useDarkMode();

  useEffect(() => {
    router.beforePopState(() => {
      setIsHamburgerDrawerOpen(false);
      return true;
    });
  }, [router]);

  return (
    <div className="sticky z-30 bottom-0 transform">
      <nav
        className={[
          'relative z-40',
          'flex items-center justify-between',
          'sm:px-4 px-2 py-1',
          'overflow-hidden', // prevent animation overflow
          props.className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <NavLogo gameName={props.gameName} />
        <ul className="flex items-center">
          <li>
            <Link href="/user">
              <a className="flex tic-icon-big">
                <IconUser />
              </a>
            </Link>
          </li>
          <li className="smMax:hidden ml-6">
            <button
              type="button"
              className="tic-icon-big text-yellow-500"
              onClick={() => {
                const payload = isDarkMode === undefined ? false : !isDarkMode;
                dispatch(setDarkMode(payload));
              }}
            >
              {isDarkMode === false ? <IconMoon /> : <IconSun />}
            </button>
          </li>
          <li className="smMax:hidden ml-6">
            <Link href="/readme">
              <a className="flex">
                <HireMeIcon className="tic-icon-big" />
              </a>
            </Link>
          </li>
          <li className="smMax:hidden ml-6">
            <NavLocaleMenu translate={translate} />
          </li>
        </ul>
        <div className="hidden smMax:flex">
          <Hamburger size={36} toggled={isHamburgerDrawerOpen} toggle={setIsHamburgerDrawerOpen} />
        </div>
      </nav>
      <div className="absolute inset-0 opacity-90 bg-gray-100 dark:bg-gray-900" />
      <Drawer
        anchor="right"
        keepMounted
        open={isHamburgerDrawerOpen}
        onClose={() => setIsHamburgerDrawerOpen(false)}
      >
        <NavHamburgerDrawer translate={translate} onClose={() => setIsHamburgerDrawerOpen(false)} />
      </Drawer>
    </div>
  );
};

export default Nav;
