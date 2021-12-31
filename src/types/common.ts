export type Interval = ReturnType<typeof setInterval>;

export type Timeout = ReturnType<typeof setTimeout>;

export const STATE_IDLE = 0;
export const STATE_LOADING = 1;
export const STATE_FAILURE = 2;
export const STATE_SUCCESS = 3;

export type State =
  | typeof STATE_IDLE
  | typeof STATE_LOADING
  | typeof STATE_FAILURE
  | typeof STATE_SUCCESS;
