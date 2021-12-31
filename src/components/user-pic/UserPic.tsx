import React, { FC, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

import { IconError, IconFace } from 'src/icons';
import { useSelector } from 'src/redux';
import { STATE_LOADING } from 'src/types/common';
import { useAuth } from 'src/firebase';

/* eslint-disable @next/next/no-img-element */
const UserPic: FC<{
  alt?: string;
  classNameLoading?: string;
  isError?: true;
  isLoading: boolean;
  src: string | null;
}> = (props) => {
  const [_auth, isAuthLoading] = useAuth();
  const [imageLoadingError, setImageLoadingError] = useState<unknown>(undefined);

  if (props.isLoading || isAuthLoading)
    return <Skeleton variant="circular" className="w-full h-full" />;

  if (props.isError)
    return (
      <div className="text-red-500 m-auto w-2/3 h-2/3">
        <IconError />
      </div>
    );

  if (!window || imageLoadingError || !props.src)
    return (
      <div className="w-2/3 h-2/3">
        <IconFace />
      </div>
    );

  return (
    <img
      src={props.src}
      alt={props.alt || ''}
      onError={setImageLoadingError}
      referrerPolicy="no-referrer"
      className="absolute top-0 left-0 w-full h-full object-fit-cover"
    />
  );
};
export default UserPic;
