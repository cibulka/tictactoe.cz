import React, { FC, ReactNode } from 'react';

import styles from './Spinner.module.css';

const Spinner: FC<{
  className?: string;
  title?: string | ReactNode;
}> = (props) => (
  <>
    <span className={[styles.spinner, props.className || 'tic-icon-big'].join(' ')} />
    {props.title && <strong className="tic-h2 mt-8">{props.title}</strong>}
  </>
);

export default Spinner;
