import React, { FC } from 'react';
import Link from 'next/link';

import DateRelative from 'src/components/date-relative/DateRelative';
import { IconArrow, IconClock } from 'src/icons';
import { MatchWaiting } from 'src/types/tictactoe/multiplayer';
import UserPic from 'src/components/user-pic/UserPic';

const TicTacToeMultiplayerMatchesAvailableMatch: FC<{
  match: MatchWaiting;
}> = (props) => (
  <Link href={`/tic-tac-toe/multiplayer/${props.match.id}`}>
    <a className="flex items-center py-2 border-t tic-border">
      <span className="relative rounded-full overflow-hidden tic-icon-xl mr-4">
        <UserPic src={props.match.playersPhotos[0]} isLoading={false} />
      </span>
      <span className="flex-1 mr-4">
        <span className="block tic-h2">{props.match.playersNicknames[0]}</span>
        <span className="flex items-center text-xs font-mono mt-0.5">
          <span className="w-4 h-4 mr-1">
            <IconClock />
          </span>
          <DateRelative date={new Date(props.match.created)} />
        </span>
      </span>
      <IconArrow className="tic-icon-md transform rotate-90" />
    </a>
  </Link>
);

export default TicTacToeMultiplayerMatchesAvailableMatch;
