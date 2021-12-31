import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import Button from 'src/components/button/Button';
import { handleLogout } from 'src/firebase';
import { createReduxError } from 'src/helpers/error';
import useTranslate from 'src/hooks/useTranslate';
import { IconLogout } from 'src/icons';
import { useDispatch } from 'src/redux';
import { clearNickname, setUserError } from 'src/redux/app';

import localization from './ButtonLogout.localization';

const ButtonLogout: FC<{ className?: string; redirect?: string }> = (props) => {
  const dispatch = useDispatch();
  const translate = useTranslate(localization);
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const onError = (error: unknown) => {
    dispatch(setUserError(createReduxError(error)));
  };

  return (
    <Button
      variant="secondary"
      className={['text-xs', props.className].join(' ')}
      iconLeft={<IconLogout />}
      onClick={() => {
        dispatch(clearNickname());
        enqueueSnackbar(translate('success'), {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
        handleLogout({
          onError,
          onSuccess: props.redirect ? () => router.push('/') : undefined,
        });
      }}
      type="button"
    >
      {translate('action')}
    </Button>
  );
};

export default ButtonLogout;
