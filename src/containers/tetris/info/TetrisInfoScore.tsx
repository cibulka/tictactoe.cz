import React, { FC } from 'react';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';

import { useSelector } from 'src/redux';
import { Css } from 'src/types/app';

import getScore from '../helpers/getScore';
import { Translate } from 'src/types/translate';

const TetrisInfoScore: FC<{ className: string; css: Css; translate: Translate }> = (props) => {
  const Side = styled.div(props.css);

  const level = useSelector((state) => state.tetris.level);
  const score = useSelector((state) => {
    const { cleared, level, initialLevel, initialRows } = state.tetris;
    return getScore(cleared, level, initialRows, initialLevel);
  });
  const isLocalStorageInited = useSelector((state) => state.app.isLocalStorageInited);

  const Dl = !isLocalStorageInited ? 'div' : 'dl';
  const Dt = !isLocalStorageInited ? 'div' : 'dt';
  const Dd = !isLocalStorageInited ? 'div' : 'dd';

  return (
    <Side className={props.className}>
      <div className={['landscape:m-auto', 'portrait:flex'].join(' ')}>
        <Dl className="landscape:mb-8 portrait:flex items-center portrait:mr-4">
          <Dt className="tic-h3 portrait:hidden">
            {props.translate('common.games.controls.level')}
          </Dt>
          <Dt className="tic-h3 hidden portrait:block">
            {props.translate('common.games.controls.levelShort')}
          </Dt>
          <Dd className="landscape:mt-2 portrait:ml-2">
            {!isLocalStorageInited ? (
              <Skeleton variant="text" className="min-w-4" />
            ) : (
              <span className="landscape:font-mono landscape:text-4xl">{level}</span>
            )}
          </Dd>
        </Dl>
        <Dl className="portrait:flex items-center">
          <Dt className="tic-h3 portrait:hidden">
            {props.translate('common.games.controls.score')}
          </Dt>
          <Dt className="tic-h3 hidden portrait:block">
            {props.translate('common.games.controls.scoreShort')}
          </Dt>
          <Dd className="landscape:mt-2 portrait:ml-2">
            {!isLocalStorageInited ? (
              <Skeleton variant="text" className="min-w-4" />
            ) : (
              <span className="landscape:font-mono landscape:text-4xl">{score}</span>
            )}
          </Dd>
        </Dl>
      </div>
    </Side>
  );
};

export default TetrisInfoScore;
