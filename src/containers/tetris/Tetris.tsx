import React, { FC, useState } from 'react';
import Drawer from '@mui/material/Drawer';

import CountdownStart from 'src/components/countdown-start/CountdownStart';
import Layout from 'src/components/layout/Layout';
import Ratio from 'src/components/ratio/Ratio';
import Spinner from 'src/components/spinner/Spinner';
import config from 'src/config';
import useGamesList from 'src/hooks/useGamesList';
import useIsLocalStorageReady from 'src/hooks/useIsLocalStorageReady';
import useTranslate from 'src/hooks/useTranslate';
import { useDispatch, useSelector } from 'src/redux';
import { pause } from 'src/redux/tetris';

import TetrisBoard from './board/TetrisBoard';
import TetrisBoardCover from './board/TetrisBoardCover';
import TetrisConsent from './consent/TetrisConsent';
import TetrisBoardSwipableApology from './board/TetrisBoardSwipableApology';
import TetrisInfoNextShape from './info/TetrisInfoNextShape';
import TetrisInfoScore from './info/TetrisInfoScore';
import TetrisMenu from './menu/TetrisMenu';

import localization from './Tetris.localization';

const { TETRIS_BOARD_CELLS, TETRIS_BOARD_ROWS } = config;

const Tetris: FC = () => {
  const [boardWidth, setBoardWidth] = useState<number | undefined>(undefined);

  const dispatch = useDispatch();
  const games = useGamesList();
  const translate = useTranslate(localization);

  const isLocalStorageReady = useIsLocalStorageReady();
  const isOver = useSelector((state) => state.tetris.isOver);
  const isLicensePopup = useSelector((state) => !state.tetris.isConsent);

  function togglePause(isPause: boolean) {
    dispatch(pause(isPause));
  }

  const Cover = () => <TetrisBoardCover cssGrid={cssGrid} />;

  const cssGrid = {
    display: 'grid',
    gridTemplateColumns: `repeat(${TETRIS_BOARD_CELLS}, 1fr)`,
    gap: '0.125em',
  };

  const cssSide = {
    width: '50%',
    '@media (orientation: landscape)': {
      width: boardWidth ? `calc((100vw - ${boardWidth}px) / 2)` : '33vw',
    },
  };

  const cssShape = boardWidth
    ? {
        display: 'grid',
        gridTemplateColumns: `repeat(4, 1fr)`,
        gap: '0.125em',
        width: '4em',
        '@media (orientation: landscape)': {
          width: `calc(${(boardWidth / TETRIS_BOARD_CELLS) * 4}px - 1em)`,
        },
      }
    : undefined;

  return (
    <Layout gameName="tetris">
      {isLocalStorageReady && isLicensePopup && (
        <Drawer anchor="top" open>
          <TetrisConsent translate={translate} />
        </Drawer>
      )}
      <div className="flex portrait:flex-col relative flex-1">
        <div
          className={[
            'flex items-center',
            'landscape:absolute landscape:inset-0 landscape:justify-between',
            'py-2',
            'portrait:tic-surface-light portrait:border-b portrait:tic-border',
          ].join(' ')}
        >
          <TetrisInfoNextShape
            css={cssSide}
            cssShape={cssShape}
            className={['relative z-20 flex px-2', 'landscape:justify-center'].join(' ')}
          />
          <TetrisInfoScore
            css={cssSide}
            className={[
              'relative z-20 flex px-2',
              'portrait:justify-end',
              'landscape:justify-center',
            ].join(' ')}
            translate={translate}
          />
        </div>
        <div
          className={[
            'relative flex-1',
            'xl:mt-8 md:mt-4 md:mb-4 sm:mt-4 sm:mb-4',
            isOver ? 'z-30' : 'z-10',
          ].join(' ')}
        >
          <Ratio
            x={TETRIS_BOARD_CELLS}
            y={TETRIS_BOARD_ROWS}
            classNameContent="tic-board"
            onChangeWidth={setBoardWidth}
            onResize={() => togglePause(true)}
          >
            <TetrisBoard className="absolute inset-0 tic-surface-light" cssGrid={cssGrid} />
            <TetrisBoardSwipableApology translate={translate} />
            {!isLocalStorageReady || isLicensePopup ? (
              <div className="absolute z-20 inset-0 flex tic-surface-light text-yellow-500">
                <div className="m-auto">
                  <Spinner />
                </div>
              </div>
            ) : isOver ? (
              <TetrisMenu
                className="mdMax:tic-menuFixed hSmMax:tic-menuFixed absolute"
                Cover={Cover}
                translate={translate}
              />
            ) : (
              <CountdownStart
                color={games.tetris.color}
                onFinish={() => togglePause(false)}
                Cover={Cover}
              />
            )}
          </Ratio>
        </div>
      </div>
    </Layout>
  );
};

export default Tetris;
