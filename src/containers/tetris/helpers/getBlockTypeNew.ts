import getRandomValue from 'src/helpers/getRandomValue';
import {
  BlockType,
  initialBlockPositions,
  initialBlockPositionsForPreview,
} from 'src/types/tetris';

export default function getBlockTypeNew(): { blockType: BlockType; rotate: number } {
  const blockType = getRandomValue(Object.keys(initialBlockPositions)) as BlockType;
  const legalRotates = initialBlockPositionsForPreview[blockType]
    .map((el: number[] | null, i: number) => (el ? i : false))
    .filter((v) => v !== false);

  return {
    blockType,
    rotate: getRandomValue(legalRotates) as number,
  };
}
