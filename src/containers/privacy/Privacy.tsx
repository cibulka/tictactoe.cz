import React, { FC } from 'react';
import Skeleton from '@mui/material/Skeleton';

import Layout from 'src/components/layout/Layout';
import useTranslate from 'src/hooks/useTranslate';
import { IconCog, IconPrivacy, IconTicTacToe, IconUser } from 'src/icons';
import { useSelector } from 'src/redux';

import PrivacyForm from './components/PrivacyForm';
import localization from './Privacy.localization';

const Privacy: FC = () => {
  const translate = useTranslate(localization);

  const isLocalStorageInited = useSelector((state) => state.app.isLocalStorageInited);

  return (
    <Layout
      isOverflow={isLocalStorageInited}
      isPrivacyPage
      pageTitle={translate('pageTitle') as string}
    >
      <div className="m-auto tic-surface-light p-4 max-w-md mt-4 mb-4">
        <header className="flex items-center mb-8">
          <div className="tic-icon-xl mr-3 text-error">
            <IconTicTacToe />
          </div>
          <div>
            <h2 className="tic-h2">{translate('title')}</h2>
            <div className="text-xxs flex items-center">
              <h1>{translate('subtitle')}</h1>
              <span className="w-4 h-4 ml-1">
                <IconPrivacy />
              </span>
            </div>
          </div>
        </header>
        <p className="max-w-md text-lg mt-4 mb-8">{translate('info')}</p>
        <section>
          <article className="mb-8 pb-4 border-b tic-border">
            <h2 className="flex items-center tic-h2 mb-4">
              <span className="tic-icon-big mr-2">
                <IconUser />
              </span>
              {translate('googleLogin.title')}
            </h2>
            <p className="text-sm mb-3">{translate('googleLogin.why')}</p>
            <p className="text-sm mb-3">{translate('googleLogin.what')}</p>
            <p className="text-sm mb-3">{translate('googleLogin.note')}</p>
          </article>
          <article className="mb-8">
            <h2 className="tic-h2 flex items-center mb-4">
              <span className="tic-icon-big mr-2">
                <IconCog />
              </span>
              {translate('formTitle')}
            </h2>
            {isLocalStorageInited ? (
              <>
                <PrivacyForm translate={translate} />
              </>
            ) : (
              <>
                <Skeleton variant="text" className="w-2/3" />
                <Skeleton variant="text" className="w-1/2" />
                <Skeleton variant="text" className="w-3/4" />
              </>
            )}
          </article>
        </section>
      </div>
    </Layout>
  );
};

export default Privacy;
