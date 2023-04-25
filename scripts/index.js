const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start");

//creating our player

const player = new Player(600, 300, 250, 250, ctx);

//start button on Click
startButton.onclick = function () {
  console.log("starting");
  const game = new Game(ctx, canvas, canvas.width, canvas.height, player);
  game.start();
};

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      player.speedY = -5;
      break;

    case "ArrowDown":
      player.speedY = 5;
      break;

    case "ArrowLeft":
      player.speedX = -5;
      break;

    case "ArrowRight":
      player.speedX = 5;
      break;
  }
});
document.addEventListener("keyup", () => {
  player.speedX = 0;
  player.speedY = 0;
});

console.log("Index JS is loaded");
