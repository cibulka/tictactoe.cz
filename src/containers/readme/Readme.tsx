import React, { FC } from 'react';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';

import ContactLink from 'src/components/contact-link/ContactLink';
import HireMeDate from 'src/components/hire-me-date/HireMeDate';
import Layout from 'src/components/layout/Layout';
import useTranslate from 'src/hooks/useTranslate';

import localization from './Readme.localization';
import styles from './Readme.module.css';
import { IconCheck, IconEmail } from 'src/icons';

const Readme: FC<{ source: any }> = (props) => {
  const translate = useTranslate(localization);

  return (
    <Layout isOverflow pageTitle="README">
      <>
        <article
          className={[
            'flex order-2',
            'm-auto max-w-2xl px-2',
            'md:grid grid-cols-3/4 gap-12',
            'flex mdMax:items-center mdMax:flex-col',
          ].join(' ')}
        >
          <div className="relative z-10 bg-gray-100 dark:bg-gray-900 flex flex-col order-2 pt-8">
            <header className="mb-8">
              <h2 className="font-bold text-4xl">{translate('subtitle')}</h2>
              <h1 className="tic-h3 mt-2">{translate('title')}</h1>
            </header>
            <div className={styles.formatWrap}>
              <MDXRemote {...props.source} />
            </div>
          </div>
          <div />
        </article>
        <aside className={['flex order-1', 'md:fixed md:top-0 md:h-screen', 'w-full'].join(' ')}>
          <div
            className={[
              'md:grid md:grid-cols-3/4 md:gap-12',
              'w-full max-w-2xl ml-auto mr-auto px-2',
            ].join(' ')}
          >
            <div className="flex h-full flex-col items-center">
              <div className="flex-1" />
              <div className="relative w-2/3 rounded-full bg-stone-300 dark:bg-gray-800 overflow-hidden ml-auto mr-auto mb-4">
                <div className="aspect-w-1 aspect-h-1" />
                <Image src="/petr-alt.jpg" layout="fill" alt="" />
              </div>
              <header className="flex flex-col items-center mb-4">
                <h2 className="text-4xl font-bold">Petr Cibulka</h2>
                <p className="text-sm">{translate('tagline')}</p>
              </header>
              <div className="flex items-center justify-center mb-4">
                <span className="w-4 h-4 mr-3">
                  <IconEmail />
                </span>
                <ContactLink value="cibulka.me@gmail.com" type="email" />
              </div>
              <div className="flex items-center justify-center text-xs text-success font-bold">
                <span className="w-4 h-4 mr-1">
                  <IconCheck />
                </span>
                <HireMeDate />
              </div>
              <div className="flex-1" />
              <div className="flex-1" />
            </div>
            <div />
          </div>
        </aside>
      </>
    </Layout>
  );
};

export default Readme;
