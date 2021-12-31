import React, { FC } from 'react';
import Link from 'next/link';

import Button from 'src/components/button/Button';
import { IconFrown } from 'src/icons';
import { Translate } from 'src/types/translate';

const TetrisBoardSwipableApology: FC<{ translate: Translate }> = (props) => (
  <div className="hidden touch:flex absolute mdMax:tic-menuFixed hSmMax:tic-menuFixed z-50 inset-0 tic-surface-light">
    <div className="flex flex-col items-center m-auto">
      <div className="w-20 h-20 text-white">
        <IconFrown />
      </div>
      <p className="p-4 text-center text-lg">{props.translate('swipable.apology')}</p>
      <Link href="/">
        <a className="flex">
          <Button component="span" gradient="rainbow" className="font-bold" variant="primary">
            {props.translate('swipable.action')}
          </Button>
        </a>
      </Link>
    </div>
  </div>
);

export default TetrisBoardSwipableApology;
