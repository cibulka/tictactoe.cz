import React, { FC } from 'react';
import useTranslate from 'src/hooks/useTranslate';

import localization from './HireMeDate.localization';

const HireMeDate: FC<{ className?: string }> = (props) => {
  const translate = useTranslate(localization);

  const today = new Date();
  const dateInTwoMonths = new Date(today.setMonth(today.getMonth() + 2));
  const monthNum = dateInTwoMonths.getMonth() + 1;
  const replacements = { year: dateInTwoMonths.getFullYear() };

  return (
    <>
      {/* Verbose for Typescript/Lint purposes */}
      <span className={props.className}>
        {monthNum === 1
          ? translate('1', replacements)
          : monthNum === 2
          ? translate('2', replacements)
          : monthNum === 3
          ? translate('3', replacements)
          : monthNum === 4
          ? translate('4', replacements)
          : monthNum === 5
          ? translate('5', replacements)
          : monthNum === 6
          ? translate('6', replacements)
          : monthNum === 7
          ? translate('7', replacements)
          : monthNum === 8
          ? translate('8', replacements)
          : monthNum === 9
          ? translate('9', replacements)
          : monthNum === 10
          ? translate('10', replacements)
          : monthNum === 11
          ? translate('11', replacements)
          : monthNum === 12
          ? translate('12', replacements)
          : ''}
      </span>
    </>
  );
};

export default HireMeDate;
