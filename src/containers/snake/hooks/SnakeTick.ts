import { FC, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'src/redux';
import { tick } from 'src/redux/snake';
import { Interval } from 'src/types/common';

import getSpeed from '../helpers/getSpeed';

const SnakeTick: FC = () => {
  const dispatch = useDispatch();

  const isMoving: boolean = useSelector((state) => {
    const { isPaused, isOver } = state.snake;
    return !isPaused && !isOver;
  });
  const speed: number = useSelector((state) => getSpeed(state.snake.speedLevel));

  const tickInterval = useRef<Interval | null>(null);
  useEffect(() => {
    if (tickInterval.current) {
      clearInterval(tickInterval.current);
    }
    if (isMoving) {
      tickInterval.current = setInterval(() => dispatch(tick()), speed);
    }

    return () => {
      if (tickInterval.current) clearInterval(tickInterval.current);
    };
  }, [dispatch, isMoving, speed]);

  return null;
};

export default SnakeTick;
