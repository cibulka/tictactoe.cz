import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useTranslate from 'src/hooks/useTranslate';

import localization from './LocaleSelect.localization';

const LocaleSelect: FC<{
  children: ReactNode;
  className?: string;
  spinner: ReactNode;
}> = (props) => {
  const translate = useTranslate(localization);

  const { locale, locales, isReady, query, pathname } = useRouter();
  const otherLocales = locales ? locales.filter((l) => l !== locale) : undefined;

  if (!isReady) return <>{props.spinner}</>;

  if (!locale || !otherLocales || otherLocales.length === 0) return null;

  if (otherLocales.length === 1) {
    return (
      <Link href={pathname} locale={otherLocales[0]}>
        <a className={props.className}>{props.children}</a>
      </Link>
    );
  }

  return <div>hi</div>;
};

export default LocaleSelect;
