import React, { FC } from 'react';
import styled from '@emotion/styled';

import config from 'src/config';

const { TETRIS_BOARD_CELLS, TETRIS_BOARD_ROWS } = config;
const TETRIS_BOARD_AREA = TETRIS_BOARD_CELLS * TETRIS_BOARD_ROWS;

const TetrisBoardCover: FC<{ cssGrid: Record<string, string> }> = (props) => {
  const Grid = styled.div(props.cssGrid);
  return (
    <Grid className="absolute inset-0 tic-surface-light _cover">
      {[...new Array(TETRIS_BOARD_AREA)].map((_cell, index) => (
        <div className="relative tic-surface-dark" key={index}>
          <div className="aspect-w-1 aspect-h-1" />
        </div>
      ))}
    </Grid>
  );
};

export default TetrisBoardCover;
