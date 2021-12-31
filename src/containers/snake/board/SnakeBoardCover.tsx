import React, { FC } from 'react';
import styled from '@emotion/styled';

import config from 'src/config';

const { SNAKE_BOARD_ROWS, SNAKE_BOARD_CELLS } = config;
const SNAKE_AREA = SNAKE_BOARD_ROWS * SNAKE_BOARD_CELLS;

const SnakeBoardCover: FC<{ cssGrid: Record<string, string> }> = (props) => {
  const Grid = styled.div(props.cssGrid);
  return (
    <Grid className="absolute z-10 inset-0 bg-stone-500 _cover">
      {[...new Array(SNAKE_AREA)].map((_cell, index) => (
        <div className="relative tic-surface-dark" key={index}>
          <div className="aspect-w-1 aspect-h-1" />
        </div>
      ))}
    </Grid>
  );
};

export default SnakeBoardCover;
