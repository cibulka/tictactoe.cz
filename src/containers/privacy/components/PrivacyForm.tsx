import React, { FC, useState } from 'react';
import { useSnackbar } from 'notistack';
import Switch from '@mui/material/Switch';
import { useForm, Controller } from 'react-hook-form';

import Button from 'src/components/button/Button';
import { useDispatch, useSelector } from 'src/redux';
import { setPrivacyPreferences } from 'src/redux/preferences';
import { Translate } from 'src/types/translate';
import { useRouter } from 'next/router';

const Privacy: FC<{ translate: Translate }> = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const privacyPreferences = useSelector((state) => state.preferences.privacyPreferences);
  const defaultValues = {
    isLocalStorage: privacyPreferences ? privacyPreferences.isLocalStorage : true,
    isGoogleAnalytics: privacyPreferences ? privacyPreferences.isGoogleAnalytics : true,
  };

  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues,
  });

  return (
    <form
      className="relative"
      onSubmit={handleSubmit((values) => {
        setIsSubmitting(true);
        setTimeout(() => {
          dispatch(setPrivacyPreferences(values));
          enqueueSnackbar(props.translate('notification.success'), {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          });
          router.push('/');
        }, 1000);
      })}
    >
      <div className="mb-4">
        <label className="flex items-center mb-4">
          <h3 className="tic-h3 flex-1 mr-4">{props.translate('localStorage.title')}</h3>
          <Controller
            name="isLocalStorage"
            control={control}
            render={({ field }) => {
              return <Switch checked={field.value} className="-mr-2" color="success" {...field} />;
            }}
          />
        </label>
        <p className="text-xs">{props.translate('localStorage.info')}</p>
      </div>
      <div className="pb-4 mb-12 border-b tic-border">
        <label className="flex items-center mb-4">
          <h3 className="tic-h3 flex-1 mr-4">{props.translate('googleAnalytics.title')}</h3>
          <Controller
            name="isGoogleAnalytics"
            control={control}
            render={({ field }) => {
              return <Switch checked={field.value} className="-mr-2" color="success" {...field} />;
            }}
          />
        </label>
        <p className="text-xs">{props.translate('googleAnalytics.info')}</p>
      </div>
      <div className="sticky bottom-12">
        <Button
          gradient="main"
          className="font-bold"
          isLoading={isSubmitting}
          type="submit"
          variant="primary"
        >
          {props.translate('submit')}
        </Button>
      </div>
    </form>
  );
};

export default Privacy;
