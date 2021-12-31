import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';

import config from 'src/config';
import { useDispatch, useSelector } from 'src/redux';
import { pause } from 'src/redux/tetris';

import getBlockIndexes from '../helpers/getBlockIndexes';
import TetrisKeyEvents from '../hooks/TetrisKeyEvents';
import TetrisTick from '../hooks/TetrisTick';

const { TETRIS_BOARD_CELLS, TETRIS_BOARD_ROWS } = config;
const TETRIS_CELLS_EDGED = TETRIS_BOARD_CELLS + 2;
const TETRIS_AREA = TETRIS_CELLS_EDGED * TETRIS_BOARD_ROWS;

function isEdge(index: number) {
  if (index % TETRIS_CELLS_EDGED === 0) return true;
  if ((index + 1) % TETRIS_CELLS_EDGED === 0) return true;
  return false;
}

const TetrisBoard: FC<{ className: string; cssGrid: Record<string, string> }> = (props) => {
  const dispatch = useDispatch();

  const { activeBlockIndexes, blockType, board, full } = useSelector((state) => {
    const { blockType, board, full, rotate, x, y } = state.tetris;
    return {
      activeBlockIndexes: full ? null : getBlockIndexes(blockType, rotate, x, y),
      blockType,
      board,
      full,
    };
  });

  const Grid = styled.div(props.cssGrid);

  useEffect(() => {
    return () => dispatch(pause(true));
  }, [dispatch]);

  return (
    <>
      <TetrisKeyEvents />
      <TetrisTick />
      <Grid className={props.className}>
        {[...Array(TETRIS_AREA)].map((_cell, cellI) => {
          if (isEdge(cellI)) return null;

          if (full && full.includes(Math.floor(cellI / TETRIS_CELLS_EDGED))) {
            return <span className="dark:bg-white bg-black" key={cellI} />;
          }

          let cellBlockType;
          if (board[cellI]) {
            cellBlockType = board[cellI];
          } else if (activeBlockIndexes && activeBlockIndexes.includes(cellI)) {
            cellBlockType = blockType;
          }

          if (!cellBlockType) return <span key={cellI} />;

          switch (cellBlockType) {
            case 'I':
              return <span key={cellI} className="bg-red-600" />;
            case 'J':
              return <span key={cellI} className="bg-orange-500" />;
            case 'L':
              return <span key={cellI} className="bg-teal-500" />;
            case 'O':
              return <span key={cellI} className="bg-sky-500" />;
            case 'S':
              return <span key={cellI} className="bg-violet-500" />;
            case 'T':
              return <span key={cellI} className="bg-pink-500" />;
            case 'Z':
              return <span key={cellI} className="bg-yellow-500" />;
            default:
              return <span key={cellI} />;
          }
        })}
      </Grid>
    </>
  );
};

export default TetrisBoard;
