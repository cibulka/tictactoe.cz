import React, { FC, ReactNode, useEffect } from 'react';
import { FieldError } from 'react-hook-form';

import Spinner from 'src/components/spinner/Spinner';
import { IconCheck, IconError } from 'src/icons';
import inputStyles from 'src/styles/inputText.module.css';
import { InputTextValidation, InputNumberValidation } from 'src/types/form';
import { Translate } from 'src/types/translate';

import FormFieldErrorMessage from './FormFieldErrorMessage';

const FormFieldText: FC<{
  className?: string;
  fieldError: FieldError | null;
  isValid: boolean;
  loading?: string | ReactNode;
  label: string | ReactNode;
  onBlur: () => void;
  onChange: () => void;
  onChanged?: (value: string) => void;
  rules?: InputTextValidation | InputNumberValidation;
  success?: string | ReactNode;
  failure?: string | ReactNode;
  translate: Translate;
  value: string;
}> = (props) => {
  const isShownStatusText =
    props.value && Boolean(props.loading || props.failure || props.success || props.fieldError);

  const { isValid, value, onChanged } = props;
  useEffect(() => {
    if (isValid && value && onChanged) onChanged(value);
  }, [isValid, value, onChanged]);

  return (
    <>
      <label className={['block mb-2', props.className].filter(Boolean).join(' ')}>
        <strong className="flex tic-h3 mb-2">
          {props.rules?.required && <span className="text-red-500 mr-1">*</span>}
          {props.label}
        </strong>
        <input
          className={['tic-surface-dark', inputStyles.inputText].join(' ')}
          type="text"
          value={props.value}
          onBlur={props.onBlur}
          onChange={props.onChange}
        />
      </label>
      {isShownStatusText && (
        <div
          className={[
            'flex items-center mt-4 text-xs',
            Boolean(props.failure || props.fieldError) && 'text-error',
            props.success && 'text-success',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="flex tic-icon-md mr-2 flex-wrap-0">
            {props.failure || props.fieldError ? (
              <IconError className="text-error" />
            ) : props.success ? (
              <IconCheck className="text-success" />
            ) : (
              <Spinner className="tic-icon-md" />
            )}
          </span>
          {props.rules && props.fieldError ? (
            <FormFieldErrorMessage
              error={props.fieldError}
              rules={props.rules}
              translate={props.translate}
            />
          ) : props.failure ? (
            <span>{props.failure}</span>
          ) : props.success ? (
            <span>{props.success}</span>
          ) : props.loading ? (
            <span>{props.loading}</span>
          ) : (
            ''
          )}
        </div>
      )}
    </>
  );
};

export default FormFieldText;
