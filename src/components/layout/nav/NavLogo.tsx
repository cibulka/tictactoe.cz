import React, { FC, ReactNode } from 'react';
import Link from 'next/link';

import ButtonViewGame from 'src/components/button-view-game/ButtonViewGame';
import Menu from 'src/components/menu/Menu';
import useGamesList from 'src/hooks/useGamesList';
import { IconChevronDown } from 'src/icons';
import { GameName } from 'src/types/app';

const NavLogoView: FC<{ gameName: GameName; isMenu?: boolean }> = (props) => {
  const gamesList = useGamesList();
  const game = gamesList[props.gameName];
  if (!game) throw new Error(`Game ${props.gameName} does not exist.`);

  return (
    <div className="flex items-center">
      <div className="tic-icon-big" style={{ color: game.color }}>
        <game.Icon />
      </div>
      <h1
        className={[
          'dark:text-white ml-3 tic-h3 smMax:hidden',
          props.isMenu && 'border-b border-dashed border-b-current',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {game.label}
      </h1>
    </div>
  );
};

const NavLogo: FC<{ className?: string; gameName?: GameName; isMenu?: boolean }> = (props) => {
  const gamesList = useGamesList();
  const gameNames = Object.keys(gamesList) as GameName[];

  const menuItems: ReactNode[] = gameNames.map((gameName, i) => {
    return <ButtonViewGame gameName={gameName} isBorder={i > 0} isPadding key={i} />;
  });
  const menuHrefs = gameNames.map((gameName) => {
    if (gameName === props.gameName) return null;
    return gamesList[gameName].href;
  });

  return props.gameName ? (
    <Menu
      hrefs={menuHrefs}
      items={menuItems}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <span className={['flex items-center', props.className].filter(Boolean).join(' ')}>
        <NavLogoView gameName={props.gameName} isMenu />
        <span className="w-4 h-4 ml-1">
          <IconChevronDown />
        </span>
      </span>
    </Menu>
  ) : (
    <Link href="/">
      <a className={['flex', props.className].join(' ')}>
        <NavLogoView gameName="tictactoeSingleplayer" />
      </a>
    </Link>
  );
};

export default NavLogo;
