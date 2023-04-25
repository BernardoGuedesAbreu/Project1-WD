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

    if(this.x <= 0)this.x = 1;
    if(this.x >= canvas.width - this.w) this.x = canvas.width - this.w;
    if(this.y <= 0)this.y = 1;
    if(this.y >= canvas.height - this.h)this.y = canvas.height - this.h; 
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


console.log("player JS is loaded");
