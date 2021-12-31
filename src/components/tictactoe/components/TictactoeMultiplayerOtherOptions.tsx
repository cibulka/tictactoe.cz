import React, { FC } from 'react';
import Link from 'next/link';

import HireMeIcon from 'src/components/hire-me-icon/HireMeIcon';
import IconCarousel from 'src/components/icon-carousel/IconCarousel';
import { IconArrow, IconRobot, IconSnake, IconTetris } from 'src/icons';
import useTranslate from 'src/hooks/useTranslate';

import localization from './TictactoeMultiplayerOtherOptions.localization';

const TictactoeMultiplayerOtherOptions: FC = () => {
  const translate = useTranslate(localization);
  return (
    <ul>
      <li>
        <Link href="/tic-tac-toe/singleplayer">
          <a className="flex items-center py-2 border-t tic-border">
            <span className="tic-icon-xl mr-4 text-red-500">
              <IconRobot />
            </span>
            <span className="flex-1 mr-4">
              <span className="block tic-h2">{translate('robot.title')}</span>
              <span className="block text-xs font-mono mt-0.5">{translate('robot.subtitle')}</span>
            </span>
            <IconArrow className="tic-icon-md transform rotate-90" />
          </a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a className="flex items-center py-2 border-t tic-border">
            <div className="tic-icon-xl flex overflow-hidden mr-4">
              <IconCarousel
                className="tic-icon-big m-auto"
                icons={[
                  <IconSnake className="text-green-600" key="snake" />,
                  <IconTetris className="text-yellow-500" key="tetris" />,
                ]}
              />
            </div>
            <span className="flex-1 mr-4">
              <span className="block tic-h2">{translate('otherGames.title')}</span>
            </span>
            <IconArrow className="tic-icon-md transform rotate-90" />
          </a>
        </Link>
      </li>
      <li>
        <Link href="/readme">
          <a className="flex items-center py-2 border-t tic-border">
            <div className="tic-icon-xl flex mr-4">
              <HireMeIcon className="tic-icon-big m-auto" />
            </div>
            <span className="flex-1 mr-4">
              <span className="block tic-h2">{translate('hireMe.title')}</span>
            </span>
            <IconArrow className="tic-icon-md transform rotate-90" />
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default TictactoeMultiplayerOtherOptions;
