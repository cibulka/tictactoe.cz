import React, { FC } from 'react';
import { useSnackbar } from 'notistack';

import { handleSignin } from 'src/firebase';
import { IconGoogleColor } from 'src/icons';
import { useDispatch } from 'src/redux';
import { setUserState } from 'src/redux/app';
import { STATE_LOADING } from 'src/types/common';
import { ErrorHandler } from 'src/types/error';
import { Translate } from 'src/types/translate';

const UserGateLoginButtons: FC<{ onError: ErrorHandler; translate: Translate }> = (props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <p className="text-lg mb-4">{props.translate('loginButtons.info')}</p>
      <button
        type="button"
        onClick={() => {
          dispatch(setUserState(STATE_LOADING));
          handleSignin({
            onError: props.onError,
            onSuccess: () => {
              enqueueSnackbar(props.translate('loginSuccess'), {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
              });
            },
          });
        }}
      >
        <span className="rounded flex items-center overflow-hidden bg-white text-black">
          <div className="flex items-center justify-center w-8 h-8 border-r border-gray-300">
            <span className="w-6 h-6">
              <IconGoogleColor />
            </span>
          </div>
          <span className="text-xs font-bold py-2 px-2">
            {props.translate('loginButtons.google')}
          </span>
        </span>
      </button>
    </>
  );
};

export default UserGateLoginButtons;
