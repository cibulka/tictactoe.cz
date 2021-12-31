import React, { FC, ReactNode, useEffect, useState } from 'react';
import Grow from '@mui/material/Grow';
import MuiPopover from '@mui/material/Popover';
import { PopoverOrigin } from '@mui/material';

const Popover: FC<{
  anchorOrigin?: PopoverOrigin;
  className?: string;
  content: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  keepMounted?: boolean;
  onToggle?: (isOpen: boolean) => void;
  transformOrigin?: PopoverOrigin;
}> = (props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { onToggle } = props;
  const isOpen = Boolean(menuAnchorEl);
  useEffect(() => {
    if (onToggle) onToggle(isOpen);
  }, [onToggle, isOpen]);

  return (
    <>
      <button
        aria-haspopup="true"
        aria-expanded={menuAnchorEl ? 'true' : undefined}
        className={[props.className, 'flex items-center', 'py-2'].filter(Boolean).join(' ')}
        disabled={props.disabled}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        type="button"
      >
        {props.children}
      </button>
      <MuiPopover
        anchorEl={menuAnchorEl}
        anchorOrigin={props.anchorOrigin}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
        keepMounted={props.keepMounted}
        sx={{ padding: 0 }}
        transformOrigin={props.transformOrigin}
        TransitionComponent={Grow}
      >
        {props.content}
      </MuiPopover>
    </>
  );
};

export default Popover;
