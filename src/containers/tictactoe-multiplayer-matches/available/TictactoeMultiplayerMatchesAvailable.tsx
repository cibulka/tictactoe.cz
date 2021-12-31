import React, { FC, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

import { ErrorHandler } from 'src/types/error';
import { Translate } from 'src/types/translate';
import { MatchWaiting } from 'src/types/tictactoe/multiplayer';

import TicTacToeMultiplayerMatchesAvailableMatch from './TicTacToeMultiplayerMatchesAvailableMatch';
import TicTacToeMultiplayerMatchesAvailableObserver from './TicTacToeMultiplayerMatchesAvailableObserver';

const TictactoeMultiplayerMatchesAvailable: FC<{
  onError: ErrorHandler;
  translate: Translate;
  userId?: string;
}> = (props) => {
  const [matches, setMatches] = useState<null | MatchWaiting[]>(null);

  return !matches || matches.length > 0 ? (
    <>
      {props.userId && (
        <TicTacToeMultiplayerMatchesAvailableObserver
          onError={props.onError}
          onSuccess={setMatches}
          userId={props.userId}
        />
      )}
      <article className="mb-8 border-b tic-border">
        <h2 className="tic-h3 mb-4">{props.translate('availableMatches.title')}</h2>
        {!matches ? (
          <>
            <Skeleton variant="text" className="w-2/3" />
            <Skeleton variant="text" className="w-1/2" />
          </>
        ) : (
          <ul>
            {matches.map((match) => (
              <li key={match.id}>
                <TicTacToeMultiplayerMatchesAvailableMatch match={match} />
              </li>
            ))}
          </ul>
        )}
      </article>
    </>
  ) : null;
};

export default TictactoeMultiplayerMatchesAvailable;
