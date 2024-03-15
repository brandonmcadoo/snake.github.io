var canvas;
var ctx;
var running;
var canvasWidth;

var pos;

var upperLeft;
var width;

var lastPressed;

var foodX;
var foodY;

var refreshIntervalId;
var speed;

function setup(){
    canvasWidth = 400;
    speed = 500

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    ctx.fillStyle = 'grey'
    ctx.fillRect(10, 10, canvasWidth, canvasWidth); 
    ctx.closePath();    
    ctx.fill();

    width = canvasWidth / 20;
    upperLeft = [canvasWidth / 2 + 10, canvasWidth / 2 + 10];
    pos = [upperLeft];

    running = true;
    lastPressed = 1;

    getFoodPos();

    main();
}

function main(){
    run();

    refreshIntervalId = setInterval(() => {
                            move()
                        }, speed);
}

function run(){
    ctx.fillStyle = 'grey'
    ctx.fillRect(10, 10, canvasWidth, canvasWidth); 
    ctx.closePath();    
    ctx.fill();

    drawFood();
    drawSnake();
}

function drawSnake(){
    ctx.fillStyle = 'white'
    for(var i = 0; i < pos.length; i++){
        ctx.fillRect(pos[i][0], pos[i][1], width, width); 
    }
    ctx.closePath();    
    ctx.fill();
}

function move(){
    var newUpperLeft = [];

    if (lastPressed == 1){
        newUpperLeft = [pos[pos.length - 1][0], pos[pos.length - 1][1] - width];
    }
    else if (lastPressed == 2){
        newUpperLeft = [pos[pos.length - 1][0] + width, pos[pos.length - 1][1]];
    }
    else if (lastPressed == 3){
        newUpperLeft = [pos[pos.length - 1][0], pos[pos.length - 1][1] + width];
    }
    else {
        newUpperLeft = [pos[pos.length - 1][0] - width, pos[pos.length - 1][1]];
    }



    if(newUpperLeft[0] == foodX && newUpperLeft[1] == foodY){
        pos.push(newUpperLeft);
        getFoodPos();
    } else {
        console.log(pos.length);
        for(var i = 0; i < pos.length - 1; i++){
            console.log("entered for loop");
            pos[i] = pos[i + 1];
        }
        pos[pos.length - 1] = newUpperLeft;
    }


    death();

    
    if(running){
        run();
    } else {
        clearInterval(refreshIntervalId);
        alert("You Died")
        window.location.href = "index.html";
    }

}

function drawFood(){
    for(var i = 0; i < pos.length; i++){
        ctx.fillStyle = 'red'
        ctx.fillRect(foodX, foodY, width, width); 
        ctx.closePath();    
        ctx.fill();
    }
    
}

function getFoodPos(){
    var tempX = (getRandomInt(canvasWidth / width) * width) + 10;
    var tempY = (getRandomInt(canvasWidth / width) * width) + 10;

    for(var i = 0; i < pos.length; i++){
        if(pos[i][0] == tempX && pos[i][1] == tempY){
            getFoodPos();
        }
    }

    foodX = tempX;
    foodY = tempY;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function death(){
    for(var i = 0; i < pos.length; i++){
        if(pos[i][0] <= 0 || pos[i][1] <= 0 || pos[i][0] >= canvasWidth + 10 || pos[i][1] >= canvasWidth + 10 ){
            console.log("you died");
            running = false;
        }
    }

    for(var i = 1; i < pos.length; i++){
        if(pos[0][0] == pos[i][0] && pos[0][1] == pos[i][1]){
            console.log("you died");
            running = false;
        }
    }
}

document.addEventListener("keydown", (event) =>{
    console.log("entered listener")
    var key = event.key;
    if(key == 'w' || key == 'ArrowUp'){
        lastPressed = 1;
    }
    else if(key == 'd' || key == 'ArrowRight'){
        lastPressed = 2;
    }
    else if(key == 's' || key == 'ArrowDown'){
        lastPressed = 3;
    }
    else if(key == 'a' || key == 'ArrowLeft'){
        lastPressed = 4;
    }
});
