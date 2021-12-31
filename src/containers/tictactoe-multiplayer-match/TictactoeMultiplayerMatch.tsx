import React, { FC } from 'react';
import Link from 'next/link';

import Button from 'src/components/button/Button';
import { IconFrown } from 'src/icons';
import Layout from 'src/components/layout/Layout';
import useTranslate from 'src/hooks/useTranslate';

import localization from './TictactoeMultiplayerMatch.localization';

const TictactoeMultiplayerMatch: FC = () => {
  const translate = useTranslate(localization);
  return (
    <Layout gameName="tictactoeMultiplayer" pageTitle="Multiplayer">
      <div className="m-auto">
        <div className="flex flex-col items-center m-auto">
          <div className="w-20 h-20 text-white">
            <IconFrown />
          </div>
          <p className="p-4 text-center text-lg">{translate('notDone.apology')}</p>
          <Link href="/">
            <a className="flex">
              <Button component="span" gradient="rainbow" className="font-bold" variant="primary">
                {translate('notDone.action')}
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default TictactoeMultiplayerMatch;
