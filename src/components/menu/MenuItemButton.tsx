import React, { FC, useEffect, useRef } from 'react';
import MuiMenuItem from '@mui/material/MenuItem';

const MenuItemButton: FC<{
  className?: string;
  isActive: boolean;
  onClick?: () => void;
}> = (props) => {
  const Button = useRef<HTMLButtonElement>(null);

  const { isActive } = props;
  useEffect(() => {
    if (isActive && Button.current) Button.current.click();
  }, [isActive]);

  return (
    <button
      className={props.className}
      disabled={!props.onClick}
      type="button"
      ref={Button}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default MenuItemButton;
