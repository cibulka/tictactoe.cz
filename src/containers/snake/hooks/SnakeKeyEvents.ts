import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'src/redux';
import { pause, setDirection } from 'src/redux/snake';

const KEYS_LEFT = ['ArrowLeft', 'KeyA'];
const KEYS_RIGHT = ['ArrowRight', 'KeyD'];
const KEYS_BOTTOM = ['ArrowDown', 'KeyS'];
const KEYS_TOP = ['ArrowUp', 'KeyW'];
const KEYS_PAUSE = ['Space'];

const SnakeKeyEvents: FC = () => {
  const dispatch = useDispatch();

  const isOver = useSelector((state) => state.snake.isOver);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      const isTop = KEYS_TOP.includes(e.code);
      if (isTop) {
        dispatch(setDirection('top'));
        return;
      }
      const isRight = KEYS_RIGHT.includes(e.code);
      if (isRight) {
        dispatch(setDirection('right'));
        return;
      }
      const isLeft = KEYS_LEFT.includes(e.code);
      if (isLeft) {
        dispatch(setDirection('left'));
        return;
      }
      const isBottom = KEYS_BOTTOM.includes(e.code);
      if (isBottom) {
        dispatch(setDirection('bottom'));
        return;
      }
      const isPause = KEYS_PAUSE.includes(e.code);
      if (isPause) {
        dispatch(pause());
        return;
      }
    }

    if (document) {
      if (!isOver) {
        document.addEventListener('keydown', handleKeydown);
      } else {
        document.removeEventListener('keydown', handleKeydown);
      }
    }
    return () => {
      if (document) {
        document.removeEventListener('keydown', handleKeydown);
      }
    };
  }, [dispatch, isOver]);

  return null;
};

export default SnakeKeyEvents;
