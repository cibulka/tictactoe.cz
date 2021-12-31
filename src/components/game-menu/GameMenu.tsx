import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';

import useGamesList from 'src/hooks/useGamesList';
import { Game, GameName } from 'src/types/app';
import { Translate } from 'src/types/translate';

import GameMenuControls from './components/GameMenuControls';
import GameMenuHide from './components/GameMenuHide';

const GameMenu: FC<{
  className: string;
  Cover: FC;
  gameName: GameName;
  onNewGame: () => void;
  score: number | boolean | undefined;
  translate: Translate;
}> = (props) => {
  const [isMovedDown, setIsMovedDown] = useState<boolean | undefined>(undefined);

  const games = useGamesList();
  const game = games[props.gameName];

  const otherGames: Game[] = [];
  Object.keys(games).map((key) => {
    if (key === props.gameName) return;
    otherGames.push(games[key as GameName]);
  });

  const overlayDelay = isMovedDown === undefined ? 1 : 0;

  return (
    <div className={['flex', 'z-20 inset-0', props.className].filter(Boolean).join(' ')}>
      <motion.div
        className="absolute inset-0"
        initial={{ y: '100%' }}
        animate={{ y: isMovedDown ? '100%' : 0 }}
        transition={{ delay: overlayDelay, transition: 0.5 }}
      >
        <props.Cover />
      </motion.div>

      <motion.div
        className="absolute z-20 top-2 right-4"
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
      >
        <GameMenuHide
          isHidden={Boolean(isMovedDown)}
          toggle={() => setIsMovedDown((old) => (!old ? true : false))}
        />
      </motion.div>
      <motion.div
        className="absolute z-10 inset-0 flex tic-surface-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMovedDown ? 0 : 1 }}
        transition={{
          delay: isMovedDown ? 0 : overlayDelay + 0.5,
          transition: 0.3,
        }}
      >
        <GameMenuControls
          game={game}
          gameName={props.gameName}
          otherGames={otherGames}
          onNewGame={() => props.onNewGame()}
          score={props.score}
          translate={props.translate}
        >
          {props.children}
        </GameMenuControls>
      </motion.div>
    </div>
  );
};

export default GameMenu;
