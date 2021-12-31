import React, { FC } from 'react';

import ConsentBar from 'src/components/consent-bar/ConsentBar';
import { IconTetris } from 'src/icons';
import { useDispatch } from 'src/redux';
import { setIsConsent } from 'src/redux/tetris';
import { Translate } from 'src/types/translate';

const TetrisConsent: FC<{ translate: Translate }> = (props) => {
  const dispatch = useDispatch();

  return (
    <ConsentBar
      action={{
        onClick: () => dispatch(setIsConsent(true)),
        label: props.translate('consent.submit'),
      }}
      buttonGradient="blue"
      icon={<IconTetris className="text-yellow-500" />}
      title={props.translate('consent.title')}
      text={props.translate('consent.info')}
    />
  );
};

export default TetrisConsent;
