import React, { ElementType, FC, MouseEvent, ReactNode, useEffect, useState } from 'react';
import { ParsedUrlQuery } from 'querystring';

import Grow from '@mui/material/Grow';
import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { PopoverOrigin } from '@mui/material';

import MenuItemButton from './MenuItemButton';
import MenuItemLink from './MenuItemLink';

const Menu: FC<{
  anchorOrigin?: PopoverOrigin;
  children?: ReactNode;
  className?: string;
  component?: ElementType<any>;
  disabled?: boolean;
  hrefs?: (string | null | { pathname: string; query: ParsedUrlQuery })[];
  onClicks?: (() => void | null)[];
  items: ReactNode[];
  locales?: string[];
  transformOrigin?: PopoverOrigin;
}> = (props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  const Component = props.component || 'button';

  useEffect(() => {
    if (activeIndex !== null) setMenuAnchorEl(null);
  }, [activeIndex]);

  return (
    <>
      <Component
        className={props.className}
        type={props.component === 'button' ? 'button' : undefined}
        onClick={(e: MouseEvent<HTMLElement, MouseEvent>) => {
          if (!props.disabled) setMenuAnchorEl(e.currentTarget);
        }}
      >
        {props.children}
      </Component>
      <MuiMenu
        anchorOrigin={props.anchorOrigin}
        transformOrigin={props.transformOrigin}
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
        keepMounted
        MenuListProps={{
          disablePadding: true,
          tabIndex: -1,
        }}
        sx={{ padding: 0 }}
        TransitionComponent={Grow}
      >
        {props.items.map((item, i) => {
          const href = props.hrefs ? props.hrefs[i] : null;
          const onClick = props.onClicks ? props.onClicks[i] : undefined;
          return (
            <MuiMenuItem
              component="li"
              disabled={!href && !onClick}
              key={i}
              onClick={() => setActiveIndex(i)}
            >
              {href ? (
                <MenuItemLink
                  className="flex w-full"
                  href={href}
                  isActive={i === activeIndex}
                  locale={props.locales ? props.locales[i] : undefined}
                >
                  {item}
                </MenuItemLink>
              ) : (
                <MenuItemButton
                  className="flex w-full"
                  onClick={onClick}
                  isActive={i === activeIndex}
                >
                  {item}
                </MenuItemButton>
              )}
            </MuiMenuItem>
          );
        })}
      </MuiMenu>
    </>
  );
};

export default Menu;
