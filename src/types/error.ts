// ERROR CODES: Firestore
// ===

export const FIRESTORE_RESOURCEEXHAUSTED = 'resource-exhausted';

// ERROR CODES: App
// ===

// firestore
export const TICERROR_USERDATAMISSING = 'ticError/userDataMissing';

// firestore/ticMultiplayer
export const TICERROR_TICTACTOEMULTIPLAYER_MATCHGONE = 'ticError/ticMultiplayer/matchGone';
export const TICERROR_TICTACTOEMULTIPLAYER_MATCHFULL = 'ticError/ticMultiplayer/matchFull';

// app
export const TICERROR_TICTACTOEMULTIPLAYER_BADLOGIC = 'ticError/ticMultiplayer/badLogic';

// unknown
export const TICERROR_UNKNOWN = 'TICERROR_UNKNOWN';

// ERROR HANDLING
// ===

export type ErrorDetails = Record<string, string>;

export interface ReduxError {
  errorCode: string;
  status: number | null;
  message: string;
  details: ErrorDetails | null;
}

export interface ReduxThunkError extends ReduxError {
  typePrefix: string;
}

export interface AppError extends ReduxError, Error {}

export type ErrorHandler = (error: unknown) => void;
