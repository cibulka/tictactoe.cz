import React, { FC } from 'react';

import Layout from 'src/components/layout/Layout';
import TicTacToePlayer from 'src/components/tictactoe/player/TictactoePlayer';
import { useAuth } from 'src/firebase';
import useTranslate from 'src/hooks/useTranslate';
import useIsLocalStorageReady from 'src/hooks/useIsLocalStorageReady';
import TictactoeLayout from 'src/components/tictactoe/TictactoeLayout';
import TictactoeBoardCell from 'src/components/tictactoe/board/TictactoeBoardCell';
import { useDispatch, useSelector } from 'src/redux';
import { startNewGame, setSize } from 'src/redux/tictactoe-singleplayer';
import { moveThunk } from 'src/redux/tictactoe-singleplayer/actions';

import TictactoeSingleplayerMenu from './menu/TictactoeSingleplayerMenu';
import localization from './TictactoeSingleplayer.localization';

const TicTacToeSingleplayer: FC = () => {
  const [auth, isAuthLoading] = useAuth();
  const translate = useTranslate(localization);
  const dispatch = useDispatch();
  const isLocalStorageReady = useIsLocalStorageReady();

  const cells = useSelector(
    (state) => state.tictactoeSingleplayer.cells,
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next),
  );
  const isPlaying = useSelector((state) => state.tictactoeSingleplayer.isPlaying);
  const isDraw = useSelector((state) => state.tictactoeSingleplayer.isDraw);
  const isWinner = useSelector((state) => state.tictactoeSingleplayer.isWinner);
  const cellsIndexesWinner = useSelector((state) => state.tictactoeSingleplayer.cellsIndexesWinner);
  const size = useSelector((state) => state.tictactoeSingleplayer.size);
  const isOver = isDraw || isWinner !== undefined;

  return (
    <Layout gameName="tictactoeSingleplayer">
      <TictactoeLayout
        playerLeft={
          <TicTacToePlayer
            edge="left"
            isLoading={isAuthLoading}
            isPlaying={!isOver ? isPlaying : undefined}
            isWinner={isWinner === undefined ? undefined : isWinner}
            nickname={translate('player')}
            photo={auth ? auth.photoURL : null}
            side="cross"
          />
        }
        playerRight={
          <TicTacToePlayer
            edge="right"
            isPlaying={!isOver ? !isPlaying : undefined}
            isRobot
            isWinner={isWinner === undefined ? undefined : !isWinner}
            nickname={translate('robot')}
            side="circle"
          />
        }
        BoardCell={({ index }) => {
          const side = cells[index];
          return (
            <TictactoeBoardCell
              disabled={Boolean(!isPlaying || isOver || side)}
              isWinnerCell={Boolean(cellsIndexesWinner && cellsIndexesWinner.includes(index))}
              onClick={() => dispatch(moveThunk(index))}
              side={side}
              sidePlayer="cross"
            />
          );
        }}
        isLoading={!isLocalStorageReady}
        onChangeSize={(newSize) => dispatch(setSize(newSize))}
        Overlay={
          isOver
            ? () => (
                <TictactoeSingleplayerMenu
                  isWinner={isWinner}
                  startNewGame={() => dispatch(startNewGame())}
                  translate={translate}
                />
              )
            : undefined
        }
        size={size}
      />
    </Layout>
  );
};

export default TicTacToeSingleplayer;
