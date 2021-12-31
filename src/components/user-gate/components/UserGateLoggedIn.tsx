import React, { FC } from 'react';

import { IconCheck } from 'src/icons';
import { Translate } from 'src/types/translate';

const UserGateLoggedIn: FC<{ translate: Translate }> = (props) => (
  <div className="bg-success text-gray-900 py-1 px-2">
    <span className="flex items-center">
      <span className="tic-icon-md mr-3">
        <IconCheck />
      </span>
      {props.translate('loginSuccess')}
    </span>
  </div>
);

export default UserGateLoggedIn;
