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
    this.soundtrack.loop = true;
    //sound effects
    this.effects = new Audio("sounds/marisa_laugh.mp3");
    this.effects.loop = false;
    this.enemiesSound = [];
    this.bulletsImg = [];
    this.gameOverSound = new Audio("sounds/gameoversound.mp3");
  }

  start() {
    this.intervalId = setInterval(this.update, 10);
    this.soundtrack.play();
    this.soundtrack.volume = 0.3;

    let enemiesSound1 = new Audio("sounds/fatality.mp3");
    let enemiesSound2 = new Audio("sounds/wizardHarry.mp3");
    let enemiesSound3 = new Audio("sounds/humiliation.mp3");
    let enemiesSound4 = new Audio("sounds/headshot.mp3");
    let enemiesSound5 = new Audio("sounds/father.mp3");
    let enemiesSound6 = new Audio("sounds/scream.mp3");
    let enemiesSound7 = new Audio("sounds/back.mp3");
    this.enemiesSound.push(
      enemiesSound1,
      enemiesSound2,
      enemiesSound3,
      enemiesSound4,
      enemiesSound5,
      enemiesSound6,
      enemiesSound7
    );

    console.log(this.enemiesSound);
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
      "img/enemies1.png",
      "img/enemies2.png",
      "img/enemies3.png",
      "img/enemies4.png",
      "img/enemies5.png",
      "img/enemies6.png",
      "img/enemies7.png",
    ];

    let randomSprite = Math.floor(Math.random() * spritesArray.length);

    if (this.frames % 200 === 0) {
      //criação de enemies após x tempo
      const enemy = new Enemy(
        randomArray[randomIndex].x,
        randomArray[randomIndex].y,
        100,
        100,
        2,
        this.ctx,
        spritesArray[randomSprite],
        this.shot,
        "Enemy",
        this.player
      );
      this.enemies.push(enemy);
    }
    if (this.frames === 3517) {
      // Boss creation ( (x, y, width, height, hp, ctx, img, shot, enemyType, player))
      this.enemies.push(
        new Boss(
          randomArray[randomIndex].x,
          randomArray[randomIndex].y,
          180,
          180,
          30,
          this.ctx,
          spritesArray[randomSprite],
          this.shot,
          "Boss",
          this.player
        )
      );
      this.effects.play();
      this.effects.loop = true;
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
              this.win();
            }
          } else {
            if (this.enemies[j].hp > 1) {
              this.enemies[j].hp--;
            } else {
              this.enemies.splice(j, 1);
              let soundIndex = Math.floor(
                Math.random() * this.enemiesSound.length
              );
              this.enemiesSound[soundIndex].play();
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
    if (this.bullets.length === 0) {
      let player2 = new Image();
      player2.src = "img/player2.png";
      let player3 = new Image();
      player3.src = "img/player3.png";
      this.bulletsImg.push(player2, player3);
    }
    let x = this.player.x + this.player.w / 2;
    let y = this.player.y + this.player.h / 2;
    let imageIndex = Math.floor(Math.random() * this.bulletsImg.length);
    const bullet = new Bullet(
      x,
      y,
      50,
      50,
      ctx,
      lastKeyPress,
      this.bulletsImg[imageIndex]
    );
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
    player.x = 600;
    player.y = 300;

    document.getElementById("game-over").classList.remove("game-over-show");
    document.getElementById("win").classList.remove("win-show");
    document.getElementById("restart-button").style.display = "none";
    document.getElementById("restart-button2").style.display = "none";
  }

  checkGameOver() {
    const crashed = this.enemies.some((enemy) => {
      return this.player.crashWith(enemy);
    });

    if (crashed) {
      this.stop();
      this.soundtrack.pause();
      this.soundtrack.currentTime = 0;
      this.effects.pause();
      this.effects.currentTime = 0;
      this.gameOverSound.play();
    }
  }

  win() {
    this.soundtrack.pause();
    this.soundtrack.currentTime = 0;
    this.effects.pause();
    this.soundtrack.currentTime = 0;

    clearInterval(this.intervalId);
    document.getElementById("win").classList.add("win-show");
    document.getElementById("restart-button2").style.display = "block";
  }
}
