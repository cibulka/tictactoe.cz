import React, { FC } from 'react';

import { useSelector } from 'src/redux';
import { Translate } from 'src/types/translate';

import getScore from '../helpers/getScore';

const SnakeInfo: FC<{ translate: Translate }> = (props) => {
  const speedLevel = useSelector((state) => state.snake.speedLevel);
  const dots = useSelector((state) => state.snake.dots);

  return (
    <div
      className={['flex justify-between', 'py-2 md:px-4 px-2', 'bg-gray-100 dark:bg-gray-900'].join(
        ' ',
      )}
    >
      <dl className="flex items-center">
        <dt className="tic-h3 mr-2">{props.translate('common.games.controls.level')}</dt>
        <dd>{speedLevel + 1}</dd>
      </dl>
      <dl className="flex items-center">
        <dt className="tic-h3 mr-2">{props.translate('common.games.controls.score')}</dt>
        <dd>{getScore(dots, speedLevel)}</dd>
      </dl>
    </div>
  );
};

export default SnakeInfo;
