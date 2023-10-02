class Canvas {
  constructor() {
    this.blocks = [];
    this.width = 400;
    this.height = 400;
    this.heightOffset = 50;
    const gridLines = this.height / BASIC_BLOCK_SIZE;
    const gridColumns = this.width / BASIC_BLOCK_SIZE;
    this.grid = [];
    this.pointsSystem = new PointsSystem();

    for (let i = 0; i < gridLines; i++) {
      const thisLine = [];
      for (let j = 0; j < gridColumns; j++) {
        thisLine.push(undefined); // there's no block initially
      }
      this.grid.push(thisLine);
    }

    this.blockArray = [
      Square,
      TBlock,
      LBlockRight,
      LBlockLeft,
      LittleStairToLeft,
      LittleStairToRight,
      ThreeSnake,
    ];
  }

  drawAllBlocks() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] != null) {
          this.grid[i][j].drawIt();
        }
      }
    }

    stroke(color('green'));
    line(0, this.height, this.width, this.height);
    stroke(color('black'));
  }

  generateBlock() {
    const coin = floor(random(0, this.blockArray.length));
    const blockConstructor = this.blockArray[coin];
    return new blockConstructor(new p5.Vector(100, 0), this);
  }

  drawScoreboard() {
    this.pointsSystem.drawScoreboard(
      this.width - 50,
      this.height + this.heightOffset / 2
    );
  }

  checkForFilledLines(count) {
    for (let i = this.grid.length - 1; i >= 0; i--) {
      const isLineFilled = this.grid[i].reduce((acc, val) => {
        return acc && val != null;
      }, true);
      if (isLineFilled) {
        this.removeLine(i);
        this.checkForFilledLines(count + 1);
        return;
      } else if (count > 0) {
        this.pointsSystem.addPoint(count);
      }
    }
  }

  removeLine(i) {
    // pull all lines from above
    for (let m = i; m >= 1; m--) {
      this.grid[m] = this.grid[m - 1];
      for (let n = 0; n < this.grid[m].length; n++) {
        if (this.grid[m][n] != null) {
          this.grid[m][n].addToPosition(0, BASIC_BLOCK_SIZE);
        }
      }
    }
  }

  create() {
    createCanvas(this.width, this.height + this.heightOffset);
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  convertPositionToGridIdx(x, y) {
    const bi = y / BASIC_BLOCK_SIZE;
    const bj = x / BASIC_BLOCK_SIZE;
    return [ceil(bi), ceil(bj)];
  }

  addBlock(block) {
    // make sure we only add BasicBlock
    if (block.blocks != null) {
      for (let i in block.blocks) {
        const b = block.blocks[i];
        const [bi, bj] = this.convertPositionToGridIdx(
          b.getPosition().x,
          b.getPosition().y
        );
        this.grid[bi][bj] = b;
      }
    } else {
      const [bi, bj] = this.convertPositionToGridIdx(
        block.getPosition().x,
        block.getPosition().y
      );
      this.grid[bi][bj] = b;
    }
  }

  isInsideCanvasWidth(x, blockSize) {
    return x >= 0 && x <= this.width - blockSize;
  }

  isInsideCanvasHeight(y, blockSize) {
    // console.log(y >= 0 && y <= this.height - blockSize, y, this.height, blockSize);
    return y >= 0 && y <= this.height - blockSize;
  }

  isThereBlock(x, y) {
    const [i, j] = this.convertPositionToGridIdx(x, y);
    if (i < 0 || j < 0) return true;
    if (i >= this.grid.length || j >= this.grid[0].length) return true;
    return this.grid[i][j] != null;
  }

  canBlockMoveRight(block, pace) {
    const blockWidth = block.getWidth();

    if (block.pos.x + pace - blockWidth >= this.width) {
      return false;
    }

    if (block.blocks != null) {
      let canAllBlocksMoveRight = true;
      block.blocks.forEach((bl) => {
        canAllBlocksMoveRight =
          canAllBlocksMoveRight &&
          !this.isThereBlock(bl.pos.x + pace, bl.pos.y);
      });

      return canAllBlocksMoveRight;
    } else {
      return !this.isThereBlock(block.pos.x + pace, block.pos.y);
    }
  }

  canBlockMoveLeft(block, pace) {
    const blockWidth = block.getWidth();

    if (block.pos.x - pace + blockWidth < 0) {
      return false;
    }

    if (block.blocks != null) {
      let canAllBlocksMoveLeft = true;
      block.blocks.forEach((bl) => {
        canAllBlocksMoveLeft =
          canAllBlocksMoveLeft && !this.isThereBlock(bl.pos.x - pace, bl.pos.y);
      });

      return canAllBlocksMoveLeft;
    } else {
      return !this.isThereBlock(block.pos.x - pace, block.pos.y);
    }
  }

  canBlockMoveDown(block, pace) {
    if (block.blocks != null) {
      let canAllBlocksMoveDown = true;
      block.blocks.forEach((bl) => {
        canAllBlocksMoveDown =
          canAllBlocksMoveDown && !this.isThereBlock(bl.pos.x, bl.pos.y + pace);
      });

      return canAllBlocksMoveDown;
    } else {
      return !this.isThereBlock(block.pos.x, block.pos.y + pace);
    }
  }

  moveBlockDown(block, pace) {
    if (this.canBlockMoveDown(block, pace)) {
      block.addToPosition(0, pace);
    }
  }

  moveBlockLeft(block, pace) {
    if (this.canBlockMoveLeft(block, pace)) {
      block.addToPosition(-pace, 0);
    }
  }

  moveBlockRight(block, pace) {
    if (this.canBlockMoveRight(block, pace)) {
      block.addToPosition(pace, 0);
    }
  }

  canRotateBlock(block) {
    const rotatedBlock = previewBlockRotation(block);
    if (rotatedBlock == null) {
      return true;
    }
    let canRotate = true;
    for (const bl of rotatedBlock.blocks) {
      const blPos = bl.getPosition();
      // console.log(
      //   `block(${blPos.x},${blPos.y}) / grid(${blPos.x},${blPos.y})=${
      //     this.grid[blPos.x][blPos.y]
      //   }`
      // );
      canRotate = canRotate && !this.isThereBlock(blPos.x, blPos.y);
    }
    return canRotate;
  }

  rotateBlock(block) {
    if (this.canRotateBlock(block)) {
      block.rotateIt();
    }
  }
}
