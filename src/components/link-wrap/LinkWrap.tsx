import React, { FC, ReactNode } from 'react';
import Link from 'next/link';

const LinkWrap: FC<{
  attrs?: any;
  children: ReactNode;
  className?: string;
  href?: string;
}> = (props) => {
  return props.href ? (
    <Link href={props.href}>
      <a className={props.className} {...props.attrs}>
        {props.children}
      </a>
    </Link>
  ) : (
    <span className={props.className} {...props.attrs}>
      {props.children}
    </span>
  );
};

export default LinkWrap;
