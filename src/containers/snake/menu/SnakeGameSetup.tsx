import React, { FC } from 'react';
import Slider from '@mui/material/Slider';

import { Translate } from 'src/types/translate';
import { GameSpeedLevel } from 'src/types/snake';

const SnakeGameSetup: FC<{
  speed: GameSpeedLevel;
  onChangeSpeed: (speedLevel: GameSpeedLevel) => void;
  translate: Translate;
}> = (props) => (
  <div className="mt-4 max-w-xs m-auto">
    <div className="tic-h3">{props.translate('setup.speed')}</div>
    <div className="flex items-center">
      <Slider
        className="flex-1"
        step={1}
        min={0}
        max={4}
        onChange={(_e, value) => props.onChangeSpeed(value as GameSpeedLevel)}
        value={props.speed}
        valueLabelDisplay="off"
      />
      <div className="flex justify-end w-8 font-mono text-xl">{props.speed + 1}</div>
    </div>
  </div>
);

export default SnakeGameSetup;
