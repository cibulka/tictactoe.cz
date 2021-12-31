import React, { FC } from 'react';

import Layout from 'src/components/layout/Layout';
import Ratio from 'src/components/ratio/Ratio';
import Spinner from 'src/components/spinner/Spinner';
import config from 'src/config';
import useGamesList from 'src/hooks/useGamesList';
import useTranslate from 'src/hooks/useTranslate';
import { useDispatch, useSelector } from 'src/redux';
import { pause } from 'src/redux/snake';

import CountdownStart from 'src/components/countdown-start/CountdownStart';

import SnakeBoard from './board/SnakeBoard';
import SnakeBoardCover from './board/SnakeBoardCover';
import SnakeBoardTouchNav from './board/SnakeBoardTouchNav';
import SnakeKeyEvents from './hooks/SnakeKeyEvents';
import SnakeTick from './hooks/SnakeTick';
import SnakeInfo from './info/SnakeInfo';
import SnakeMenu from './menu/SnakeMenu';

import localization from './Snake.localization';
import styles from './Snake.module.css';
import useIsLocalStorageReady from 'src/hooks/useIsLocalStorageReady';

const { SNAKE_BOARD_CELLS, SNAKE_BOARD_ROWS } = config;

const Snake: FC = () => {
  const dispatch = useDispatch();
  const translate = useTranslate(localization);
  const gamesList = useGamesList();

  const cssGrid = {
    display: 'grid',
    gridTemplateColumns: `repeat(${SNAKE_BOARD_CELLS}, 1fr)`,
    gap: '0.125em',
  };

  const isOver = useSelector((state) => state.snake.isOver);
  const isLocalStorageReady = useIsLocalStorageReady();

  const Cover = () => <SnakeBoardCover cssGrid={cssGrid} />;

  function togglePause(isPause: boolean) {
    dispatch(pause(isPause));
  }

  return (
    <Layout gameName="snake">
      <>
        <SnakeKeyEvents />
        <SnakeTick />
        <SnakeInfo translate={translate} />
        <div className="relative flex flex-1">
          <div className={[styles.ratioWrap, 'xl:mt-4 xl:mb-4'].join(' ')}>
            <Ratio
              x={SNAKE_BOARD_CELLS}
              y={SNAKE_BOARD_ROWS}
              classNameContent="tic-board dark:bg-teal-900"
              onResize={() => togglePause(true)}
            >
              <SnakeBoard className="absolute inset-0" cssGrid={cssGrid} />
              {!isLocalStorageReady ? (
                <div className="absolute z-20 inset-0 flex bg-gray-100 text-teal-500">
                  <div className="m-auto">
                    <Spinner />
                  </div>
                </div>
              ) : isOver ? (
                <SnakeMenu
                  className="mdMax:tic-menuFixed hSmMax:tic-menuFixed absolute"
                  Cover={Cover}
                  translate={translate}
                />
              ) : (
                <CountdownStart
                  color={gamesList.snake.color}
                  onFinish={() => togglePause(false)}
                  Cover={Cover}
                />
              )}
            </Ratio>
          </div>
          {!isOver && <SnakeBoardTouchNav classNameButton={styles.touchButton} />}
        </div>
      </>
    </Layout>
  );
};

export default Snake;
