import React, { FC } from 'react';
import { Skeleton } from '@mui/material';
import styled from '@emotion/styled';

import { useSelector } from 'src/redux';
import { Css } from 'src/types/app';

import { getBlockIndexesForPreview } from '../helpers/getBlockIndexes';

const TetrisInfoNextShape: FC<{
  boardWidth?: number;
  className: string;
  css: Css;
  cssShape?: Css;
  shapeWidth?: number;
}> = (props) => {
  const Side = styled.div(props.css);
  const Shape = styled.div(props.cssShape);

  const blockTypeNext = useSelector((state) => state.tetris.blockTypeNext);
  const rotateNext = useSelector((state) => state.tetris.rotateNext);
  const blockIndexes = getBlockIndexesForPreview(blockTypeNext, rotateNext);

  return (
    <Side className={props.className}>
      {props.cssShape ? (
        <Shape>
          {[...Array(8)].map((_cell, i) => {
            const blockShown = blockIndexes.includes(i) ? blockTypeNext : undefined;

            return (
              <span key={i} className="block relative">
                <span
                  className={[
                    'block aspect-w-1 aspect-h-1',
                    blockShown === 'I' && 'bg-red-500',
                    blockShown === 'J' && 'bg-orange-500',
                    blockShown === 'L' && 'bg-teal-500',
                    blockShown === 'O' && 'bg-sky-500',
                    blockShown === 'S' && 'bg-violet-500',
                    blockShown === 'T' && 'bg-pink-500',
                    blockShown === 'Z' && 'bg-yellow-500',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
              </span>
            );
          })}
        </Shape>
      ) : (
        <Skeleton variant="text" className="w-10" />
      )}
    </Side>
  );
};

export default TetrisInfoNextShape;
