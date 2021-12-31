import React, { FC } from 'react';
import Link from 'next/link';

import Button from 'src/components/button/Button';
import ButtonViewGame from 'src/components/button-view-game/ButtonViewGame';
import IconCarousel from 'src/components/icon-carousel/IconCarousel';
import { IconCrown, IconDraw, IconSkull, IconWork } from 'src/icons';
import { Game, GameName } from 'src/types/app';
import { Translate } from 'src/types/translate';

const GameMenuControls: FC<{
  game: Game;
  gameName: GameName;
  onNewGame: () => void;
  otherGames: Game[];
  score: boolean | number | undefined;
  translate: Translate;
}> = (props) => (
  <div className="flex flex-col m-auto w-full overflow-auto p-4" style={{ maxHeight: '100%' }}>
    {typeof props.score === 'number' ? (
      <dl className="flex hSm:flex-col items-center justify-center hSm:mb-4">
        <dt className="tic-h3 hSmMax:mr-4"> {props.translate('common.games.controls.score')}</dt>
        <dd className="font-mono text-2xl">{props.score}</dd>
      </dl>
    ) : (
      <div className={['flex hSm:flex-col items-center justify-center', 'hSm:mb-8 mb-4'].join(' ')}>
        {props.score === true ? (
          <>
            <div className="tic-icon-xl hSm:mb-4">
              <IconCrown />
            </div>
            <div className="text-2xl">{props.translate('common.games.state.won')}</div>
          </>
        ) : props.score === false ? (
          <>
            <div className="tic-icon-xl hSm:mb-4">
              <IconSkull />
            </div>
            <div className="text-2xl">{props.translate('common.games.state.lost')}</div>
          </>
        ) : (
          <>
            <div className="tic-icon-xl hSm:mb-4">
              <IconDraw />
            </div>
            <div className="text-2xl">{props.translate('common.games.state.draw')}</div>
          </>
        )}
      </div>
    )}
    <div className={['mb-8', props.children && 'p-4', 'dark:bg-black-500'].join(' ')}>
      <Button
        className="ml-auto mr-auto w-40"
        gradient="button"
        onClick={() => props.onNewGame()}
        variant="primary"
      >
        <ButtonViewGame
          classNameIconSize="tic-icon-md"
          gameName={props.gameName}
          text={
            <span className="flex whitespace-nowrap text-black">
              {props.translate('common.games.controls.newGame')}
            </span>
          }
        />
      </Button>
      {props.children && <div className="mt-6">{props.children}</div>}
    </div>
    <div className="flex flex-col items-center justify-center px-4">
      <div className="m-auto">
        <Link href="/">
          <a className="flex w-40 mb-8 overflow-hidden">
            <Button className="w-full" component="span" gradient="button" variant="primary">
              <span className="flex items-center w-full">
                <span className="flex-1 mr-4">
                  {props.translate('common.games.controls.moreGames')}
                </span>
                <IconCarousel
                  className="tic-icon-md"
                  icons={props.otherGames.map((game, i) => (
                    <game.Icon key={i} style={{ color: game.color }} />
                  ))}
                />
              </span>
            </Button>
          </a>
        </Link>
        <Link href="/readme">
          <a className="flex w-full">
            <Button className="w-full" component="span" gradient="button" variant="primary">
              <span className="flex items-center w-full">
                <span className="flex-1 mr-4">
                  {props.translate('common.games.controls.hireMe')}
                </span>
                <span className="tic-icon-md">
                  <IconWork className="w-full h-full" />
                </span>
              </span>
            </Button>
          </a>
        </Link>
      </div>
    </div>
  </div>
);

export default GameMenuControls;
