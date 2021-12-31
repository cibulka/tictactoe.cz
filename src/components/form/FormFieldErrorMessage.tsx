import React, { FC } from 'react';
import { FieldError } from 'react-hook-form';

import { InputNumberValidation, InputTextValidation } from 'src/types/form';
import { Translate } from 'src/types/translate';

const FormFieldErrorMessage: FC<{
  error: FieldError;
  translate: Translate;
  rules: InputTextValidation | InputNumberValidation;
  value?: string;
}> = (props) => {
  const { maxLength, minLength } = props.rules as InputTextValidation;
  const { max, min } = props.rules as InputNumberValidation;

  const replacements: Record<string, string> = {};
  if (max !== undefined) replacements.max = max.toString();
  if (maxLength !== undefined) replacements.maxLength = maxLength.toString();
  if (min !== undefined) replacements.min = min.toString();
  if (minLength !== undefined) replacements.minLength = minLength.toString();
  if (props.value) replacements.value = props.value;

  if (props.error.type === 'required') {
    return <span>{props.translate('common.errorsForm.required')}</span>;
  }
  if (props.error.type === 'max') {
    return <span>{props.translate('common.errorsForm.max', replacements, max)}</span>;
  }
  if (props.error.type === 'min') {
    return <span>{props.translate('common.errorsForm.min', replacements, min)}</span>;
  }
  if (props.error.type === 'maxLength') {
    return <span>{props.translate('common.errorsForm.maxLength', replacements, maxLength)}</span>;
  }
  if (props.error.type === 'minLength') {
    return <span>{props.translate('common.errorsForm.minLength', replacements, minLength)}</span>;
  }
  if (props.error.type === 'pattern') {
    return <span>{props.translate('common.errorsForm.pattern')}</span>;
  }
  return null;
};

export default FormFieldErrorMessage;
