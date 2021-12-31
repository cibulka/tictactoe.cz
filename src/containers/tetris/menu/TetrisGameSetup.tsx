import React, { FC } from 'react';
import Slider from '@mui/material/Slider';

import { Translate } from 'src/types/translate';

const TetrisGameSetup: FC<{
  level: number;
  onChangeLevel: (level: number) => void;
  onChangeRows: (rows: number) => void;
  rows: number;
  translate: Translate;
}> = (props) => (
  <>
    <div className="mt-4 mb-4">
      <div className="tic-h3">{props.translate('setup.level')}</div>
      <div className="flex items-center">
        <Slider
          className="flex-1"
          step={1}
          min={1}
          max={10}
          onChange={(_e, value) => props.onChangeLevel(value as number)}
          value={props.level}
          valueLabelDisplay="off"
        />
        <div className="flex justify-end w-8 font-mono text-xl">{props.level}</div>
      </div>
    </div>
    <div>
      <div className="tic-h3">{props.translate('setup.rows')}</div>
      <div className="flex items-center">
        <Slider
          className="flex-1"
          step={1}
          min={0}
          max={10}
          onChange={(_e, value) => props.onChangeRows(value as number)}
          value={props.rows}
          valueLabelDisplay="off"
        />
        <div className="flex justify-end w-8 font-mono text-xl">{props.rows}</div>
      </div>
    </div>
  </>
);

export default TetrisGameSetup;
