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
    this.score = 0;
    //background music
    this.soundtrack = new Audio("sounds/Cuphead_OST_-_Botanic_Panic_Music.mp3");
    this.soundtrack.loop = false;
    //sound effects
    this.effects = new Audio("sounds/Cuphead_OST_-_Botanic_Panic_Music.mp3");
    this.effects.loop = false;
  }

  start() {
    this.intervalId = setInterval(this.update, 10);
    this.soundtrack.play();
  }

  update = () => {
    this.frames++;
    this.clear();
    this.updateScore();
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
    document.getElementById("game-over").classList.add("game-over-show");
    document.getElementById("restart-button").style.display = "block";
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
    let spritesArray = [
      "img/Renato.png",
      "img/Robson.png",
      "img/Roshan.png",
      "img/Pedro.png",
      "img/Nuno.png",
      "img/Margarida.png",
      "img/Lucas.png",
      "img/Joe.png",
      "img/João C.png",
      "img/Henrique.png",
      "img/Gustavo.png",
      "img/Guglielmo.png",
      "img/Francisco .png",
      "img/Erik.png",
      "img/Elnaz.png",
      "img/Chris.png",
    ];

    let randomSprite = Math.floor(Math.random() * (spritesArray.length - 1));

    if (this.frames % 200 === 0) {
      //criação de enemies após x tempo
      const enemy = new Enemy(
        randomArray[randomIndex].x,
        randomArray[randomIndex].y,
        30,
        30,
        2,
        this.ctx,
        spritesArray[randomSprite],
        this.shot,
        "Enemy",
        this.player
      );
      this.enemies.push(enemy);
    }
    if (this.frames === 3000) {
      // Boss creation ( (x, y, width, height, hp, ctx, img, shot, enemyType, player))
      this.enemies.push(
        new Boss(
          randomArray[randomIndex].x,
          randomArray[randomIndex].y,
          10,
          50,
          50,
          this.ctx,
          spritesArray[randomSprite],
          this.shot,
          "Boss",
          this.player
        )
      );
    }

    //Clearing Enemies and Boss
    for (let i = 0; i < this.bullets.length; i++) {
      for (let j = 0; j < this.enemies.length; j++) {
        if (this.bullets[i].crashWith(this.enemies[j])) {
          if (this.enemies[j].enemyType === "Boss") {
            if (this.enemies[j].hp > 1) {
              this.enemies[j].hp--;
            } else {
              this.enemies.splice(j, 1);
              this.stop();
            }
          } else {
            if (this.enemies[j].hp > 1) {
              this.enemies[j].hp--;
            } else {
              this.enemies.splice(j, 1);
            }
          }

          this.bullets.splice(i, 1);
        }
      }
    }
  }

  updateScore() {
    this.score++;
    ctx.fillStyle = "black";
    ctx.font = "30px Helvetica";
    ctx.fillText(`Score: ${this.score}`, 20, 100);
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

      if (
        this.bullets[i].x > this.width ||
        this.bullets[i].x < 0 ||
        this.bullets[i].y > this.height ||
        this.bullets[i].y < 0
      ) {
        this.bullets.splice(i, 1);
      }
    }
  }

  newGame() {
    this.frames = 0;
    this.score = 0;
    this.enemies = [];
    this.bullets = [];
    this.start();

    document.getElementById("game-over").classList.remove("game-over-show");
    document.getElementById("restart-button").style.display = "none";
  }

  checkGameOver() {
    const crashed = this.enemies.some((enemy) => {
      return this.player.crashWith(enemy);
    });

    if (crashed) {
      this.stop();
      this.soundtrack.pause();
      this.soundtrack.currentTime = 0;
    }
  }
}
