import React, { FC, ReactNode } from 'react';

import useGamesList from 'src/hooks/useGamesList';
import { GameName } from 'src/types/app';

const ButtonViewGame: FC<{
  className?: string;
  classNameIconSize?: 'tic-icon-xl' | 'tic-icon-md';
  gameName: GameName;
  isBorder?: boolean;
  isPadding?: boolean;
  text?: string | ReactNode;
}> = (props) => {
  const games = useGamesList();
  const game = games[props.gameName];

  return (
    <span
      className={[
        'flex items-center w-full',
        props.className,
        props.isPadding && 'p-2',
        props.isBorder && 'border-t tic-border',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        className={['flex-shrink-0 mr-3', props.classNameIconSize || 'tic-icon-xl'].join(' ')}
        style={{ color: game.color }}
      >
        <game.Icon />
      </span>
      <span className="block">
        {props.text ? (
          <strong className="block">{props.text}</strong>
        ) : (
          <>
            <strong className="block text-xl">{game.label}</strong>
            <span className="block text-xs">{game.subtitle || '–'}</span>
          </>
        )}
      </span>
    </span>
  );
};

export default ButtonViewGame;
