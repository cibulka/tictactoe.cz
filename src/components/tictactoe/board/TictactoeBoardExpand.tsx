import React, { FC } from 'react';
import styled from '@emotion/styled';

import { IconPlus } from 'src/icons';

const TicTacToeBoardExpand: FC<{ onSizeChange?: () => void; size: number }> = (props) => {
  const ButtonWrap = styled.div({
    height: `calc(100% / ${props.size + 2})`,
  });

  const Button = styled.button({
    width: `calc(100% / ${props.size + 2})`,
  });

  return (
    <>
      <div className={['absolute inset-0', 'flex flex-col justify-between'].join(' ')}>
        {[...new Array(2)].map((_el, i) => (
          <ButtonWrap className="flex justify-center w-full" key={i}>
            <Button
              type="button"
              className="relative text-gray-500"
              disabled={!props.onSizeChange}
              onClick={
                props.onSizeChange
                  ? () => {
                      if (props.onSizeChange) props.onSizeChange();
                    }
                  : undefined
              }
            >
              <span className="aspect-w-1 aspect-h-1" />
              <span className="absolute inset-0 flex items-center justify-center">
                <div className="w-2/3 h-2/3">
                  <IconPlus />
                </div>
              </span>
            </Button>
          </ButtonWrap>
        ))}
      </div>
    </>
  );
};

export default TicTacToeBoardExpand;
