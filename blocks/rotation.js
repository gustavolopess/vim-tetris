function rotateBlock(block) {
  if (block.pivotBlockIdx == null) {
    return;
  }
  const pivotBlock = block.blocks[block.pivotBlockIdx];
  const pivotBlockPos = pivotBlock.getPosition();
  const pivotPoint = createVector(
    pivotBlockPos.x + BASIC_BLOCK_SIZE / 2,
    pivotBlockPos.y + BASIC_BLOCK_SIZE / 2
  );
  for (let i in block.blocks) {
    block.blocks[i].rotateIt(pivotPoint);
  }
  return block;
}

function previewBlockRotation(block) {
  const blockCopy = new block.constructor(block.getPosition());
  return rotateBlock(blockCopy);
}
