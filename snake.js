/**
 * Snake game
 * 
 * @author Brandon McAdoo
 * @version 1.0.1
 */


//the canvas to be drawn on top of
var canvas;
var ctx;
//the size of the canvas
var canvasWidth;

//var to keep the program running
var running;
//a var to end the refresh interval
var refreshIntervalId;

//array to hold the positions of the snake
var pos;
//the pos and size of the individual snake body pieces
var upperLeft;
var width;
//the speed that the snake moves
var speed;

//the x and y of the food
var foodX;
var foodY;

//the current direction
var lastPressed;




/**
 * Initializes the global variables and makes the first call to main
 */
function setup(){
    //initialize the canvas size
    canvasWidth = 400;

    //initialize the snake variables
    speed = 250
    width = canvasWidth / 20;
    upperLeft = [canvasWidth / 2 + 10, canvasWidth / 2 + 10];
    pos = [upperLeft];

    //initialize the logic variables
    running = true;
    lastPressed = 1;

    //initialize canvas
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //create the canvas
    ctx.fillStyle = 'grey'
    ctx.fillRect(10, 10, canvasWidth, canvasWidth); 
    ctx.closePath();    
    ctx.fill();

    

    //gets initial food pos
    getFoodPos();

    //starts game
    main();
}

/**
 * Calls move() every so many (speed) seconds
 */
function main(){
    //srarts the movement of the snale
    run();

    //recalls move() every so many seconds making the snake move.
    refreshIntervalId = setInterval(() => {
                            move()
                        }, speed);
}

/**
 * Redraws the background to clear the old snake and food.
 * Calls drawFood() to redraw the food.
 * Calls drawSnake to redraw the snake.
 */
function run(){
    //new background
    ctx.fillStyle = 'grey'
    ctx.fillRect(10, 10, canvasWidth, canvasWidth); 
    ctx.closePath();    
    ctx.fill();

    //draws food
    drawFood();
    //draws snake
    drawSnake();
}

/**
 * Draws the snake.
 */
function drawSnake(){
    //iterates through the entire pos array to draw every segment of the snake in white
    ctx.fillStyle = 'white'
    for(var i = 0; i < pos.length; i++){
        ctx.fillRect(pos[i][0], pos[i][1], width, width); 
    }
    ctx.closePath();    
    ctx.fill();
}

/**
 * Finds the position of the new snake head depending on what key was last pressed.
 * It either adds to the pos array or just moves the conents of the array 
 * depending on wether or not a piece of food was eaten.
 * It checks to see if the new pos of the head is outside of the play area or in the 
 * same place as another part of the snak body, and if so the snake dies.
 */
function move(){
    //creates a new array to hold the x and y position of the upper eft corner of the specified segment
    var newUpperLeft = [];

    //checks to see which direction the snake shold be heading and selects 
    //the new upperleft based off of the current x and y and direction
    // 1: up
    // 2: right
    // 3: down
    // 4: left
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


    //if the head of the snake is in the same pos as the food then it 
    //adds another segment to the snake to make it grow, otherwise it
    //shifts the array down and sets the head to the new position
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

    //checks to see if the snake is out of bounds or has hit itself
    death();

    //if the snake has moved into a legal space then the game continues
    //if the snake has moved to an illegal space then the game is stopped
    if(running){
        run();
    } else {
        clearInterval(refreshIntervalId);
        alert("You Died")
        window.location.href = "index.html";
    }

}

/**
 * Draws the pos of the food.
 */
function drawFood(){
    for(var i = 0; i < pos.length; i++){
        ctx.fillStyle = 'red'
        ctx.fillRect(foodX, foodY, width, width); 
        ctx.closePath();    
        ctx.fill();
    }
    
}

/**
 * Gets a new food pos if the food was eaten.
 * It checks to see if the new food location is on a snapce 
 * occupied by part of the snale and if so it looks for a new pos.
 */
function getFoodPos(){
    //gets a random position on the "grid" for the food
    var tempX = (getRandomInt(canvasWidth / width) * width) + 10;
    var tempY = (getRandomInt(canvasWidth / width) * width) + 10;

    //checks to make sure that the snake is not already occupying this space
    var legal = true;
    for(var i = 0; i < pos.length; i++){
        if(pos[i][0] == tempX && pos[i][1] == tempY){
            //console.log("Food generated inside snake body")
            getFoodPos();
            legal = false;
        }
    }
    if(legal){
        foodX = tempX;
        foodY = tempY;
    }



    
}

/**
 * A function to find a random int in between zero and max.
 * 
 * @param {} max the max int that the random will return
 * @returns 
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Checks to see if the head of the snake is out of bounds or if it has ran into itself.
 */
function death(){
    //checking for out of bounds
    for(var i = 0; i < pos.length; i++){
        if(pos[i][0] <= 0 || pos[i][1] <= 0 || pos[i][0] >= canvasWidth + 10 || pos[i][1] >= canvasWidth + 10 ){
            console.log("you died");
            running = false;
        }
    }

    //checking to see if the snake already occupies the new spot
    for(var i = 1; i < pos.length; i++){
        if(pos[0][0] == pos[i][0] && pos[0][1] == pos[i][1]){
            console.log("you died");
            running = false;
        }
    }
}

/**
 * The event listener to detect when a key is pressed.
 * The lastPresed var is updated to reflect the last input.
 */
document.addEventListener("keydown", (event) =>{
    //console.log("entered listener")
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
