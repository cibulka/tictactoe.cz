import React, { FC } from 'react';

import { IconEye, IconEyeCrossed } from 'src/icons';

const GameMenuHide: FC<{ isHidden: boolean; toggle: () => void }> = (props) => (
  <button
    type="button"
    className={[
      'relative tic-icon-md',
      '_hideButton',
      'transform origin-top-right transition-transform',
      props.isHidden && 'is-shown',
      !props.isHidden ? 'scale-100' : 'scale-200',
    ]
      .filter(Boolean)
      .join(' ')}
    onClick={() => props.toggle()}
  >
    {props.isHidden ? <IconEyeCrossed /> : <IconEye />}
  </button>
);

export default GameMenuHide;
