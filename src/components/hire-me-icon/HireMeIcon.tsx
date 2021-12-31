import React, { FC } from 'react';

import { IconWork } from 'src/icons';

const HireMeIcon: FC<{ className: string }> = (props) => (
  <span className={[props.className, 'relative flex'].join(' ')}>
    <IconWork className="text-success relative z-10" />
    <span
      className="flex items-center justify-center bg-red-500 absolute z-10 rounded-full"
      style={{ top: '1.5em', right: '0.009em', width: '0.4em', height: '0.4em' }}
    >
      <span
        className="bg-red-500 absolute rounded-full animate-ping"
        style={{ width: '150%', height: '150%', top: '-25%', left: '-25%' }}
      />
    </span>
  </span>
);

export default HireMeIcon;
