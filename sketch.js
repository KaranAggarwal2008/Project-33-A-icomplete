var dog, database;
var foodLeft;
var dogIMG;
var dogIMGtrouble;

function preload(){
dogIMG = loadImage("dogImg.png");
dogIMGtrouble = loadImage("dogImg1.png")
}
function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  dog = createSprite(250,250,10,10);
  dog.shapeColor = "red";


  var dogfoodLeft = database.ref('dog/food');
  dogfoodLeft.on("value", readfoodLeft, showError);
}

function draw(){
  background("white");
   if(keyDown(UP_ARROW)){
     //i
     if(foodLeft.x<=0){
      foodLeft.x = 0;
      dog.addImage(dogIMG)
     }else{
       writefoodLeft(-1)
       dog.addImage(dogIMGtrouble)
     }
     //i
    }else{
      dog.addImage(dogIMG)
    }
    drawSprites();
  textSize(20)
  text("Press up arrow to feed Tommy 1 litre of milk",200,200)
  text("Milk left: "+foodLeft.x+"Litres of milk left",150,150)
}

function writefoodLeft(x){
  database.ref('dog/food').set({
    'x': foodLeft.x + x ,
  })
}

function readfoodLeft(data){
  foodLeft = data.val();
  console.log(foodLeft.x);
  dog.x = foodLeft.x;
  dog.y = foodLeft.y;
}

function showError(){
  console.log("Error in writing to the database");
}


