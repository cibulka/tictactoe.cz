import React, { FC } from 'react';

import { IconCircle, IconCross, IconCrown, IconSkull } from 'src/icons';
import { Side } from 'src/types/tictactoe';

const TictactoeSide: FC<{ className: string; isWinner?: boolean; side: Side }> = (props) => (
  <div
    className={[
      props.className,
      'flex items-center justify-center',
      'text-white',
      props.isWinner ? 'bg-yellow-500' : props.side === 'cross' ? 'bg-red-600' : 'bg-sky-500',
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <div className="w-2/3 h-2/3">
      {props.isWinner !== undefined ? (
        <>{props.isWinner ? <IconCrown /> : <IconSkull />}</>
      ) : (
        <>
          {props.side === 'cross' && <IconCross />}
          {props.side === 'circle' && <IconCircle />}
        </>
      )}
    </div>
  </div>
);

export default TictactoeSide;
