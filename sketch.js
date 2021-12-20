var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  //PASO 3 GAME OVER


  //PADO 4 RESTART


  //PASO 5 SCALES


  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //crear grupos de obstáculos y nube
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hola" + 5);
  
  trex.setCollider("circle",0,0,40);
  trex.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //mostrar la puntuación
  text("Puntuación: "+ score, 500,50);
  
  console.log("esto es",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //mover suelo
    ground.velocityX = -4;
    //puntuación
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //hacer que el Trex salte al presionar la barra espaciadora
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -12;
    }
    
    //agregar gravedad
    trex.velocityY = trex.velocityY + 0.8
  
    //aparecer nubes
    spawnClouds();
  
    //aparecer obstáculos en el suelo
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     console.log("hey")
     //PASO 6 VISIBLES

     
      ground.velocityX = 0;
      trex.velocityY = 0
     
      //cambiar la animación del trex.PASO 1

     
      //establecer tiempo de vida a los objetos del juego para que nunca se destruyan PASO 2

     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
  //evitar que el trex caiga
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    //generar obstáculos aleatorios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //asignar tamaño y tiempo de vida al obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //agregar cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //escribir aquí el código para aparecer las nubes 
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //asignar tiempo de vida a la variable
    cloud.lifetime = 134;
    
    //ajustar profundidad.
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //agregar nubes al grupo.
   cloudsGroup.add(cloud);
    }
}

