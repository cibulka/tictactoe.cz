import React, { FC, useState } from 'react';
import { useSnackbar } from 'notistack';

import { Controller, useForm } from 'react-hook-form';

import Button from 'src/components/button/Button';
import FormFieldText from 'src/components/form/FormFieldText';
import config from 'src/config';
import { useDispatch } from 'src/redux';
import { setNickname, setUserState } from 'src/redux/app';
import { ErrorHandler } from 'src/types/error';
import { STATE_FAILURE, STATE_IDLE, STATE_LOADING, STATE_SUCCESS } from 'src/types/common';
import { Translate } from 'src/types/translate';

import getNewUserData from '../helpers/getNewUserData';
import useNicknameCheck from '../hooks/useNicknameCheck';

const { MAX_LENGTH_NICKNAME, MIN_LENGTH_NICKNAME } = config;

const UserGateNicknameForm: FC<{
  onError: ErrorHandler;
  onSuccess?: () => void;
  translate: Translate;
  userId: string;
}> = (props) => {
  const [formSubmitState, setFormSubmitState] = useState(STATE_IDLE);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { control, formState, handleSubmit } = useForm({
    defaultValues: {
      nickname: '',
    },
    mode: 'onChange',
  });

  const nicknameRules = {
    pattern: /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
    required: true,
    maxLength: MAX_LENGTH_NICKNAME,
    minLength: MIN_LENGTH_NICKNAME,
  };

  const { onNicknameCheck, nicknameState } = useNicknameCheck(props.onError);

  return (
    <>
      <div className="text-xl mb-6">{props.translate('nickname.info')}</div>
      <form
        onSubmit={handleSubmit(({ nickname }) => {
          setFormSubmitState(STATE_LOADING);
          getNewUserData(props.userId, nickname)
            .then(() => {
              setFormSubmitState(STATE_SUCCESS);
              dispatch(setNickname(nickname));
              dispatch(setUserState(STATE_SUCCESS));
              enqueueSnackbar(props.translate('nickname.success'), {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
              });
              if (props.onSuccess) props.onSuccess();
            })
            .catch((err: unknown) => {
              props.onError(err);
              setFormSubmitState(STATE_FAILURE);
            });
        })}
      >
        <div className="mb-6">
          <Controller
            name="nickname"
            control={control}
            render={({ field, fieldState }) => (
              <FormFieldText
                fieldError={fieldState.isDirty ? fieldState.error || null : null}
                label={props.translate('nickname.form.nickname.label')}
                onBlur={field.onBlur}
                onChange={field.onChange}
                onChanged={onNicknameCheck}
                rules={nicknameRules}
                failure={
                  nicknameState === STATE_FAILURE
                    ? props.translate('nickname.form.nickname.state.occupied')
                    : undefined
                }
                isValid={Boolean(!fieldState.invalid && fieldState.isDirty)}
                loading={
                  nicknameState === STATE_LOADING
                    ? props.translate('nickname.form.nickname.state.loading')
                    : undefined
                }
                success={
                  nicknameState === STATE_SUCCESS
                    ? props.translate('nickname.form.nickname.state.free')
                    : undefined
                }
                translate={props.translate}
                value={field.value}
              />
            )}
            rules={nicknameRules}
          />
        </div>
        <Button
          disabled={Boolean(!formState.isValid || nicknameState !== STATE_SUCCESS)}
          isLoading={formSubmitState === STATE_LOADING}
          type="submit"
          variant="primary"
          gradient="button"
        >
          {props.translate('nickname.form.submit')}
        </Button>
      </form>
    </>
  );
};

export default UserGateNicknameForm;
