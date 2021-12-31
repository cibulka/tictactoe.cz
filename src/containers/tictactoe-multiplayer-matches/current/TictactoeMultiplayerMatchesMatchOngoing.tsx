import React, { FC } from 'react';

import { MatchOngoing } from 'src/types/tictactoe/multiplayer';
import { Translate } from 'src/types/translate';

const TictactoeMultiplayerMatchesMatchOngoing: FC<{ match: MatchOngoing; translate: Translate }> =
  () => <div>match ongoing</div>;

export default TictactoeMultiplayerMatchesMatchOngoing;
