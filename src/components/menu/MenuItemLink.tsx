import React, { FC, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

const MenuItemButton: FC<{
  className?: string;
  href: string | { pathname: string; query: ParsedUrlQuery };
  isActive: boolean;
  locale?: string;
}> = (props) => {
  const LinkRef = useRef<HTMLAnchorElement>(null);

  const { isActive } = props;
  useEffect(() => {
    if (LinkRef.current && isActive) LinkRef.current.click();
  }, [isActive]);

  return (
    <Link href={props.href} locale={props.locale}>
      <a className={props.className} ref={LinkRef}>
        {props.children}
      </a>
    </Link>
  );
};

export default MenuItemButton;
