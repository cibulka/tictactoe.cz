import React, { FC } from 'react';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';

import ErrorMessage from 'src/components/error-message/ErrorMessage';
import UserPic from 'src/components/user-pic/UserPic';
import { useAuth } from 'src/firebase';
import { createReduxError } from 'src/helpers/error';
import useTranslate from 'src/hooks/useTranslate';
import { IconPrivacy, IconUser } from 'src/icons';
import { useDispatch, useSelector } from 'src/redux';
import { setUserError } from 'src/redux/app';
import { STATE_IDLE, STATE_LOADING } from 'src/types/common';
import { TICERROR_USERDATAMISSING } from 'src/types/error';

import UserGateLoggedIn from './components/UserGateLoggedIn';
import UserGateLoginButtons from './components/UserGateLoginButtons';
import UserGateNicknameForm from './components/UserGateNicknameForm';
import localization from './UserGate.localization';

const UserGate: FC<{
  LoggedInView?: FC<{
    userId: string;
    nickname: string;
    photo: string | null;
  }>;
}> = (props) => {
  const [auth, isAuthLoading] = useAuth();
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.app.nickname);
  const userError = useSelector((state) => state.app.userError);
  const userState = useSelector((state) => state.app.userState);

  const isErrorUserDataMissing = userError?.errorCode === TICERROR_USERDATAMISSING;
  const isErrorUnhandled = userError && !isErrorUserDataMissing;
  const isLoading = isAuthLoading || userState === STATE_LOADING;

  const translate = useTranslate(localization);

  const onError = (error: unknown) => {
    dispatch(setUserError(createReduxError(error)));
  };

  const LoggedInView = props.LoggedInView || UserGateLoggedIn;

  return (
    <div className="flex flex-col m-auto w-full max-w-xs relative p-2 tic-surface-light md:p-4">
      {isErrorUnhandled && (
        <ErrorMessage
          className="text-xs font-mono bg-red-500 p-1 mb-4"
          translate={translate}
          error={userError}
        />
      )}

      <div className="flex items-center mb-6">
        <div className="flex justify-center items-center tic-surface-dark tic-icon-xxl rounded-full overflow-hidden relative">
          {Boolean(auth || isAuthLoading) ? (
            <UserPic src={auth?.photoURL || null} isLoading={isAuthLoading} />
          ) : (
            <IconUser className="w-2/3 h-2/3" />
          )}
        </div>
        {nickname ? (
          <h1 className="tic-h1 ml-3">{nickname}</h1>
        ) : isAuthLoading ? (
          <div className="flex-1 ml-3">
            <Skeleton variant="text" className="w-2/3" />
            <Skeleton variant="text" className="w-1/2" />
          </div>
        ) : (
          <h1 className="tic-h1 ml-3">{translate('title')}</h1>
        )}
      </div>

      <div className="m-auto w-full max-w-sm mb-8">
        {auth && nickname ? (
          <LoggedInView
            userId={auth.uid}
            nickname={nickname}
            photo={auth.photoURL}
            translate={translate}
          />
        ) : auth && !nickname && !isLoading ? (
          <UserGateNicknameForm onError={onError} translate={translate} userId={auth.uid} />
        ) : !auth && !isLoading ? (
          <UserGateLoginButtons onError={onError} translate={translate} />
        ) : (
          <>
            <Skeleton variant="text" className="w-2/3 mb-2 py-1" />
            <Skeleton variant="text" className="w-1/2 mb-2" />
          </>
        )}
      </div>

      <div className="m-auto w-full max-w-sm px-2 flex justify-center text-xs border-t border-gray-500 dark:border-black-400 py-4 w-full">
        <div className="flex">
          <span className="flex-shrink-0 w-4 h-4 mr-3">
            <IconPrivacy />
          </span>
          <div>
            {translate('privacy.text', {
              link: (
                <Link href="/privacy" key="link">
                  <a className="inline-block underline">{translate('privacy.link')}</a>
                </Link>
              ),
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGate;
