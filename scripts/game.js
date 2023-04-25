class Game {
  constructor(ctx, canvas, width, height, player) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.player = player;
    this.frames = 0; // empty enemies array
    this.intervalId = null;
    this.enemies = [];
    this.bullets = [];
  }

  start() {
    this.intervalId = setInterval(this.update, 10);
  }

  update = () => {
    this.frames++;
    this.clear();
    this.updateShoot();
    this.player.newPos();
    this.player.draw();
    this.updateEnemies();
    for (let i = 0; i < this.enemies.length; i++) {
      //for loop to update all enemies position in the array
      this.enemies[i].newPos();
    }
    this.checkGameOver();
    console.log(this.bullets.length);
    console.log(this.enemies.length);
  };

  //stops the game
  stop() {
    clearInterval(this.intervalId);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw();
    }
    //spawn aleatório  de inimigos:
    let randomX = Math.floor(Math.random() * this.canvas.width);
    let randomY = Math.floor(Math.random() * this.canvas.height);
    let randomArray = [
      { x: 0, y: randomY },
      { x: this.canvas.width, y: randomY },
      { x: randomX, y: 0 },
      { x: randomX, y: this.canvas.height },
    ];

    let randomIndex = Math.floor(Math.random() * randomArray.length);
    let spritesArray = ["img/3.png", "img/4.jpg", "img/5.png"];
    let randomSprite = Math.floor(Math.random() * spritesArray.length);

    if (this.frames % 300 === 0) {
      //criação de enemies após x tempo

      this.enemies.push(
        new Enemy(
          randomArray[randomIndex].x,
          randomArray[randomIndex].y,
          30,
          30,
          5,
          this.ctx,
          spritesArray[randomSprite],
          this.shot,
          "Enemy",
          this.player
        )
      );
    }
  }

  shoot() {
    let x = this.player.x + this.player.w / 2;
    let y = this.player.y + this.player.h / 2;
    const bullet = new Bullet(x, y, 50, 50, ctx, lastKeyPress);
    console.log(bullet);
    this.bullets.push(bullet);
  }

  updateShoot() {
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].direction();
      this.bullets[i].newPos();
      this.bullets[i].draw();

      if (this.bullets[i].x > this.width) {
        this.bullets.splice(i, 1);
      }
    }
  }

  checkGameOver() {
    const crashed = this.enemies.some((enemy) => {
      return this.player.crashWith(enemy);
    });

    if(crashed){
    this.stop();
  }
}
}
console.log("game JS is loaded");
