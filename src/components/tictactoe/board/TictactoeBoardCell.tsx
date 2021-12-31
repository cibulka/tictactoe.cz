import React, { FC } from 'react';

import { Side } from 'src/types/tictactoe';

import TictactoeSide from '../components/TictactoeSide';

const TicTacToeBoardCell: FC<{
  disabled: boolean;
  isWinnerCell: boolean;
  onClick?: () => void;
  side: Side | null;
  sidePlayer: Side;
}> = (props) => (
  <button
    className={[
      'absolute inset-0',
      'flex w-full items-center justify-center',
      'focus:outline-none',
      'rounded md:rounded-md',
      'border-2 border-white dark:border-gray-900',
      'bg-stone-300',
      props.sidePlayer === 'cross' && 'focus:bg-red-600',
      props.sidePlayer === 'circle' && 'focus:bg-sky-500',
    ]
      .filter(Boolean)
      .join(' ')}
    onClick={props.onClick}
    type="button"
    disabled={props.disabled}
  >
    {props.side && (
      <TictactoeSide
        className="w-full h-full"
        isWinner={props.isWinnerCell ? true : undefined}
        side={props.side}
      />
    )}
  </button>
);

export default TicTacToeBoardCell;
