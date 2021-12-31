import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BlockType, Board, initialBlockPositions } from 'src/types/tetris';

import clearRows from 'src/containers/tetris/helpers/clearRows';
import getInitialBoard from 'src/containers/tetris/helpers/getInitialBoard';
import getBlockTypeNew from 'src/containers/tetris/helpers/getBlockTypeNew';
import getBlockIndexes from 'src/containers/tetris/helpers/getBlockIndexes';
import getFullRows from 'src/containers/tetris/helpers/getFullRows';
import getLevel from 'src/containers/tetris/helpers/getLevel';
import isLegalBlock, { getBlockRotateModifier } from 'src/containers/tetris/helpers/isLegalBlock';

const INITIAL_BLOCK_TYPE = 'T';
const INITIAL_BLOCK_TYPE_NEXT = 'L';
const INITIAL_ROTATE = 0;

interface TetrisStore {
  blockType: BlockType;
  blockTypeNext: BlockType;
  board: Board;
  cleared: number;
  full: number[] | null;
  initialLevel: number;
  initialRows: number;
  isConsent: boolean;
  isDrop: boolean;
  isOver: boolean;
  isPaused: boolean;
  isLocalStorageLoaded: boolean;
  level: number;
  rotate: number;
  rotateNext: number;
  x: number;
  y: number;
}

const initialState: TetrisStore = {
  blockType: INITIAL_BLOCK_TYPE,
  blockTypeNext: INITIAL_BLOCK_TYPE_NEXT,
  board: getInitialBoard(0),
  cleared: 0,
  full: null,
  isConsent: false,
  isLocalStorageLoaded: false,
  initialLevel: 1,
  initialRows: 0,
  isDrop: false,
  isOver: false,
  isPaused: true,
  level: 1,
  rotate: INITIAL_ROTATE,
  rotateNext: INITIAL_ROTATE,
  x: 0,
  y: 0,
};

export const slice = createSlice({
  name: 'tetris',
  initialState,
  reducers: {
    // Game state
    tick: (state) => {
      const { blockType, blockTypeNext, board, rotate, rotateNext, x, y } = state;
      const isMovingDown = isLegalBlock(getBlockIndexes(blockType, rotate, x, y + 1), board);

      if (isMovingDown) {
        state.y = y + 1;
        return;
      }

      const newBoard = [...board];
      getBlockIndexes(blockType, rotate, x, y).forEach((index) => {
        newBoard[index] = blockType;
      });

      const { blockType: blockTypeNew, rotate: rotateNew } = getBlockTypeNew();
      state.blockType = blockTypeNext;
      state.blockTypeNext = blockTypeNew;
      state.board = newBoard;
      state.rotate = rotateNext;
      state.rotateNext = rotateNew;
      state.x = 0;
      state.y = 0;
      state.isOver = Boolean(getBlockIndexes(blockTypeNew, rotateNew).find((i) => newBoard[i]));
      state.isDrop = false;

      const full = getFullRows(newBoard);
      if (full.length > 0) {
        state.full = full;
        state.cleared = state.cleared + full.length;
      }
    },
    clearFull: (state) => {
      if (!state.full) throw new Error('reducer/tetris/clearRows: No rows to clear.');

      const newBoard = [...state.board];

      state.board = clearRows(newBoard, state.full);
      state.level = getLevel(state.initialLevel, state.cleared);
      state.full = null;
    },
    // User
    drop: (state, action: PayloadAction<boolean>) => {
      state.isPaused = false;
      state.isDrop = action.payload;
    },
    moveBy: (state, action: PayloadAction<number>) => {
      const { blockType, board, rotate, x, y } = state;
      if (isLegalBlock(getBlockIndexes(blockType, rotate, x + action.payload, y), board)) {
        state.x += action.payload;
      }
      state.isPaused = false;
    },
    // TODO: Swipe
    moveTo: (state, action: PayloadAction<number>) => {},
    pause: (state, action: PayloadAction<boolean>) => {
      console.log('pause is called');
      state.isPaused = action.payload;
    },
    rotateBlock: (state) => {
      const { blockType, board, rotate, x, y } = state;

      const newRotate = rotate + 1 <= initialBlockPositions[blockType].length - 1 ? rotate + 1 : 0;

      state.isPaused = false;

      let rotatedBlock = getBlockIndexes(blockType, newRotate, x, y);
      if (isLegalBlock(rotatedBlock, board)) {
        state.rotate = newRotate;
        return;
      }

      const modifier = getBlockRotateModifier(rotatedBlock, [...board]);
      if (modifier) {
        state.rotate = newRotate;
        state.x = x + modifier;
      }
    },
    // Setup
    startNewGame: (
      state,
      action: PayloadAction<{ initialLevel: number; initialRows: number }>,
    ): TetrisStore => {
      const { initialLevel, initialRows } = action.payload;
      const { blockType, rotate } = getBlockTypeNew();
      const { blockType: blockTypeNext, rotate: rotateNext } = getBlockTypeNew();
      return {
        ...initialState,
        blockType,
        blockTypeNext,
        board: getInitialBoard(initialRows),
        rotate,
        rotateNext,
        initialLevel: initialLevel,
        initialRows: initialRows,
        isConsent: state.isConsent,
        isLocalStorageLoaded: state.isLocalStorageLoaded,
        isPaused: true,
        level: initialLevel,
      };
    },
    setIsConsent: (state, action: PayloadAction<boolean>) => {
      state.isConsent = action.payload;
    },
    setStoreFromLocalStorage: (_state, action: PayloadAction<string>): TetrisStore => {
      return {
        ...JSON.parse(action.payload),
        isLocalStorageLoaded: true,
        isPaused: true,
      };
    },
  },
});

export const {
  clearFull,
  drop,
  moveBy,
  moveTo,
  pause,
  rotateBlock,
  tick,
  setIsConsent,
  setStoreFromLocalStorage,
  startNewGame,
} = slice.actions;

export default slice.reducer;
