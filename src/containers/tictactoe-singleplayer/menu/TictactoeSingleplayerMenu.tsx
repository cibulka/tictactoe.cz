import React, { FC } from 'react';

import GameMenu from 'src/components/game-menu/GameMenu';
import TictactoeCover from 'src/components/tictactoe/board/TictactoeCover';
import { Translate } from 'src/types/translate';

const TicTacToeGameMenu: FC<{
  isWinner?: boolean;
  startNewGame: () => void;
  translate: Translate;
}> = (props) => (
  <GameMenu
    className="mdMax:tic-menuFixed hSmMax:tic-menuFixed absolute"
    gameName="tictactoeSingleplayer"
    score={props.isWinner}
    onNewGame={() => props.startNewGame()}
    Cover={TictactoeCover}
    translate={props.translate}
  />
);

export default TicTacToeGameMenu;
