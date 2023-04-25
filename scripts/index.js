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
    
    case "KeyW":
      player.shootPressedW = true;
      break;
    case "KeyA":
      player.shootPressedA = true;
      break;
    case "KeyD":
      player.shootPressedD = true;
      break;
    case "KeyS":
      player.shootPressedS = true;
      break;
  }
});
document.addEventListener("keyup", (e) => {
  player.speedX = 0;
  player.speedY = 0;
  
  switch (e.code) {
  case "KeyW":
    this.shootPressed = false;
    break;
  case "KeyA":
    this.shootPressed = false;
    break;
  case "KeyD":
    this.shootPressed = false;
    break;
  case "KeyS":
    this.shootPressed = false;
    break;
  }


});

console.log("Index JS is loaded");
