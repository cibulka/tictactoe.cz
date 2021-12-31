import useTranslate from 'src/hooks/useTranslate';
import { IconSnake, IconTetris, IconTicTacToe } from 'src/icons';
import { COLORS } from 'src/theme';
import { Game, GameName } from 'src/types/app';

type Result = Record<GameName, Game>;

export default function useGamesList(): Result {
  const translate = useTranslate();

  const result: Result = {
    tictactoeSingleplayer: {
      color: COLORS.red[500],
      colorShade: COLORS.red[600],
      label: translate('common.games.title.tictactoeSingleplayer') as string,
      Icon: IconTicTacToe,
      href: '/tic-tac-toe/singleplayer',
      subtitle: translate(
        'common.games.subtitle.tictactoeSingleplayer',
        undefined,
        undefined,
        '–––',
      ) as string,
      score: [0, 0],
    },
    tictactoeMultiplayer: {
      color: COLORS.sky[500],
      colorShade: COLORS.sky[600],
      label: translate('common.games.title.tictactoeMultiplayer') as string,
      href: '/tic-tac-toe/multiplayer',
      Icon: IconTicTacToe,
      subtitle: translate(
        'common.games.subtitle.tictactoeMultiplayer',
        undefined,
        undefined,
        '–––',
      ) as string,
      score: [0, 0],
    },
    tetris: {
      color: COLORS.yellow[500],
      colorShade: COLORS.yellow[600],
      label: translate('common.games.title.tetris', undefined, undefined, '–––') as string,
      href: '/tetris',
      Icon: IconTetris,
      subtitle: '',
      score: 0,
    },
    snake: {
      color: COLORS.teal[500],
      colorShade: COLORS.teal[600],
      label: translate('common.games.title.snake', undefined, undefined, '–––') as string,
      href: '/snake',
      Icon: IconSnake,
      subtitle: '',
      score: 0,
    },
  };

  console.log(result);

  return result;
}
