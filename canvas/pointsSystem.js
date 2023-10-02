class PointsSystem {
  constructor() {
    this.points = 0;
    this.pointsForOneLine = 100;
    this.speed = 1;
    this.scoreboardColor = color('#90D753');
  }

  addPoint(numLinesDeleted) {
    this.points = Math.ceil(
      this.pointsForOneLine * Math.pow(numLinesDeleted, 2)
    );
    this.increaseSpeed();
  }

  increaseSpeed() {
    this.speed += this.points / 1000;
  }

  getSpeed() {
    return this.speed;
  }

  drawScoreboard(x, y) {
    fill(this.scoreboardColor);
    text(this.points, x, y);
  }
}
