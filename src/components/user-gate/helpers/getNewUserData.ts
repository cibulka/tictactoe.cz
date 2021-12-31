import { doc, setDoc } from '@firebase/firestore';

import { db } from 'src/firebase';
import { UserData } from 'src/types/user';

export default function getNewUserData(userId: string, nickname: string): Promise<void> {
  const userPayload: UserData = {
    nickname,
    ticTacToeMultiplayerWon: 0,
    ticTacToeMultiplayerLost: 0,
    ticTacToeSingleplayerWon: 0,
    ticTacToeSingleplayerLost: 0,
    tetrisBestScore: 0,
    tetrisLastScore: 0,
    snakeBestScore: 0,
    snakeLastScore: 0,
  };

  return setDoc(doc(db, 'userdata', userId), userPayload);
}
