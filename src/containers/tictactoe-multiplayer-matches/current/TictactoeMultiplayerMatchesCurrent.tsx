import React, { FC } from 'react';

import { useSelector } from 'src/redux';
import {
  MatchOngoing,
  MatchWaiting,
  MATCH_STATE_ONGOING,
  MATCH_STATE_WAITING,
} from 'src/types/tictactoe/multiplayer';
import { Translate } from 'src/types/translate';

import TictactoeMultiplayerMatchesMatchOngoing from './TictactoeMultiplayerMatchesMatchOngoing';
import TictactoeMultiplayerMatchesMatchWaiting from './TictactoeMultiplayerMatchesMatchWaiting';

const TictactoeMultiplayerMatchesCurrent: FC<{
  nickname: string;
  translate: Translate;
  userId: string;
  userPhoto: string | null;
}> = (props) => {
  const matches = useSelector((state) => state.tictactoeMultiplayer.matches);

  return matches && Object.values(matches).length > 0 ? (
    <ul>
      {Object.keys(matches).map((matchId) => {
        const match = matches[matchId];

        switch (match.state) {
          case MATCH_STATE_ONGOING:
            return (
              <li key={matchId}>
                <TictactoeMultiplayerMatchesMatchOngoing
                  match={match as MatchOngoing}
                  translate={props.translate}
                />
              </li>
            );
          case MATCH_STATE_WAITING:
            return (
              <li key={matchId}>
                <TictactoeMultiplayerMatchesMatchWaiting
                  match={match as MatchWaiting}
                  translate={props.translate}
                />
              </li>
            );
          default:
            throw new Error(`Match has ${match.state}.`);
        }
      })}
    </ul>
  ) : null;
};

export default TictactoeMultiplayerMatchesCurrent;
