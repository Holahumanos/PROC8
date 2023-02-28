var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["5f9f9d92-1a4e-4ed1-9975-abf6b672d09e"],"propsByKey":{"5f9f9d92-1a4e-4ed1-9975-abf6b672d09e":{"name":"ficha","sourceUrl":"assets/v3/animations/1reRZ1HrYfbEwUkurj46h8FYpjUC8y8G8sS-7XVDRBI/5f9f9d92-1a4e-4ed1-9975-abf6b672d09e.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":".QpDNQVtjQyO3p7Mckb83s2kBTbxNL4p","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/1reRZ1HrYfbEwUkurj46h8FYpjUC8y8G8sS-7XVDRBI/5f9f9d92-1a4e-4ed1-9975-abf6b672d09e.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerMallet;

var goal1=createSprite(200,18,100,20);
goal1.shapeColor=("white");

var goal2=createSprite(200,382,100,20);
goal2.shapeColor=("white");


// hacer la cancha
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";



// crear objetos y asignarles colores
var striker = createSprite(200,200,10,10);
striker.shapeColor = "white";

var playerMallet = createSprite(200,50,50,10);
playerMallet.shapeColor = "black";

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "black";

// variables de puntuación
var playerScore=0;
var compScore=0;
var gameState="serve";

function draw() {
  // despejar la pantalla
  background("blue");
  
   if(gameState == "serve")
  {
     textSize(20);
     stroke("skyblue");
     text ("presiona espacio para empezar",30,133);
   if (keyDown("space")) {
    serve();
      
    gameState="play";
  }
  }
  if(gameState == "play")
  {
     paddleMovement();
    if( playerScore==5||compScore==5){
      gameState="end";
    }
    if(keyWentUp("space")){
      serve();
    }
  }
  if ( gameState == "end")
  {
    striker.velocityX=0;
    striker.velocityY=0;
    if (playerScore==5){
    textSize(20);
    stroke("skyblue");
    text("ganó el jugador",30,133);
    }
    if (compScore==5){
      textSize(20);
      stroke("skyblue");
      text("ganó la computadora",30,133);
    }
  }
  
  striker.setAnimation("ficha");
  striker.scale=0.1;
  
  if (striker.isTouching(playerMallet)||striker.isTouching(computerMallet))
  {
  playSound("assets/category_digital/bounce_2.mp3");
 }
 
 if (striker.isTouching(goal1)||striker.isTouching(goal2))
  {
  playSound("assets/category_bell/short_bell_alert.mp3");
 }
  
  // mostrar las variables compScore  y playerScore
  textSize(18);
  fill("white");
  text("0"+compScore,25,225);
  text("0"+playerScore,25,185);
  
  // puntuación
  
     if(striker.isTouching(goal1))
      { // incrementar la puntuación del jugador
        compScore = compScore+1 ;
        //mostrar la cuadrícula para identificar el valor de x e y para mover al delantero al centro
        striker.x=199;
        striker.y=201;
        striker.velocityX=0;
        striker.velocityY=0;
      }
      
      if(striker.isTouching(goal2))
      {
        playerScore =  + 1;
        // Reiniciar al delantero al agregar el valor central de x e y 
        striker.x=199;
        striker.y=201;
        striker.velocityX=0;
        striker.velocityY=0;
      }
      
   
      //agregar la condición para comprobar si la puntuación de un jugador llega a 5
/*      if (playerScore==5)
      {
        fill("maroon");
        textSize(18);
        //agregar el texto de fin del juego
        text("el jugador ha ganado",170,160);
      }
 if (compScore==5)
      {
        fill("maroon");
        textSize(18);
        //agregar el texto de fin del juego
        text("la computadora ha ganado",170,160);
      }
 */
  
  //make the player paddle move with the Arrow keys
 // paddleMovement();
  
  
  //IA para la paleta de la computadora
  //hacer que se mueva con la posición y del delantero
  computerMallet.x = striker.x;

  
  //dibujar la línea al centro
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  //crear límites de bordes
  //hacer que el delantero rebote con el borde superior e inferior
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);

  
  //servir al delantero cuando se presiona la barra espaciadora
 /* if (keyDown("space")) {
    serve();
  }
  */
 
  drawSprites();
}



























function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  }
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+10;
    
  }
  
  if(keyDown("up")){
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  
  if(keyDown("down")){
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y+10;
   }
  }
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
