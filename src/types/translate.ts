import { ReactNode } from 'react';

export type Replacements = Record<string, string | ReactNode>;

export type Translate = (
  key: string,
  replacements?: Replacements,
  count?: number,
  fallback?: string,
  localeForced?: string,
) => string | ReactNode;

export type LocalizationValuePlural = {
  zero: string;
  one: string;
  few: string;
  many: string;
};

export type LocalizationValue =
  | string
  | {
      [key: string]: LocalizationValue;
    }
  | LocalizationValuePlural;

export type Localization = {
  [locale: string]: {
    [key: string]: LocalizationValue;
  };
};

// TODO: Try to use Typescript as optional checker for component localizations
// @link https://stackoverflow.com/questions/47057649/typescript-string-dot-notation-of-nested-object

export type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

export type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? `${F}${D}${Join<Extract<R, string[]>, D>}`
    : never
  : string;
