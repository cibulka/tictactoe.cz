import React, { FC, ReactNode } from 'react';
import Link from 'next/link';

import Button from 'src/components/button/Button';

const ConsentBar: FC<{
  action: {
    onClick: () => void;
    label: string | ReactNode;
  };
  buttonGradient?: 'rainbow' | 'button' | 'blue';
  icon: ReactNode;
  screen?: {
    href: string;
    label: string | ReactNode;
  };
  title: string | ReactNode;
  text: string | ReactNode;
}> = (props) => (
  <div className="p-4">
    <div className="max-w-xl m-auto flex smMax:flex-col">
      <div className="flex-1 sm:mr-8 smMax:mb-4">
        <div className="mb-2 flex items-center smMax:justify-center">
          <span className="tic-icon-big mr-3">{props.icon}</span>
          <h1 className="sm:text-xl font-bold">{props.title}</h1>
        </div>
        <p className="text-xs smMax:text-center smMax:py-2">{props.text}</p>
      </div>
      <div className="flex flex-col items-center">
        <Button
          className="font-bold text-white sm:text-xl"
          variant="primary"
          gradient={props.buttonGradient}
          type="button"
          onClick={props.action.onClick}
        >
          {props.action.label}
        </Button>
        {props.screen && (
          <Link href={props.screen.href}>
            <a className="block mt-4 text-xs">
              <Button variant="secondary" type="button">
                {props.screen.label}
              </Button>
            </a>
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default ConsentBar;
