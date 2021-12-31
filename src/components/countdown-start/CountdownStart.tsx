import React, { FC, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { useSelector } from 'src/redux';
import { Interval } from 'src/types/common';

function useCountdown(s: number, interval = 1000): number {
  const [countdown, setCountdown] = useState(s);

  const intervalRef = useRef<Interval | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setCountdown((old) => old - 1), interval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [interval]);

  useEffect(() => {
    if (countdown <= 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [countdown]);

  return countdown;
}

const CountdownStart: FC<{ color: string; Cover?: FC; onFinish: () => void }> = (props) => {
  const [isShown, setIsShown] = useState(true);
  const countdown = useCountdown(3);

  const isPrivacyPreferencesResolved = useSelector((state) =>
    Boolean(state.preferences.privacyPreferences),
  );

  const { onFinish } = props;
  useEffect(() => {
    if (isPrivacyPreferencesResolved && countdown === 0) {
      onFinish();
      setIsShown(false);
    }
  }, [countdown, isPrivacyPreferencesResolved, onFinish]);

  return (
    <motion.div
      className={['flex', 'absolute inset-0', 'bg-white-500 dark:bg-black-500'].join(' ')}
      initial={{ y: 0 }}
      animate={{ y: isShown ? 0 : '100%' }}
      transition={{ transition: 1 }}
    >
      <div
        className={[
          'relative z-20',
          'flex items-center justify-center',
          'w-20 h-20',
          'm-auto',
        ].join(' ')}
      >
        <div className="relative z-10 font-mono text-4xl text-white dark:text-black">
          {countdown}
        </div>
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: props.color }}
        />
        <span className="absolute inset-0 rounded-full" style={{ background: props.color }} />
      </div>
      {props.Cover && <props.Cover />}
    </motion.div>
  );
};

export default CountdownStart;
