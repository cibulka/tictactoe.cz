import React, { FC, ReactNode } from 'react';
import Skeleton from '@mui/material/Skeleton';

import Tooltip from 'src/components/tooltip/Tooltip';
import { IconArrow } from 'src/icons';
import { Side } from 'src/types/tictactoe';

import TictactoeSide from '../components/TictactoeSide';

import TictactoePlayerTooltip from './TictactoePlayerTooltip';

const TictactoePlayer: FC<{
  children?: ReactNode;
  edge: 'left' | 'right';
  isLoading?: boolean;
  isPlaying?: boolean;
  isRobot?: boolean;
  isWinner?: boolean;
  nickname?: string | ReactNode;
  photo?: string | null;
  side: Side;
}> = (props) => (
  <div className="flex flex-col items-center relative">
    {props.isPlaying && (
      <div
        className={[
          'absolute',
          'landscape:-top-8 portrait:top-1',
          props.edge === 'left' ? 'portrait:-right-8' : 'portrait:-left-8',
          'landscape:animate-bounce',
        ].join(' ')}
      >
        <IconArrow
          className={[
            'w-6 h-6',
            'transform',
            'rotate-180',
            props.edge === 'left' ? 'portrait:-rotate-90' : 'portrait:rotate-90',
          ].join(' ')}
        />
      </div>
    )}
    <div className="portrait:hidden">
      <TictactoeSide
        className="rounded overflow-hidden tic-icon-big"
        isWinner={props.isWinner}
        side={props.side}
      />
    </div>
    <Tooltip
      className="hidden portrait:block w-full"
      placement={props.edge === 'left' ? 'bottom-end' : 'bottom-start'}
      title={
        <TictactoePlayerTooltip
          isLoading={Boolean(props.isLoading)}
          isRobot={Boolean(props.isRobot)}
          nickname={props.nickname || undefined}
          photo={props.photo}
        />
      }
    >
      <TictactoeSide
        className="rounded overflow-hidden tic-icon-big"
        isWinner={props.isWinner}
        side={props.side}
      />
    </Tooltip>
    <div className="flex justify-center portrait:hidden w-full mt-4">
      {props.nickname ? (
        <span className="truncate font-bold">{props.nickname}</span>
      ) : (
        <Skeleton variant="text" className="dark:bg-black-400 w-20" />
      )}
    </div>

    {props.children}
  </div>
);

export default TictactoePlayer;
