class Player {
  constructor(x, y, w, h, ctx, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.img = img;
    this.speedX = 0;
    this.speedY = 0;
  }

  attack() {} //attack function

  useAbility() {} //ability function

  draw() {
    const playerImg = new Image();
    playerImg.src = this.img;
    this.ctx.drawImage(playerImg, this.dx, this.dy, 40, 50, this.x, this.y, 50, 75);
    }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
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
//creating projectile class for our attack
class Projectile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = 10; //test to check what feels good
    this.direction = { x: 0, y: 0 };
    this.damage = 10;
  }

  move() {
    // code to move the projectile based on its velocity and direction
    this.x += this.velocity * this.direction.x;
    this.y += this.velocity * this.direction.y;
  }
}

console.log("player JS is loaded");
