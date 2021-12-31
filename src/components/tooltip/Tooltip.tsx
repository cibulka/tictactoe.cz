import React, { FC, ReactNode } from 'react';
import MuiTooltip from '@mui/material/Tooltip';

import { IconQuestionMark } from 'src/icons';

const Tooltip: FC<{
  arrow?: boolean;
  children?: ReactNode;
  className?: string;
  classNameTooltip?: string;
  placement?: 'auto' | 'top-end' | 'top-start' | 'bottom-end' | 'bottom-start';
  title: ReactNode | string;
}> = (props) => (
  <MuiTooltip
    arrow={props.arrow}
    className={props.className}
    PopperProps={{
      placement: props.placement || 'auto',
    }}
    title={<div className={props.classNameTooltip}>{props.title}</div>}
  >
    {props.children ? (
      <div className="cursor-help">{props.children}</div>
    ) : (
      <div className="cursor-help w-4 h-4">
        <IconQuestionMark />
      </div>
    )}
  </MuiTooltip>
);

export default Tooltip;
