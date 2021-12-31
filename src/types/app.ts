import { FC } from 'react';

export type GameName = 'snake' | 'tetris' | 'tictactoeMultiplayer' | 'tictactoeSingleplayer';

export interface Game {
  color: string;
  colorShade: string;
  label: string;
  href: string;
  Icon: FC<{ className?: string; style?: Record<string, string> }>;
  subtitle: string;
  score: number | [number, number];
}

export interface GameDuel extends Game {
  score: [number, number];
}

export interface GameMono extends Game {
  score: number;
}

export type Css = Record<string, string | Record<string, string>>;

export interface PrivacyPreferences {
  isGoogleAnalytics: boolean;
  isLocalStorage: boolean;
}
