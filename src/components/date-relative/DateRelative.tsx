import { FC, useEffect, useMemo, useRef, useState } from 'react';

import useTranslate from 'src/hooks/useTranslate';
import { Interval } from 'src/types/common';

import localization from './DateRelative.localization';

const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = MINUTE_IN_SECONDS * 60;
const DAY_IN_SECONDS = HOUR_IN_SECONDS * 24;

function getDelta(date: Date, dateToCompare: Date): number {
  return (dateToCompare.valueOf() - date.valueOf()) / 1000;
}

function getIntervalLengthInSeconds(delta: number): number | null {
  if (delta < MINUTE_IN_SECONDS) return 1;
  if (delta < HOUR_IN_SECONDS) return 60;
  return null;
}

// TODO: Test this
const DateRelative: FC<{ date: Date; dateToCompare?: Date; onFinished?: () => void }> = (props) => {
  const date = props.date;

  const [delta, setDelta] = useState(getDelta(props.date, props.dateToCompare || new Date()));
  const translate = useTranslate(localization);

  const interval = useRef<Interval | null>(null);
  const intervalLengthInSeconds = getIntervalLengthInSeconds(delta);
  const { dateToCompare } = props;
  useEffect(() => {
    if (interval.current) clearInterval(interval.current);
    if (intervalLengthInSeconds) {
      interval.current = setInterval(() => {
        setDelta(getDelta(date, dateToCompare || new Date()));
      }, intervalLengthInSeconds * 1000);
    }
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [date, dateToCompare, intervalLengthInSeconds]);

  const { onFinished } = props;
  useEffect(() => {
    if (onFinished && delta <= 0) onFinished();
  }, [delta, onFinished]);

  const deltaAbs = Math.abs(delta);

  return (
    <>
      {delta < 0 ? (
        <>
          {deltaAbs < MINUTE_IN_SECONDS
            ? translate('dateRelative.future.seconds', {}, Math.floor(deltaAbs))
            : deltaAbs < HOUR_IN_SECONDS
            ? translate('dateRelative.future.minutes', {}, Math.floor(deltaAbs / MINUTE_IN_SECONDS))
            : deltaAbs < DAY_IN_SECONDS
            ? translate('dateRelative.future.hours', {}, Math.floor(deltaAbs / HOUR_IN_SECONDS))
            : translate('dateRelative.future.days', {}, Math.floor(deltaAbs / DAY_IN_SECONDS))}
        </>
      ) : (
        <>
          {deltaAbs < MINUTE_IN_SECONDS
            ? translate('dateRelative.past.seconds', {}, Math.floor(deltaAbs))
            : deltaAbs < HOUR_IN_SECONDS
            ? translate('dateRelative.past.minutes', {}, Math.floor(deltaAbs / MINUTE_IN_SECONDS))
            : deltaAbs < DAY_IN_SECONDS
            ? translate('dateRelative.past.hours', {}, Math.floor(deltaAbs / HOUR_IN_SECONDS))
            : translate('dateRelative.past.days', {}, Math.floor(deltaAbs / DAY_IN_SECONDS))}
        </>
      )}
    </>
  );
};

export default DateRelative;
