import React, { FC, ReactNode, useState } from 'react';
import styled from '@emotion/styled';

import config from 'src/config';
import Ratio from 'src/components/ratio/Ratio';
import Spinner from 'src/components/spinner/Spinner';
import { useSelector } from 'src/redux';
import { Side } from 'src/types/tictactoe';

import TictactoeBoardExpand from './board/TictactoeBoardExpand';
import getShownIndexes from './helpers/getShownIndexes';

const { TIC_TAC_TOE_SIZE } = config;
const TIC_TAC_TOE_AREA = TIC_TAC_TOE_SIZE * TIC_TAC_TOE_SIZE;

const TictactoeLayout: FC<{
  BoardCell: FC<{ index: number }>;
  Overlay?: FC;
  playerLeft: ReactNode;
  playerRight: ReactNode;
  isBoardHidden?: boolean;
  isLoading?: boolean;
  onChangeSize?: (size: number) => void;
  size: number;
  sidePlayer?: Side;
}> = (props) => {
  const [boardWidth, setBoardWidth] = useState<number | undefined>(undefined);

  const shown = getShownIndexes(props.size);
  const sizeEdged = Math.min(props.size + 2, TIC_TAC_TOE_SIZE);
  const isMaxShown = props.size === TIC_TAC_TOE_SIZE;

  const isLocalStorageInited = useSelector((state) => state.app.isLocalStorageInited);

  const Side = styled.div({
    width: '50%',
    '@media (orientation: landscape)': {
      width: boardWidth ? `calc((100vw - ${boardWidth}px) / 2)` : '33vw',
    },
  });

  const Grid = styled.div(
    isMaxShown
      ? {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }
      : {
          top: `calc(100% / ${sizeEdged})`,
          right: `calc(100% / ${sizeEdged})`,
          bottom: `calc(100% / ${sizeEdged})`,
          left: `calc(100% / ${sizeEdged})`,
        },
  );
  const CellWrap = styled.div({
    width: `calc(100% / ${props.size})`,
  });

  return (
    <>
      <div className="flex flex-col w-full h-full relative">
        <div
          className={[
            'flex items-center justify-between',
            'landscape:absolute landscape:inset-0',
            'py-2',
          ].join(' ')}
        >
          <Side
            className={['relative z-20', 'flex landscape:justify-center', 'md:px-4 px-2'].join(' ')}
          >
            {props.playerLeft}
          </Side>
          <Side
            className={[
              'relative z-20',
              'flex landscape:justify-center portrait:justify-end',
              'md:px-4 px-2',
            ].join(' ')}
          >
            {props.playerRight}
          </Side>
        </div>
        <div
          className={[
            'flex relative flex-1',
            props.Overlay ? 'z-30' : 'z-10',
            'md:mt-4 md:mb-4 sm:mt-4 sm:mb-4',
            'landscape:ml-20 landscape:mr-20',
          ].join(' ')}
        >
          <Ratio x={1} y={1} onChangeWidth={setBoardWidth}>
            {!isLocalStorageInited || props.isLoading ? (
              <div className="flex absolute inset-0">
                <Spinner className="m-auto" />
              </div>
            ) : (
              <>
                {!props.isBoardHidden && (
                  <div className="absolute inset-0">
                    {!isMaxShown && (
                      <TictactoeBoardExpand
                        onSizeChange={
                          props.onChangeSize
                            ? () => {
                                if (props.onChangeSize) props.onChangeSize(props.size + 2);
                              }
                            : undefined
                        }
                        size={props.size}
                      />
                    )}
                    <Grid className="flex flex-wrap absolute">
                      {[...new Array(TIC_TAC_TOE_AREA)].map((_cell, i) => {
                        return shown.includes(i) ? (
                          <CellWrap className="relative" key={i}>
                            <div className="aspect-w-1 aspect-h-1" />
                            <props.BoardCell index={i} />
                          </CellWrap>
                        ) : null;
                      })}
                    </Grid>
                  </div>
                )}
                {props.Overlay && <props.Overlay />}
              </>
            )}
          </Ratio>
        </div>
      </div>
    </>
  );
};

export default TictactoeLayout;
