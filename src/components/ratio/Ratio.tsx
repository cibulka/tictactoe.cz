import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';

import Spinner from 'src/components/spinner/Spinner';
import { Timeout } from 'src/types/common';

const MIN_DELTA_ONCHANGE_WIDTH = 20;

function getDims(
  containerWidth: number,
  containerHeight: number,
  cols: number,
  rows: number,
): [number, number] {
  let width: number;
  let height: number;

  const isContainerLandscape = containerWidth > containerHeight;

  if (isContainerLandscape) {
    height = containerHeight;
    width = containerHeight * (cols / rows);
    if (width > containerWidth) {
      width = containerWidth;
      height = containerWidth * (rows / cols);
    }
  } else {
    width = containerWidth;
    height = containerWidth * (rows / cols);
    if (height > containerHeight) {
      height = containerHeight;
      width = containerHeight * (cols / rows);
    }
  }

  return [width, height];
}

const Ratio: FC<{
  children: ReactNode;
  classNameContent?: string;
  onChangeWidth?: React.Dispatch<React.SetStateAction<number | undefined>>;
  onResize?: () => void;
  x: number;
  y: number;
  title?: string;
}> = (props) => {
  const [isResizing, setIsResizing] = useState(false);
  const [dims, setDims] = useState<[number, number] | null>(null);

  const RatioRef = useRef<HTMLDivElement>(null);

  const { onChangeWidth, onResize, x, y } = props;
  useEffect(() => {
    let timeout: Timeout;

    function handler() {
      if (!RatioRef.current) return;
      const box = RatioRef.current.getBoundingClientRect();
      const newDims = getDims(box.width, box.height, x, y);
      setDims(newDims);
      if (onChangeWidth) {
        onChangeWidth((old: number | undefined) => {
          if (!old) return newDims[0];
          const delta = Math.abs(old - newDims[0]);
          return delta >= MIN_DELTA_ONCHANGE_WIDTH ? newDims[0] : old;
        });
      }
    }

    function debounceHandler() {
      clearTimeout(timeout);
      setIsResizing(true);
      if (onResize) onResize();
      timeout = setTimeout(() => {
        handler();
        setIsResizing(false);
      }, 300);
    }

    if (window) {
      handler();
      window.addEventListener('resize', debounceHandler);
    }
    return () => {
      window.removeEventListener('resize', debounceHandler);
    };
  }, [onChangeWidth, onResize, x, y]);

  return (
    <div className="flex items-center justify-center absolute inset-0" ref={RatioRef}>
      {isResizing || !dims ? (
        <div className="flex flex-col items-center m-auto">
          <Spinner />
        </div>
      ) : (
        <div
          className={['flex relative overflow-hidden', props.classNameContent]
            .filter(Boolean)
            .join(' ')}
          style={{ width: dims[0], height: dims[1] }}
        >
          {props.children}
        </div>
      )}
    </div>
  );
};

export default Ratio;
