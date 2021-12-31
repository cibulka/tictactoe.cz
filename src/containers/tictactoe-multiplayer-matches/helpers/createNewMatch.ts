import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';

import config from 'src/config';
import { db } from 'src/firebase';
import { MatchPayload, MATCH_STATE_WAITING } from 'src/types/tictactoe/multiplayer';

const { TIC_TAC_TOE_SIZE } = config;
const TIC_TAC_TOE_AREA = TIC_TAC_TOE_SIZE * TIC_TAC_TOE_SIZE;

export function getNewMatchPayload(
  userId: string,
  nickname: string,
  userPhoto: string | null,
): MatchPayload {
  return {
    // Cells
    cells: [...new Array(TIC_TAC_TOE_AREA)].map(() => null),
    cellsIndexesWinner: null,
    // Timestamps
    created: Date.now(),
    updated: Date.now(),
    // State
    isDraw: false,
    playerAbandoned: null,
    playerMoving: null,
    playerWinner: null,
    state: MATCH_STATE_WAITING,
    // Players,
    challenger: userId,
    players: [userId],
    playersNicknames: [nickname],
    playersPhotos: [userPhoto],
  };
}

export default async function createNewMatch(payload: MatchPayload): Promise<void> {
  const match = await addDoc(collection(db, 'tictactoe'), payload);
  const matchRef = doc(db, 'tictactoe', match.id);
  return await updateDoc(matchRef, { id: match.id });
}
