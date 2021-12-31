import { Cell, WinnerCellIndexes } from 'src/types/tictactoe';

export const MATCH_STATE_WAITING = 'waiting';
export const MATCH_STATE_ONGOING = 'ongoing';
export const MATCH_STATE_FINISHED = 'finished';

// Matches

export interface MatchPayload {
  // Cells
  cells: Cell[];
  cellsIndexesWinner: WinnerCellIndexes | null;
  // Timestamps
  created: number;
  updated: number;
  // State
  isDraw: boolean;
  playerAbandoned: null | string;
  playerMoving: null | string;
  playerWinner: null | string;
  state: typeof MATCH_STATE_WAITING | typeof MATCH_STATE_ONGOING | typeof MATCH_STATE_FINISHED;
  // Players
  challenger: string;
  players: [string] | [string, string];
  playersNicknames: [string] | [string, string];
  playersPhotos: [string | null] | [string | null, string | null];
}

export interface Match extends MatchPayload {
  id: string;
}

export interface MatchWaiting extends Match {
  // Cells
  cellsIndexesWinner: null;
  // State
  isDraw: false;
  playerAbandoned: null;
  playerMoving: null;
  playerWinner: null;
  state: typeof MATCH_STATE_WAITING;
  // Players
  challenger: string;
  players: [string];
  playersNicknames: [string];
  playersPhotos: [string | null];
}

export interface MatchReady extends Match {
  state: typeof MATCH_STATE_ONGOING | typeof MATCH_STATE_FINISHED;
  challenger: string;
  playerMoving: string;
  players: [string, string];
  playersNicknames: [string, string];
  playersPhotos: [string | null, string | null];
}

export interface MatchOngoing extends MatchReady {
  state: typeof MATCH_STATE_ONGOING;
}

export interface MatchFinished extends MatchReady {
  state: typeof MATCH_STATE_FINISHED;
}

// Change payloads
export interface MatchPayloadChange {
  updated: number;
  state: typeof MATCH_STATE_WAITING | typeof MATCH_STATE_ONGOING | typeof MATCH_STATE_FINISHED;
}

export interface JoinMatchPayload extends MatchPayloadChange {
  playerMoving: string;
  players: [string, string];
  playersNicknames: [string, string];
  playersPhotos: [string | null, string | null];
  state: typeof MATCH_STATE_ONGOING;
}

export interface MoveMatchPayload extends MatchPayloadChange {
  cells: Cell[];
  cellsIndexesWinner: WinnerCellIndexes | null;
  isDraw: boolean;
  playerMoving: string;
  playerWinner: string | null;
  state: typeof MATCH_STATE_ONGOING | typeof MATCH_STATE_FINISHED;
}

export interface AbandonMatchPayload extends MatchPayloadChange {
  playerAbandoned: string;
  playerWinner: string;
  state: typeof MATCH_STATE_FINISHED;
}

// Screens

export type ScreenMatch =
  | 'loading'
  | 'gone'
  | 'finished'
  | 'ongoing'
  | 'full'
  | 'joinable'
  | 'waiting';
