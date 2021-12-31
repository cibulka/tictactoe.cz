import React, { FC, useState } from 'react';

import GameMenu from 'src/components/game-menu/GameMenu';
import { useDispatch, useSelector } from 'src/redux';
import { startNewGame } from 'src/redux/tetris';
import { Translate } from 'src/types/translate';

import getScore from '../helpers/getScore';

import TetrisGameSetup from './TetrisGameSetup';

const TetrisGameMenu: FC<{ className: string; Cover: FC; translate: Translate }> = (props) => {
  const dispatch = useDispatch();

  const cleared = useSelector((state) => state.tetris.cleared);
  const initialLevel = useSelector((state) => state.tetris.initialLevel);
  const initialRows = useSelector((state) => state.tetris.initialRows);
  const level = useSelector((state) => state.tetris.level);
  const score = getScore(cleared, level, initialRows, initialLevel);

  const [nextInitialLevel, setNextInitialLevel] = useState(initialLevel);
  const [nextInitialRows, setNextInitialRows] = useState(initialRows);

  return (
    <GameMenu
      className={props.className}
      gameName="tetris"
      score={score}
      onNewGame={() =>
        dispatch(startNewGame({ initialLevel: nextInitialLevel, initialRows: nextInitialRows }))
      }
      Cover={props.Cover}
      translate={props.translate}
    >
      <TetrisGameSetup
        level={nextInitialLevel}
        onChangeLevel={setNextInitialLevel}
        onChangeRows={setNextInitialRows}
        rows={nextInitialRows}
        translate={props.translate}
      />
    </GameMenu>
  );
};

export default TetrisGameMenu;
