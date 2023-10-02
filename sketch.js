// global vars
let currBlock;
let tetrisCanvas;
//

function keyPressed() {
  switch (keyCode) {
    case 'L'.charCodeAt(0):
      tetrisCanvas.moveBlockRight(currBlock, 25);
      break;
    case 'H'.charCodeAt(0):
      tetrisCanvas.moveBlockLeft(currBlock, 25);
      break;
    case 'J'.charCodeAt(0):
      tetrisCanvas.moveBlockDown(currBlock, 25);
      break;
    case 'R'.charCodeAt(0):
      tetrisCanvas.rotateBlock(currBlock, PI / 2);
    default:
      break;
  }
}

function setup() {
  tetrisCanvas = new Canvas(400, 400);
  tetrisCanvas.create();
}

function draw() {
  background('black');
  if (currBlock == null) {
    currBlock = tetrisCanvas.generateBlock();
  }

  tetrisCanvas.drawAllBlocks();

  tetrisCanvas.moveBlockDown(currBlock, 1);
  currBlock.drawIt();
  tetrisCanvas.drawScoreboard();

  if (!tetrisCanvas.canBlockMoveDown(currBlock, 1)) {
    tetrisCanvas.addBlock(currBlock);
    tetrisCanvas.checkForFilledLines(0);
    currBlock = undefined;
  }
}
