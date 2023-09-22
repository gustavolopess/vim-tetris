// import {BasicBlock, BASIC_BLOCK_SIZE, MOVE_DOWN_VALUE} from "./basicBlock.js";

class Square extends BasicBlock{
  constructor(vectorPos) {
    super(vectorPos);
    this.blockColor = color("#02FB03");
    this.blocks = [
      new BasicBlock(new p5.Vector(vectorPos.x, vectorPos.y), this.blockColor),
      new BasicBlock(new p5.Vector(vectorPos.x + BASIC_BLOCK_SIZE, vectorPos.y), this.blockColor),
      new BasicBlock(new p5.Vector(vectorPos.x, vectorPos.y + BASIC_BLOCK_SIZE), this.blockColor),
      new BasicBlock(new p5.Vector(vectorPos.x + BASIC_BLOCK_SIZE, vectorPos.y + BASIC_BLOCK_SIZE), this.blockColor),
    ];
  }
  
  drawIt() {
    this.blocks.forEach(block => {
      block.drawIt();
    });
  }
  
  getHeight() {
    return this.blocks[0].getHeight() * 2;
  }
  
  getWidth() {
    return this.blocks[0].getWidth() * 2;
  }
  
  addToPosition(x, y) {
    for (let i in this.blocks) {
      this.blocks[i].addToPosition(x, y);
    }
  }
  
  getPosition() {
    return this.blocks[0];
  }
  
  
  rotateIt(rotationPoint) {
    return;
  }
}