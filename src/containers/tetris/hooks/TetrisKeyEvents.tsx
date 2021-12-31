import { FC, useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'src/redux';
import { drop, moveBy, pause, rotateBlock } from 'src/redux/tetris';

const KEYS_DIRECTION = ['ArrowUp', 'KeyW', 'Enter'];
const KEYS_LEFT = ['ArrowLeft', 'KeyA'];
const KEYS_RIGHT = ['ArrowRight', 'KeyD'];
const KEYS_BOTTOM = ['ArrowDown', 'KeyS'];
const KEYS_PAUSE = ['Space'];

export const TetrisBoardKeyEvents: FC = () => {
  const dispatch = useDispatch();

  const isOver = useSelector((state) => state.tetris.isOver);
  const isPaused = useSelector((state) => state.tetris.isPaused);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      console.log('keydown?');

      const isDirectionChange = KEYS_DIRECTION.includes(e.code);
      if (isDirectionChange) {
        dispatch(rotateBlock());
        return;
      }
      const isRight = KEYS_RIGHT.includes(e.code);
      if (isRight) {
        dispatch(moveBy(1));
        return;
      }
      const isLeft = KEYS_LEFT.includes(e.code);
      if (isLeft) {
        dispatch(moveBy(-1));
        return;
      }
      const isBottom = KEYS_BOTTOM.includes(e.code);
      if (isBottom) {
        dispatch(drop(true));
        return;
      }
      const isPause = KEYS_PAUSE.includes(e.code);
      if (isPause) {
        dispatch(pause(!isPaused));
      }
    },
    [dispatch, isPaused],
  );

  const handleKeyup = useCallback(
    (e: KeyboardEvent) => {
      const isBottom = KEYS_BOTTOM.includes(e.code);
      if (isBottom) {
        dispatch(drop(false));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (document) {
      if (!isOver) {
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('keyup', handleKeyup);
      } else {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('keyup', handleKeyup);
      }
    }
    return () => {
      if (document) {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('keyup', handleKeyup);
      }
    };
  }, [dispatch, handleKeydown, handleKeyup, isOver]);

  return null;
};

export default TetrisBoardKeyEvents;
