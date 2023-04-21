
class Game {
  constructor(ctx,width,height,player) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    this.frames = 0;  // empty enemies array
    this.intervalId = null;
    this.enemies = [];
    
    

  }

    
  

start(){
  this.intervalId = setInterval(this.update, 10)
}
update = ()=>{
  this.frames++;
  this.clear();
  this.player.newPos();
  this.player.draw();
  this.updateEnemies();
  //this.checkGameOver();
}
//stops the game
stop(){
  clearInterval(this.intervalId);
}

clear(){
 this.ctx.clearRect(0, 0, this.width, this.height);
}



updateEnemies(){// spawn 10?? test to see how many make sense enemies randomly around the circle
  for (let i = 0; i < 10; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const x = this.centerX + this.radius * Math.cos(angle);
    const y = this.centerY + this.radius * Math.sin(angle);
    const enemy = new Enemy(x, y);
    this.enemies.push(enemy);
 
  } 
}

}
console.log("game JS is loaded");