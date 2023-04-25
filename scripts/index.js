const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start");

//creating our player

const player = new Player(600, 300, 250, 250, ctx);
const game = new Game(ctx, canvas, canvas.width, canvas.height, player);
//start button on Click
startButton.onclick = function () {
  console.log("starting");

  game.start();
};

let lastKeyPress = "right";

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      player.speedY = -5;
      lastKeyPress = "up";
      break;

    case "ArrowDown":
      player.speedY = 5;
      lastKeyPress = "down";
      break;

    case "ArrowLeft":
      player.speedX = -5;
      lastKeyPress = "left";
      break;

    case "ArrowRight":
      player.speedX = 5;
      lastKeyPress = "right";
      break;

    case "Space":
      game.shoot();
      break;
  }
});

document.addEventListener("keyup", (e) => {
  player.speedX = 0;
  player.speedY = 0;
});

console.log("Index JS is loaded");
