import { FC, useEffect } from 'react';
import { collection, limit, onSnapshot, orderBy, query, where } from '@firebase/firestore';

import { db } from 'src/firebase';
import { ErrorHandler } from 'src/types/error';
import { MatchWaiting, MATCH_STATE_WAITING } from 'src/types/tictactoe/multiplayer';

const TicTacToeMultiplayerMatchesAvailableObserver: FC<{
  onError: ErrorHandler;
  onSuccess: (match: MatchWaiting[]) => void;
  userId: string;
}> = (props) => {
  const { onError, onSuccess, userId } = props;
  useEffect(() => {
    const q = query(
      collection(db, 'tictactoe'),
      where('state', '==', MATCH_STATE_WAITING),
      where('challenger', '!=', userId),
      orderBy('challenger', 'desc'),
      orderBy('created', 'desc'),
      limit(5),
    );

    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const result: MatchWaiting[] = [];
        querySnapshot.forEach((snap) => {
          const data = snap.data();
          result.push({ ...data, id: data.id } as MatchWaiting);
        }, onError);
        onSuccess(result);
      },
      onError,
    );

    return unsub;
  }, [onError, onSuccess, userId]);

  return null;
};

export default TicTacToeMultiplayerMatchesAvailableObserver;
