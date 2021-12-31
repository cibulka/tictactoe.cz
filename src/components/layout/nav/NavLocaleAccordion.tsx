import React, { FC, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import useLocaleContext from 'src/hooks/useLocaleContext';
import { IconCheck, IconChevronDown, IconGlobe } from 'src/icons';
import { Translate } from 'src/types/translate';

const NavLocaleAccordion: FC<{ translate: Translate }> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const ctx = useLocaleContext();
  return ctx ? (
    <>
      <button
        className={[
          'flex items-center w-full',
          'p-2',
          isOpen ? 'tic-surface-dark' : 'tic-surface-light',
        ].join(' ')}
        style={{ transition: 'background' }}
        type="button"
        onClick={() => setIsOpen((old) => !old)}
      >
        <span className="dark:text-gray-300 text-gray-600 tic-icon-md mr-3">
          <IconGlobe />
        </span>
        <span className="underline flex-1 mr-3">{props.translate(`locales.${ctx.locale}`)}</span>
        <span className="w-4 h-4">
          <IconChevronDown />
        </span>
      </button>
      <motion.ul
        className="overflow-hidden text-xs"
        initial={{ height: 0 }}
        animate={isOpen ? { height: 'auto' } : undefined}
      >
        {ctx.locales.map((locale) => (
          <li key={locale}>
            {ctx.locale === locale ? (
              <button type="button" disabled className="flex w-full justify-between p-2 font-bold">
                <span className="mr-4">
                  {props.translate(`locales.${locale}`, undefined, undefined, locale, locale)}
                </span>
                <span className="text-success w-4 h-4 ml-3">
                  <IconCheck />
                </span>
              </button>
            ) : (
              <Link href={{ pathname: ctx.pathname, query: ctx.query }} locale={locale}>
                <a className="w-full block p-2">
                  {props.translate(`locales.${locale}`, undefined, undefined, locale, locale)}
                </a>
              </Link>
            )}
          </li>
        ))}
      </motion.ul>
    </>
  ) : null;
};

export default NavLocaleAccordion;
