import React, { FC } from 'react';
import Link from 'next/link';

import Button from 'src/components/button/Button';
import ButtonLogout from 'src/components/button-logout/ButtonLogout';
import { Translate } from 'src/types/translate';

const UserScores: FC<{
  translate: Translate;
}> = (props) => (
  <>
    <div className="text-xl mb-8">{props.translate('scoresToDo.info')}</div>
    <div className="flex items-center">
      <Link href="/">
        <a className="flex mr-8">
          <Button variant="primary" gradient="blue" className="font-bold" component="span">
            {props.translate('scoresToDo.action')}
          </Button>
        </a>
      </Link>
      <ButtonLogout />
    </div>
  </>
);

export default UserScores;
