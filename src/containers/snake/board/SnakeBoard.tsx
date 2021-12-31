import React, { FC } from 'react';
import styled from '@emotion/styled';

import config from 'src/config';
import { useSelector } from 'src/redux';

import styles from './SnakeBoard.module.css';

const { SNAKE_BOARD_CELLS, SNAKE_BOARD_ROWS } = config;
const SNAKE_AREA = SNAKE_BOARD_CELLS * SNAKE_BOARD_ROWS;

const SnakeBoard: FC<{ className: string; cssGrid: Record<string, string> }> = (props) => {
  const directionNext = useSelector((state) => state.snake.directionNext);
  const dot = useSelector((state) => state.snake.dot);
  const snake = useSelector((state) => state.snake.snake);
  const isOver = useSelector((state) => state.snake.isOver);

  const Grid = styled.div(props.cssGrid);

  return (
    <Grid className={props.className}>
      {[...new Array(SNAKE_AREA)].map((_el, index) => {
        const isDot = dot === index;
        const isSnakeBody = snake.includes(index);
        const isSnakeHead = isSnakeBody && snake[snake.length - 1] === index;
        return (
          <div
            key={index}
            className={[
              'relative',
              'flex items-center justify-center',
              styles.snakeCell,
              isDot && 'bg-red-500 rounded-full transform scale-75 animate animate-pulse',
              isSnakeBody && styles.snakeBody,
              isSnakeHead && styles.snakeHead,
              isSnakeHead && isOver && styles.snakeHeadDead,
              isSnakeHead && directionNext === 'top' && styles.snakeHeadTop,
              isSnakeHead && directionNext === 'right' && styles.snakeHeadRight,
              isSnakeHead && directionNext === 'bottom' && styles.snakeHeadBottom,
              isSnakeHead && directionNext === 'left' && styles.snakeHeadLeft,
            ]
              .filter(Boolean)
              .join(' ')}
          />
        );
      })}
    </Grid>
  );
};

export default SnakeBoard;
