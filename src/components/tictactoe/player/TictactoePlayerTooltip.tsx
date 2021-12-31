import React, { FC, ReactNode } from 'react';
import Skeleton from '@mui/material/Skeleton';

import UserPic from 'src/components/user-pic/UserPic';
import { IconFace, IconRobot } from 'src/icons';

const TictactoePlayerTooltip: FC<{
  isLoading: boolean;
  isRobot: boolean;
  nickname?: string | ReactNode;
  photo?: string | null;
}> = (props) => (
  <div className="flex items-center">
    <div
      className={[
        'relative rounded-full overflow-hidden',
        'flex items-center justify-center',
        'mr-2',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {props.photo ? (
        <UserPic isLoading={Boolean(props.isLoading)} src={props.photo} />
      ) : props.isRobot ? (
        <div className="w-2/3 h-2/3">
          <IconRobot />
        </div>
      ) : (
        <div className="w-2/3 h-2/3">
          <IconFace />
        </div>
      )}
    </div>
    <div className="flex-1 relative">
      {props.nickname ? (
        <strong className="block truncate w-32">{props.nickname}</strong>
      ) : (
        <Skeleton variant="text" className="w-full w-20" />
      )}
    </div>
  </div>
);

export default TictactoePlayerTooltip;
