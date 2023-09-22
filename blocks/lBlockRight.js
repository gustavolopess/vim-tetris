class LBlockRight extends BasicBlock {
    constructor(vectorPos) {
    super(vectorPos);
    this.blockColor = color("#438835");
    this.blocks = [
      new BasicBlock(new p5.Vector(vectorPos.x, vectorPos.y), this.blockColor),
      new BasicBlock(new p5.Vector(vectorPos.x + BASIC_BLOCK_SIZE, vectorPos.y), this.blockColor),
      new BasicBlock(new p5.Vector(vectorPos.x + 2*BASIC_BLOCK_SIZE, vectorPos.y), this.blockColor),
      new BasicBlock(new p5.Vector(vectorPos.x + 2*BASIC_BLOCK_SIZE, vectorPos.y - BASIC_BLOCK_SIZE), this.blockColor),
    ];
    this.pivotBlockIdx = 1;
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
    return this.blocks[0].getWidth() * 3;
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
    rotateBlock(this);
  }
}