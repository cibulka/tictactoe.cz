import React, { FC, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Skeleton from '@mui/material/Skeleton';

import ButtonLogout from 'src/components/button-logout/ButtonLogout';
import ErrorMessage from 'src/components/error-message/ErrorMessage';
import Layout from 'src/components/layout/Layout';
import TictactoeMultiplayerOtherOptions from 'src/components/tictactoe/components/TictactoeMultiplayerOtherOptions';
import UserGate from 'src/components/user-gate/UserGate';
import UserPic from 'src/components/user-pic/UserPic';
import { useAuth } from 'src/firebase';
import { createReduxError } from 'src/helpers/error';
import useTranslate from 'src/hooks/useTranslate';
import { useDispatch, useSelector } from 'src/redux';
import { setError } from 'src/redux/tictactoe-multiplayer';
import { Timeout } from 'src/types/common';
import { FIRESTORE_RESOURCEEXHAUSTED } from 'src/types/error';

import TictactoeMultiplayerMatchesAvailable from './available/TictactoeMultiplayerMatchesAvailable';
import TictactoeMultiplayerMatchesCreateNew from './current/TictactoeMultiplayerMatchesCreateNew';
import TictactoeMultiplayerMatchesCurrent from './current/TictactoeMultiplayerMatchesCurrent';
import localization from './TictactoeMultiplayerMatches.localization';

const TictactoeMultiplayer: FC = () => {
  const [auth, isAuthLoading] = useAuth();
  const dispatch = useDispatch();
  const translate = useTranslate(localization);

  const onError = (error: unknown) => {
    dispatch(setError(createReduxError(error)));
  };

  const nickname = useSelector((state) => state.app.nickname);
  const isLoading = !auth || isAuthLoading || !nickname;

  const userError = useSelector((state) => state.app.userError);
  const tictactoeMultiplayerError = useSelector((state) => state.tictactoeMultiplayer.error);
  const error = userError || tictactoeMultiplayerError;
  const isFirestoreExhausted = error && error.errorCode === FIRESTORE_RESOURCEEXHAUSTED;

  const [isLoggedInAnimationDone, setIsLoggedInAnimationDone] = useState(Boolean(auth && nickname));

  const animationTimeout = useRef<Timeout>();
  useEffect(() => {
    if (nickname) {
      animationTimeout.current = setTimeout(() => setIsLoggedInAnimationDone(true), 1000);
    }
    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
    };
  }, [nickname]);

  return (
    <Layout gameName="tictactoeMultiplayer" isOverflow pageTitle="Multiplayer">
      <motion.div
        className={[
          'md:fixed md:top-0 md:w-1/2 md:h-full md:mb-0',
          'flex flex-col items-center justify-center',
          'pt-4',
        ].join(' ')}
        initial={{ opacity: 0.3 }}
        animate={isLoggedInAnimationDone ? { opacity: 1 } : undefined}
      >
        <div className="md:flex-1" />
        {error && (
          <ErrorMessage
            className={['bg-error font-mono text-xs', 'max-w-md overflow-auto', 'p-2 mb-4'].join(
              ' ',
            )}
            error={error}
            translate={translate}
          />
        )}
        <div className="relative rounded-full overflow-hidden tic-icon-xxl mb-4">
          <UserPic isLoading={isLoading || !isLoggedInAnimationDone} src={auth?.photoURL || null} />
        </div>
        {isLoggedInAnimationDone && nickname ? (
          <>
            <strong className="tic-h1">{nickname}</strong>
            <ButtonLogout className="mt-4" redirect="/" />
          </>
        ) : (
          <Skeleton className="w-32" variant="text" />
        )}
        <div className="md:flex-1" />
        <div className="md:flex-1" />
      </motion.div>

      <motion.div
        className="flex flex-1 w-full p-8"
        initial={{ opacity: 0.3 }}
        animate={isLoggedInAnimationDone ? { opacity: 1 } : undefined}
      >
        <div className="mdMax:hidden flex-1" />
        <div className="relative z-10 flex flex-1">
          <div className="m-auto">
            <section className="m-auto py-4">
              <article className="mb-8">
                <h2 className="tic-h3 mb-4">{translate('currentMatches.title')}</h2>
                {!isLoggedInAnimationDone || !auth || !nickname ? (
                  <>
                    <Skeleton variant="text" className="w-2/3" />
                    <Skeleton variant="text" className="w-1/2" />
                  </>
                ) : (
                  <div className="border-b tic-border">
                    <TictactoeMultiplayerMatchesCurrent
                      nickname={nickname}
                      translate={translate}
                      userId={auth.uid}
                      userPhoto={auth.photoURL || null}
                    />
                    <TictactoeMultiplayerMatchesCreateNew
                      nickname={nickname}
                      onError={onError}
                      userId={auth.uid}
                      userPhoto={auth.photoURL || null}
                    />
                  </div>
                )}
              </article>

              <TictactoeMultiplayerMatchesAvailable
                onError={onError}
                translate={translate}
                userId={auth ? auth.uid : undefined}
              />

              <article>
                <h2 className="tic-h3 mb-4">{translate('otherOptions.title')}</h2>
                {!isLoggedInAnimationDone || !auth || !nickname ? (
                  <>
                    <Skeleton variant="text" className="w-2/3" />
                    <Skeleton variant="text" className="w-1/2" />
                  </>
                ) : (
                  <div className="border-b tic-border">
                    <TictactoeMultiplayerOtherOptions />
                  </div>
                )}
              </article>
            </section>
          </div>
        </div>
      </motion.div>

      <div className="fixed inset-0 flex mdMax:hidden">
        <div className="flex-1 border-r tic-border" />
        <div className="flex-1" />
      </div>
      {isFirestoreExhausted ? (
        <motion.div initial={{ y: '-100%' }} animate={{ y: 0 }}>
          exhausted
        </motion.div>
      ) : (
        <motion.div
          className="absolute z-20 inset-0 flex"
          initial={{ y: isLoggedInAnimationDone ? '-100%' : 0 }}
          animate={isLoggedInAnimationDone ? { y: '-100%' } : undefined}
          transition={{ duration: 0.5 }}
        >
          <UserGate />
        </motion.div>
      )}
    </Layout>
  );
};

export default TictactoeMultiplayer;
