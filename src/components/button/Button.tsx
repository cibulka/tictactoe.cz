import React, { FC, ReactNode } from 'react';

import Spinner from 'src/components/spinner/Spinner';
import { IconArrow } from 'src/icons';

import styles from './Button.module.css';

/** This is used primarily for visual consistency */
const Button: FC<{
  children?: ReactNode;
  className?: string;
  component?: React.ElementType<any>;
  disabled?: boolean;
  gradient?: 'rainbow' | 'blue' | 'button';
  icon?: ReactNode;
  iconLeft?: ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant: 'primary' | 'ghost' | 'secondary';
}> = (props) => {
  const El = props.component || 'button';

  return (
    <El
      className={[
        props.className,
        props.variant === 'primary' && 'tic-buttonPrimary',
        props.variant === 'primary' && styles.primary,
        props.variant === 'ghost' && styles.ghost,
        props.variant === 'secondary' && styles.secondary,
        props.gradient === 'rainbow' && styles['primary-bgRainbow'],
        props.gradient === 'button' && styles['primary-bgButton'],
        props.gradient === 'blue' && styles['primary-bgBlue'],
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={El === 'button' ? props.disabled : undefined}
      type={El === 'button' ? props.type || 'button' : undefined}
      onClick={props.onClick}
    >
      <span className="flex items-center w-full">
        {props.iconLeft && <span className="w-4 h-4 mr-2">{props.iconLeft}</span>}
        {props.isLoading && <Spinner className="w-4 h-4 mr-3" />}
        {props.children}
        {props.icon && <span className="w-4 h-4 ml-3">{props.icon}</span>}
      </span>
    </El>
  );
};

export default Button;
