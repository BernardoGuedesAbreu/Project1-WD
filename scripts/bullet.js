class Bullet {
  constructor(x, y, w, h, ctx, lastKeyPress) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "/img/player2.png";
    this.bulletDirection = lastKeyPress;
  }

  direction() {
    if (this.bulletDirection === "right") {
      this.x += 3;
    } else if (this.bulletDirection === "left") {
      this.x -= 3;
    } else if (this.bulletDirection === "up") {
      this.y -= 3;
    } else if (this.bulletDirection === "down") {
      this.y += 3;
    }
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  newPos() {
    this.x = this.x;
    this.y = this.y;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.h;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.w;
  }
}
