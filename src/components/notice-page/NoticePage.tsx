import React, { FC, ReactNode } from 'react';
import Link from 'next/link';

import Button from 'src/components/button/Button';
import ContactLink from 'src/components/contact-link/ContactLink';
import config from 'src/config';
import { IconArrow, IconEmail } from 'src/icons';
import { Translate } from 'src/types/translate';

const { EMAIL } = config;

const NoticePage: FC<{
  action?: {
    href: string;
    label: string | ReactNode;
  };
  icon?: ReactNode;
  text?: string | ReactNode;
  textContact?: string | ReactNode;
  title: string | ReactNode;
  translate: Translate;
}> = (props) => {
  return (
    <div className="m-auto">
      <header className="flex flex-col items-center mb-8">
        {props.icon && <div className="tic-icon-xxl mb-2">{props.icon}</div>}
        <h1 className="tic-h1">{props.translate('title')}</h1>
        <h2 className="tic-h2">{props.translate('subtitle')}</h2>
      </header>

      {props.text && <div className="max-w-md text-xl ta-center mb-8">{props.text}</div>}

      {props.action && (
        <div className="flex justify-center mb-8">
          <Link href={props.action.href}>
            <a>
              <Button
                component="span"
                className="font-bold text-lg p-4"
                gradient="blue"
                icon={<IconArrow className="transform rotate-90 scale-150" />}
                variant="primary"
              >
                {props.action.label}
              </Button>
            </a>
          </Link>
        </div>
      )}

      {props.textContact && (
        <div className="flex flex-col items-center">
          <div className="text-sm mb-4">{props.textContact}</div>
          <div className="flex items-center justify-center">
            <span className="w-4 h-4 mr-3">
              <IconEmail />
            </span>
            <ContactLink type="email" value={EMAIL} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticePage;
