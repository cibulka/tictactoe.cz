import { useCallback, useEffect, useRef, useState } from 'react';
import { collection, getDocs, query, where } from '@firebase/firestore';

import { db } from 'src/firebase';
import {
  STATE_FAILURE,
  STATE_IDLE,
  STATE_LOADING,
  STATE_SUCCESS,
  State,
  Timeout,
} from 'src/types/common';
import { ErrorHandler } from 'src/types/error';

type Result = {
  onNicknameCheck: (nickname: string) => void;
  nicknameState: State;
};

export default function useNicknameCheck(onError: ErrorHandler): Result {
  const [nicknameState, setNicknameState] = useState<State>(STATE_IDLE);

  const checkTimeout = useRef<Timeout>();
  const onNicknameCheck = useCallback(
    (nickname: string) => {
      setNicknameState(STATE_LOADING);
      if (checkTimeout.current) {
        clearTimeout(checkTimeout.current);
      }
      checkTimeout.current = setTimeout(() => {
        try {
          const q = query(collection(db, 'userdata'), where('nickname', '==', nickname));
          getDocs(q).then((snap) => {
            if (snap.size === 0) {
              setNicknameState(STATE_SUCCESS);
            } else {
              setNicknameState(STATE_FAILURE);
            }
          });
        } catch (err) {
          onError(err);
        }
      }, 500);
    },
    [onError],
  );

  useEffect(
    () => () => {
      if (checkTimeout.current) {
        clearTimeout(checkTimeout.current);
      }
    },
    [],
  );

  return { nicknameState, onNicknameCheck };
}
