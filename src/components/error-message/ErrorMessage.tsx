import React, { FC } from 'react';
import { Replacements, Translate } from 'src/types/translate';
import { getHumanErrorMessage } from 'src/helpers/error';

const ErrorMessage: FC<{
  className?: string;
  count?: number;
  fallback?: string;
  localeForced?: string;
  error: unknown;
  replacements?: Replacements;
  translate: Translate;
}> = (props) => {
  const message = getHumanErrorMessage(
    props.error,
    props.translate,
    props.replacements,
    props.count,
    props.fallback,
    props.localeForced,
  );

  return <div className={props.className || 'bg-red-500'}>{message}</div>;
};

export default ErrorMessage;
