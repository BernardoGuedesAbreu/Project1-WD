class Bullet {
  constructor(x, y, w, h, ctx, lastKeyPress, bulletImage) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.img = []
    this.bulletDirection = lastKeyPress;
    this.bulletImage = bulletImage;
    
  }

  direction() {
    if (this.bulletDirection === "right") {
      this.x += 5;
    } else if (this.bulletDirection === "left") {
      this.x -= 5;
    } else if (this.bulletDirection === "up") {
      this.y -= 5;
    } else if (this.bulletDirection === "down") {
      this.y += 5;
    }
  }

  draw() {
    this.ctx.drawImage(this.bulletImage, this.x, this.y, this.w, this.h);
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

  crashWith(enemy) {
    return !(
      this.bottom() < enemy.top() ||
      this.top() > enemy.bottom() ||
      this.right() < enemy.left() ||
      this.left() > enemy.right()
    );
  }
}
