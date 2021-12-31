import React, { FC, useState } from 'react';

import Spinner from 'src/components/spinner/Spinner';
import Tooltip from 'src/components/tooltip/Tooltip';
import useTranslate from 'src/hooks/useTranslate';
import { IconPlus, IconQuestionMark } from 'src/icons';
import { useSelector } from 'src/redux';
import { ErrorHandler } from 'src/types/error';

import createNewMatch, { getNewMatchPayload } from '../helpers/createNewMatch';

import localization from './TictactoeMultiplayerMatchesCreateNew.localization';

const MAX_NUM_MATCHES = 3;

const TictactoeMultiplayerMatchesCreateNew: FC<{
  nickname: string;
  onError: ErrorHandler;
  userId: string;
  userPhoto: string | null;
}> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const translate = useTranslate(localization);

  const isAllowed = useSelector((state) => {
    if (!state.tictactoeMultiplayer.matches) return true;
    return Object.values(state.tictactoeMultiplayer.matches).length < MAX_NUM_MATCHES;
  });
  const payload = getNewMatchPayload(props.userId, props.nickname, props.userPhoto);

  console.log('allowed?', isAllowed);

  return (
    <button
      className="flex items-center py-2 border-t tic-border w-full"
      disabled={isLoading || !isAllowed}
      onClick={() => {
        try {
          setIsLoading(true);
          createNewMatch(payload);
        } catch (e) {
          props.onError(e);
        }
        setIsLoading(false);
      }}
    >
      <span className="flex tic-icon-xl mr-4 rounded-full tic-surface-light">
        {isLoading ? (
          <Spinner className="tic-icon-big m-auto" />
        ) : isAllowed ? (
          <IconPlus className="text-blue-500" />
        ) : (
          <Tooltip title={translate('tooMany')} className="m-auto tic-icon-big">
            <IconQuestionMark className="flex-shrink-0" />
          </Tooltip>
        )}
      </span>
      <span className="flex-1 mr-4">
        <span className="block tic-h2">{translate('createNewMatch')}</span>
      </span>
      <IconPlus className="tic-icon-md transform rotate-90" />
    </button>
  );
};

export default TictactoeMultiplayerMatchesCreateNew;
