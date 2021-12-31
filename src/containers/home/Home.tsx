import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';

import Button from 'src/components/button/Button';
import ButtonViewGame from 'src/components/button-view-game/ButtonViewGame';
import HireMeDate from 'src/components/hire-me-date/HireMeDate';
import Layout from 'src/components/layout/Layout';
import UserPic from 'src/components/user-pic/UserPic';
import { useAuth } from 'src/firebase';
import useGamesList from 'src/hooks/useGamesList';
import useTranslate from 'src/hooks/useTranslate';
import { IconArrow, IconHeart, IconWork } from 'src/icons';
import { GameName } from 'src/types/app';
import { STATE_LOADING } from 'src/types/common';
import { useSelector } from 'src/redux';

import localization from './Home.localization';

const Home: FC = () => {
  const [auth, isAuthLoading] = useAuth();

  const gamesList = useGamesList();
  const translate = useTranslate(localization);

  const isUserLoading = useSelector((state) => state.app.userState === STATE_LOADING);
  const nickname = useSelector((state) => state.app.nickname);

  return (
    <Layout isOverflow>
      <section className="md:grid grid-cols-4/3 gap-12 m-auto w-full max-w-xs md:max-w-xl p-2">
        <article className="mdMax:mb-12">
          <h2 className="tic-h3 mb-4">{translate('games.title')}</h2>
          <ul>
            {Object.keys(gamesList).map((key) => {
              const gameName = key as GameName;
              const game = gamesList[gameName];
              return (
                <li key={gameName} className="mb-8">
                  <Link href={game.href}>
                    <a>
                      <Button gradient="button" className="w-full text-gray-800" variant="primary">
                        <ButtonViewGame gameName={gameName} />
                      </Button>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </article>
        <div className="mdMax:mb-12">
          <article className="border-b-2 border-dashed pb-4 md:mb-8 mb-12">
            <Link href="/user">
              <a className="block">
                <h2 className="tic-h3 mb-4">{translate('user.title')}</h2>
                <div className="flex items-center">
                  <div className="flex-1">
                    {isAuthLoading || isUserLoading ? (
                      <>
                        <Skeleton variant="text" className="w-full" height="1.33em" />
                        <Skeleton variant="text" className="w-1/3" height="1em" />
                      </>
                    ) : auth && nickname ? (
                      <>
                        <h3 className="capitalize">{nickname}</h3>
                        <div className="flex items-center mt-2 text-xxs text-blue-500">
                          <span className="underline">{translate('user.profile')}</span>
                          <span className="w-4 h-4 ml-1 transform rotate-90">
                            <IconArrow />
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex-1 mr-2">
                          <div>{translate('user.text')}</div>
                          <div className="flex items-center mt-2 text-xxs text-blue-500">
                            <span className="underline">{translate('user.link')}</span>
                            <span className="w-4 h-4 ml-1 transform rotate-90">
                              <IconArrow />
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    className={[
                      'flex items-center justify-center relative',
                      'w-12 h-12 ml-2',
                      'rounded-full overflow-hidden',
                      'bg-white-600 dark:bg-black-400',
                    ].join(' ')}
                  >
                    <UserPic
                      src={auth && nickname ? auth.photoURL : null}
                      isLoading={isAuthLoading}
                    />
                  </div>
                </div>
              </a>
            </Link>
          </article>
          <article className="border-b-2 border-dashed pb-6 md:mb-8 mb-12">
            <Link href="/readme">
              <a className="block">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 text-red-500">
                    <IconHeart />
                  </div>
                  <h2 className="tic-h3 ml-2">{translate('author.title')}</h2>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 mr-2">
                    <div>{translate('author.text')}</div>
                    <div className="flex items-center mt-2 text-xxs text-blue-500">
                      <span className="underline">{translate('author.link')}</span>
                      <span className="w-4 h-4 ml-1 transform rotate-90">
                        <IconArrow />
                      </span>
                    </div>
                  </div>
                  <div
                    className={[
                      'w-16 h-16',
                      'relative rounded-full overflow-hidden',
                      'bg-white-600 dark:bg-black-400',
                    ].join(' ')}
                  >
                    <Image src="/petr.jpg" alt="" layout="fill" />
                  </div>
                </div>
              </a>
            </Link>
          </article>
          <Link href="/readme">
            <a className="flex items-center">
              <div className="animate-bounce w-8 h-8">
                <IconWork />
              </div>
              <div className="ml-2">
                <div>{translate('common.actions.hireMe')}</div>
                <div className="text-blue-500 underline text-xxs mt-1">
                  <HireMeDate />
                </div>
              </div>
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
