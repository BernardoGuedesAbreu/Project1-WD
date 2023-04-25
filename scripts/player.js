class Player {
  constructor(x, y, w, h, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = '/img/player.png'
    this.speedX = 0;
    this.speedY = 0;
  }

  attack() {} //attack function

  useAbility() {} //ability function

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
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
