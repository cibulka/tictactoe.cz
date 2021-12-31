import React, { FC } from 'react';

import ConsentBar from 'src/components/consent-bar/ConsentBar';
import useTranslate from 'src/hooks/useTranslate';
import { IconTicTacToe } from 'src/icons';
import { useDispatch } from 'src/redux';
import { setPrivacyPreferences } from 'src/redux/preferences';

import localization from './Privacy.localization';

const PrivacyPopup: FC = () => {
  const dispatch = useDispatch();
  const translate = useTranslate(localization);

  return (
    <ConsentBar
      action={{
        label: translate('prompt.yes'),
        onClick: () => {
          dispatch(
            setPrivacyPreferences({
              isGoogleAnalytics: true,
              isLocalStorage: true,
            }),
          );
        },
      }}
      buttonGradient="rainbow"
      icon={<IconTicTacToe className="text-red-500" />}
      screen={{
        href: '/privacy',
        label: translate('prompt.no'),
      }}
      title={translate('title')}
      text={translate('info')}
    />
  );
};

export default PrivacyPopup;
