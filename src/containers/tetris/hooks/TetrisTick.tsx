import { FC, useEffect, useRef } from 'react';

import config from 'src/config';
import { useDispatch, useSelector } from 'src/redux';
import { clearFull, tick } from 'src/redux/tetris';
import { Interval, Timeout } from 'src/types/common';

import getSpeed from '../helpers/getSpeed';

const { TETRIS_SPEED_DROP } = config;

const TetrisBoardTick: FC = (props) => {
  const dispatch = useDispatch();

  const full = useSelector((state) => state.tetris.full);
  const isMoving = useSelector((state) => {
    const { isPaused, isOver, full } = state.tetris;
    return !isPaused && !isOver && !full;
  });
  const speed: number = useSelector((state) => {
    const { isDrop, level } = state.tetris;
    return isDrop ? TETRIS_SPEED_DROP : getSpeed(level);
  });

  // Tick
  const tickInterval = useRef<Interval | null>(null);
  useEffect(() => {
    if (tickInterval.current) clearInterval(tickInterval.current);
    if (isMoving) tickInterval.current = setInterval(() => dispatch(tick()), speed);
    return () => {
      if (tickInterval.current) clearInterval(tickInterval.current);
    };
  }, [dispatch, isMoving, speed]);

  // Clear full
  const clearRowsTimeout = useRef<Timeout | null>(null);
  useEffect(() => {
    if (clearRowsTimeout.current) clearTimeout(clearRowsTimeout.current);
    if (full) clearRowsTimeout.current = setTimeout(() => dispatch(clearFull()), speed * 2);

    return () => {
      if (clearRowsTimeout.current) clearTimeout(clearRowsTimeout.current);
    };
  }, [dispatch, full, speed]);

  return null;
};

export default TetrisBoardTick;
