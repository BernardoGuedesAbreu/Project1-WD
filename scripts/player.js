class Player {
  constructor(x, y, w, h, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "/img/player.png";
    this.img2 = new Image();
    this.img2.src = "img/playerMirrored.png";
    this.speedX = 0;
    this.speedY = 0;
  }

  /*shoot() {
    if (player.shootPressedW) {
    }
    if (player.shootPressedA) {
    }
    if (player.shootPressedD) {
    }
    if (player.shootPressedS) {
    }
  } //attack function*/

  useAbility() {} //ability function

  draw() {
    if (lastKeyPress === "right") {
      this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    } else if (lastKeyPress === "left") {
      this.ctx.drawImage(this.img2, this.x, this.y, this.w, this.h);
    } else {
      this.ctx.drawImage(this.img2, this.x, this.y, this.w, this.h);
    }
  }

  newPos() {
    if (this.x <= 0) this.x = 1;
    if (this.x >= canvas.width - this.w) this.x = canvas.width - this.w;
    if (this.y <= 0) this.y = 1;
    if (this.y >= canvas.height - this.h) this.y = canvas.height - this.h;
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

  crashWith(enemy) {
    return !(
      this.bottom() < enemy.top() ||
      this.top() > enemy.bottom() ||
      this.right() < enemy.left() ||
      this.left() > enemy.right()
    );
  }
}

console.log("player JS is loaded");
