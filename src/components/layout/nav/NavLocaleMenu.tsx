import React, { FC } from 'react';

import Menu from 'src/components/menu/Menu';
import { useServerRouterLocaleContext } from 'src/context';
import { IconCheck, IconChevronDown, IconGlobe } from 'src/icons';
import { Translate } from 'src/types/translate';

const NavLocaleMenu: FC<{ translate: Translate }> = (props) => {
  const ctx = useServerRouterLocaleContext();
  if (!ctx) return null;

  const { locale, locales, pathname, query } = ctx;

  const hrefs =
    locales && pathname && query
      ? locales.map((l) => (l === locale ? null : { pathname, query }))
      : undefined;

  const menuItems =
    locales && locale
      ? locales.map((l, i) => (
          <span
            className={['flex items-center w-full p-2', i > 0 && 'border-t tic-border']
              .filter(Boolean)
              .join(' ')}
            key={i}
          >
            <span className="flex-1">
              {props.translate(`locales.${l}`, undefined, undefined, l, locale)}
            </span>
            {l === locale && (
              <span className="text-teal-500 w-4 h-4 ml-2">
                <IconCheck />
              </span>
            )}
          </span>
        ))
      : undefined;

  if (!hrefs || !menuItems || hrefs.length < 1) return null;

  return (
    <Menu
      hrefs={hrefs}
      items={menuItems}
      locales={locales}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <span className="flex items-center">
        <span className="tic-icon-md mr-2">
          <IconGlobe />
        </span>
        <span className="dark:text-white mdMax:hidden tic-h3">
          {props.translate(`locales.${locale}`)}
        </span>
        <span className="w-4 h-4 ml-1">
          <IconChevronDown />
        </span>
      </span>
    </Menu>
  );
};

export default NavLocaleMenu;
