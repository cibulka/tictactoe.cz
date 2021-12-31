import React, { FC, useCallback } from 'react';

import { IconArrow } from 'src/icons';
import { useDispatch, useSelector } from 'src/redux';
import { setDirection } from 'src/redux/snake';
import { Direction, TouchArrowDirection } from 'src/types/snake';

function getDirectionFromTouchDirection(
  touchDirection: TouchArrowDirection,
  direction: Direction,
): Direction {
  switch (direction) {
    case 'top':
    case 'bottom':
      switch (touchDirection) {
        case 'top-left':
        case 'bottom-left':
          return 'left';
        case 'top-right':
        case 'bottom-right':
          return 'right';
        default:
          throw new Error('getDirectionFromTouchDirection: Bad logic.');
      }
    case 'left':
    case 'right':
      switch (touchDirection) {
        case 'top-left':
        case 'top-right':
          return 'top';
        case 'bottom-left':
        case 'bottom-right':
          return 'bottom';
        default:
          throw new Error('getDirectionFromTouchDirection: Bad logic.');
      }
    default:
      throw new Error('getDirectionFromTouchDirection: Bad logic.');
  }
}

const SnakeBoardTouchNav: FC<{ classNameButton: string }> = (props) => {
  const dispatch = useDispatch();
  const direction = useSelector((state) => state.snake.direction);

  const handleDirectionChange = useCallback(
    (touchDirection: TouchArrowDirection) => {
      const newDirection = getDirectionFromTouchDirection(touchDirection, direction);
      dispatch(setDirection(newDirection));
    },
    [direction, dispatch],
  );

  const arrows: Record<
    TouchArrowDirection,
    { className: string; onClick: () => void; rotate: string }
  > = {
    'top-left': {
      className: 'top-4 left-4',
      onClick: () => handleDirectionChange('top-left'),
      rotate: '-45deg',
    },
    'top-right': {
      className: 'top-4 right-4',
      onClick: () => handleDirectionChange('top-right'),
      rotate: '45deg',
    },
    'bottom-left': {
      className: 'bottom-4 left-4',
      onClick: () => handleDirectionChange('bottom-left'),
      rotate: '-135deg',
    },
    'bottom-right': {
      className: 'bottom-4 right-4',
      onClick: () => handleDirectionChange('bottom-right'),
      rotate: '135deg',
    },
  };

  return (
    <>
      {Object.keys(arrows).map((key) => {
        const touchArrowDirection = key as TouchArrowDirection;
        const { className, onClick, rotate } = arrows[touchArrowDirection];
        return (
          <button
            className={[
              'absolute',
              className,
              'hidden touch:flex',
              'items-center justify-center',
              'tic-surface-light rounded-full',
              props.classNameButton,
            ].join(' ')}
            key={touchArrowDirection}
            type="button"
            onClick={() => onClick()}
          >
            <span className="block w-3/4 h-3/4" style={{ transform: `rotate(${rotate})` }}>
              <IconArrow />
            </span>
          </button>
        );
      })}
    </>
  );
};

export default SnakeBoardTouchNav;
