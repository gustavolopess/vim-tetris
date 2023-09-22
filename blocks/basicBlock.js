const BASIC_BLOCK_SIZE = 25;
const MOVE_DOWN_VALUE = 5;

class BasicBlock {
  constructor(vectorPos, blockColor) {
    this.size = BASIC_BLOCK_SIZE;
    this.pos = vectorPos;
    this.canvas = canvas;
    this.blockColor = blockColor;
  }
  
  drawIt() {
    fill(this.blockColor);
    rect(this.pos.x, this.pos.y, this.size);
  }
  
  getHeight() {
    return this.size;
  }
  
  getWidth() {
    return this.size;
  }
  
  addToPosition(x, y) {
    this.pos.add(x, y);
  }
  
  getPosition() {
    return this.pos;
  }
  
  rotateIt(rotationPoint) {
    const dx = rotationPoint.x;
    const dy = rotationPoint.y;
    const xRotated = (this.pos.y + dx - dy);
    const yRotated = dx + dy - this.pos.x - BASIC_BLOCK_SIZE; 
    this.pos = createVector(xRotated, yRotated);
  }
}