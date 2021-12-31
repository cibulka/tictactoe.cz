import { FC, useCallback, useEffect } from 'react';
import { collection, limit, onSnapshot, orderBy, query, where } from '@firebase/firestore';

import { db } from 'src/firebase';
import { createReduxError } from 'src/helpers/error';
import { useDispatch } from 'src/redux';
import { setMatches, setError } from 'src/redux/tictactoe-multiplayer';
import { Match, MATCH_STATE_FINISHED } from 'src/types/tictactoe/multiplayer';

const ObserverTicTacToeMultiplayer: FC<{ userId: string }> = (props) => {
  const dispatch = useDispatch();

  const onError = useCallback(
    (err: unknown) => {
      dispatch(setError(createReduxError(err)));
    },
    [dispatch],
  );

  const { userId } = props;
  useEffect(() => {
    const q = query(
      collection(db, 'tictactoe'),
      where('players', 'array-contains', userId),
      where('state', '!=', MATCH_STATE_FINISHED),
      orderBy('state', 'desc'),
      orderBy('updated', 'desc'),
      limit(5),
    );

    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const result: Match[] = [];
        querySnapshot.forEach((snap) => {
          const match = snap.data();
          if (match.id) result.push(match as Match);
        }, onError);
        dispatch(setMatches(result));
      },
      onError,
    );

    return unsub;
  }, [dispatch, onError, userId]);

  return null;
};

export default ObserverTicTacToeMultiplayer;
