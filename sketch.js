var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghostImg2;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var gameOverImg;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostImg2 = loadImage("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
  gameOverImg = loadImage("download (5).png");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
}

function draw(){
  background(0);
  if (gameState === "play") {

    ghost.addImage("ghost", ghostImg);

    if(keyDown("space")){
      ghost.velocityY = -10;
      ghost.addImage("ghost", ghostImg2);
    }

    if(keyDown("left_arrow")){
      ghost.x -= 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x += 3;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8;
     
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    background(gameOverImg);
  }

}

function spawnDoors() {

  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velocityY = 1;
    climber.velocityY = 1;

    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

