import { FC, useEffect } from 'react';
import { doc, onSnapshot } from '@firebase/firestore';

import { db, useAuth } from 'src/firebase';
import { createReduxError } from 'src/helpers/error';
import { useDispatch } from 'src/redux';
import { setNickname, setUserData, setUserError, setUserState } from 'src/redux/app';
import { STATE_FAILURE, STATE_LOADING, STATE_SUCCESS } from 'src/types/common';
import { UserData } from 'src/types/user';

const UserDataObserver: FC = () => {
  const [auth] = useAuth();
  const dispatch = useDispatch();

  const userId = auth ? auth.uid : null;
  useEffect(() => {
    let unsub;

    function onError(err: unknown) {
      dispatch(setUserState(STATE_FAILURE));
      dispatch(setUserError(createReduxError(err)));
    }

    if (userId) {
      dispatch(setUserState(STATE_LOADING));
      unsub = onSnapshot(
        doc(db, 'userdata', userId),
        (doc) => {
          if (doc.metadata.hasPendingWrites) return;
          const data = doc.data();
          const dataValid = data && data.nickname ? (data as UserData) : undefined;
          if (dataValid) {
            dispatch(setNickname(dataValid.nickname));
            dispatch(setUserData(dataValid));
            dispatch(setUserState(STATE_SUCCESS));
          }
        },
        onError,
      );
    }

    return unsub;
  }, [dispatch, userId]);

  return null;
};

export default UserDataObserver;
