export type User = {
  photoURL: string | null;
  uid: string;
};

export type UserData = {
  nickname: string;
  ticTacToeMultiplayerWon: number;
  ticTacToeMultiplayerLost: number;
  ticTacToeSingleplayerWon: number;
  ticTacToeSingleplayerLost: number;
  tetrisBestScore: number;
  tetrisLastScore: number;
  snakeBestScore: number;
  snakeLastScore: number;
};

export type UserDataValue = Record<string, string | number>;

export type UserDataValueModifier = (value: UserData) => UserDataValue;
