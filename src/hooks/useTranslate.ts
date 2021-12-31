import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import commonLocalization from 'src/localization';
import {
  Localization,
  LocalizationValue,
  LocalizationValuePlural,
  Translate,
} from 'src/types/translate';

function localize(key: string, localization: Localization, count?: number): string | null {
  let result: LocalizationValue | null = localization;

  key.split('.').forEach((subKey) => {
    if (result && result[subKey as keyof LocalizationValue]) {
      result = result[subKey as keyof LocalizationValue];
    } else {
      result = null;
    }
  });

  if (result && count !== undefined) {
    const plural = result as LocalizationValuePlural;
    const isPlural = plural.zero && plural.one && plural.few && plural.many;
    if ((isPlural && count === undefined) || (!isPlural && count !== undefined)) return null;
    switch (count) {
      case 0:
        result = plural.zero;
        break;
      case 1:
        result = plural.one;
        break;
      case 2:
      case 3:
      case 4:
        result = plural.few;
        break;
      default:
        result = plural.many;
        break;
    }
  }

  if (typeof result !== 'string') return null;
  return result;
}

function getStringWithReplacements(
  value: string,
  replacements: Record<string, string | ReactNode>,
): string | ReactNode {
  function getReplacementKey(key: string) {
    return `%{${key}}`;
  }

  const stringReplacements: Record<string, string> = {};
  const nodeReplacements: Record<string, ReactNode> = {};
  Object.keys(replacements).forEach((key) => {
    if (typeof replacements[key] === 'string') {
      stringReplacements[key] = replacements[key] as string;
    } else {
      nodeReplacements[key] = replacements[key];
    }
  });

  /* Text replacements */
  let textResult: string = value;
  Object.keys(stringReplacements).forEach((key) => {
    textResult = textResult.replace(getReplacementKey(key), stringReplacements[key]);
  });
  if (Object.values(nodeReplacements).length === 0) return textResult;

  /* Node replacements */
  let nodeResult: string[] | ReactNode[] = [textResult];
  Object.keys(nodeReplacements).forEach((key) => {
    nodeResult = nodeResult
      .map((part: string | ReactNode) => {
        if (typeof part !== 'string') return part;
        const k = getReplacementKey(key);
        if (!part.includes(k)) return part;
        const split = part.split(k);
        return [split[0], nodeReplacements[key], split[1]].filter(Boolean);
      })
      .flat();
  });

  return nodeResult as ReactNode;
}

export default function useTranslate(componentLocalization?: Localization): Translate {
  const { locale } = useRouter();

  return (
    id: string,
    replacements = {},
    count?: number,
    fallback = undefined,
    localeForced = undefined,
  ) => {
    const usedFallback = typeof fallback === 'string' ? fallback : id;
    const usedLocale = localeForced || locale || 'en';
    const usedLocalization: Localization = {
      _common: commonLocalization[usedLocale as keyof LocalizationValue],
      ...(componentLocalization ? componentLocalization[usedLocale] : {}),
    };

    /* Localize */
    let translation: string | null = localize(id, usedLocalization, count);
    if (!translation && id.split('.')[0] === 'common')
      translation = localize(id.replace(/^(common)/, '_common'), usedLocalization, count);

    /* Fallback */
    if (translation === null) {
      if (fallback === '') return '';
      // eslint-disable-next-line no-console
      console.warn(`Translate: ${id} empty for ${usedLocale}.`);
      return usedFallback;
    }

    /* Replacements */
    const result = getStringWithReplacements(translation, {
      ...replacements,
      count: count !== undefined ? count.toString() : '',
    });

    return result;
  };
}
