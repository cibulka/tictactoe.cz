import { ReactNode } from 'react';
import axios, { AxiosError } from 'axios';
import { FirebaseError } from 'firebase/app';
import {
  AppError,
  ReduxError,
  ErrorDetails,
  TICERROR_UNKNOWN,
  ReduxThunkError,
} from 'src/types/error';
import { Replacements, Translate } from 'src/types/translate';

// Type guards
// ================================================================================================

export function isAppError(error: unknown): error is AppError {
  const appError = error as AppError;
  return Boolean(appError && appError.errorCode && appError.message !== undefined);
}

export function isFirebaseError(error: unknown): error is FirebaseError {
  const firebaseError = error as FirebaseError;
  return Boolean(firebaseError && firebaseError.code !== undefined);
}

export function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

// Error properties
// ================================================================================================

export function getErrorCode(error: unknown): string {
  if (isAppError(error)) return error.errorCode;
  if (isFirebaseError(error)) return error.code;

  const axiosResponse = isAxiosError(error) ? error.response : undefined;
  if (axiosResponse) return axiosResponse.data.errorCode;

  if (error instanceof Error) return error.message;

  return TICERROR_UNKNOWN;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  const anyError = error as any;
  if (anyError.toString && typeof anyError === 'function') return anyError.toString();
  try {
    return JSON.stringify(error);
  } catch (e) {
    const message = 'Unknown & Unserializable error message';
    // eslint-disable-next-line no-console
    console.error(e, message);
    return message;
  }
}

export function getErrorStatus(error: unknown): number | null {
  const axiosResponse = isAxiosError(error) ? error.response : undefined;
  if (axiosResponse) return axiosResponse.status;

  const status = (error as any).status;
  return status && typeof status === 'number' ? status : null;
}

export function getDetails(error: unknown): ErrorDetails | null {
  const axiosResponse = isAxiosError(error) ? error.response : undefined;
  if (axiosResponse) return axiosResponse.data;

  const details = error ? (error as any).details : undefined;
  if (!details) return null;

  const result: ErrorDetails = {};
  Object.keys(details).forEach((key) => {
    result[key] = details[key].toString();
  });
  return result;
}

// Error properties
// ================================================================================================

export function createReduxError(error: unknown): ReduxError {
  return {
    errorCode: getErrorCode(error),
    status: getErrorStatus(error),
    message: getErrorMessage(error),
    details: getDetails(error),
  };
}

export function createReduxThunkError(error: unknown, typePrefix: string): ReduxThunkError {
  const reduxError = createReduxError(error);
  return { ...reduxError, typePrefix };
}

export function createAppError(
  errorCode: string,
  message = '',
  status: number | null = null,
  details = {},
): AppError {
  const result = new Error(message || errorCode || '') as AppError;
  result.errorCode = errorCode;
  result.status = status;
  result.message = message;
  result.details = details;
  return result;
}

export function getHumanErrorMessage(
  error: unknown,
  translate: Translate,
  replacements?: Replacements,
  count?: number,
  fallback?: string,
  localeForced?: string,
): string | ReactNode {
  const errorCode = getErrorCode(error);
  const errorMessage = error ? (error as Error).message : undefined;

  /* eslint-disable no-console */
  if (process.env.NEXT_PUBLIC_ERROR_REPORTING === '1') {
    if (isAppError(error)) {
      console.error(`error/${error.errorCode}`, error.details);
    } else if (isFirebaseError(error)) {
      console.error(`error/${error.code}`, error.message);
    } else {
      console.error(error);
    }
  }
  /* eslint-enable no-console */

  if (errorCode)
    return translate(
      `common.error.${errorCode}`,
      replacements,
      count,
      fallback || errorMessage || errorCode,
      localeForced,
    );
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return translate('common.error.unknownCode');
}
