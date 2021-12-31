import React, { FC, useState } from 'react';

import GameMenu from 'src/components/game-menu/GameMenu';
import { useDispatch, useSelector } from 'src/redux';
import { startNewGame } from 'src/redux/snake';
import { Translate } from 'src/types/translate';

import getScore from '../helpers/getScore';

import SnakeGameSetup from './SnakeGameSetup';

const SnakeGameMenu: FC<{ className: string; Cover: FC; translate: Translate }> = (props) => {
  const dispatch = useDispatch();

  const speedLevel = useSelector((state) => state.snake.speedLevel);
  const dots = useSelector((state) => state.snake.dots);
  const score = getScore(dots, speedLevel);

  const [nextSpeedLevel, setNextSpeedLevel] = useState(speedLevel);

  return (
    <GameMenu
      className={props.className}
      gameName="snake"
      score={score}
      onNewGame={() => dispatch(startNewGame({ speedLevel: nextSpeedLevel }))}
      Cover={props.Cover}
      translate={props.translate}
    >
      <SnakeGameSetup
        onChangeSpeed={setNextSpeedLevel}
        speed={nextSpeedLevel}
        translate={props.translate}
      />
    </GameMenu>
  );
};

export default SnakeGameMenu;
