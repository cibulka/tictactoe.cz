import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { Interval } from 'src/types/common';

const IconCarousel: FC<{
  className: string;
  icons: ReactNode[];
  ms?: number;
}> = (props) => {
  const [tick, setTick] = useState(0);

  const interval = useRef<Interval>();
  const iconsLength = props.icons.length;
  const ms = props.ms || 2000;
  useEffect(() => {
    function handler() {
      setTick((old) => {
        const next = old + 1;
        return next < iconsLength ? next : 0;
      });
    }

    if (interval.current) {
      clearInterval(interval.current);
      setTick(0);
    }
    if (iconsLength > 1) {
      interval.current = setInterval(handler, ms);
    }

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [iconsLength, ms]);

  return (
    <div className={['flex relative', props.className].join(' ')}>
      {props.icons.map((icon, i) => (
        <motion.span
          className="absolute w-full h-full"
          initial="hidden"
          key={i}
          animate={tick === i ? 'shown' : 'hidden'}
          variants={{ hidden: { y: '-200%' }, shown: { y: 0 } }}
          transition={{
            type: 'spring',
            stiffness: 100,
          }}
        >
          {icon}
        </motion.span>
      ))}
    </div>
  );
};

export default IconCarousel;
