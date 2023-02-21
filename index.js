//game constant and variable
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('foodsound.mp3');
const gameOverSound = new Audio('gameOver.mp3');
const moveSound = new Audio('notif.mp3');
const musicSound = new Audio('snakeGame.mp3');
let speed = 4;
let score = 0;
let snake;
let lastPaintTime = 0;
let snakearr = [{ x: 13, y: 15 }]
let food = { x: 6, y: 7 };
let highscoreval =0;



//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
       // console.log(ctime);
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    
}
function iscollide(snake){
    // if you bump or touch yourself
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
           return true;
        }
        
    }

        // if you touches or bump into the wall
        if(snake[0].x >=22 || snake[0].x<=0 && snake[0].y >=22 || snake[0].y<=0){
            return true;
        }
        return false;
    
}

function gameEngine() {
    // part 1: upadting the snake varible or arry
  if(iscollide(snakearr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0};
    alert("GameOver. Press any key to pay AGAIN!");
    snakearr = [{x:13 ,y:15}];
    musicSound.play();
    score =0;
  }


// if you have eaten the food, increament the food and regenerate the foood
if(snakearr[0].y === food.y && snakearr[0].x === food.x ){
    foodSound.play();
    score+=1;
    if(score > highscoreval){
        highscoreval = score;
        localStorage.setItem("highscore", JSON.stringify(highscoreval)) ;
        highscoreBox.innerHTML = "High Score: 0"+ highscoreval;
    }
    scoreBox.innerHTML = "Score:"+ score;
    snakearr.unshift({x:snakearr[0].x + inputDir.x, y:snakearr[0].y + inputDir.y});
    let a = 2;
    let b =20;
    food ={x: Math.round(a +(b-a)*Math.random()),y: Math.round(a +(b-a)*Math.random())}
}




// Moving the snake
for (let i = snakearr.length-2; i >=0; i--){
    
   snakearr[i+1] = {...snakearr[i]};

}

snakearr[0].x += inputDir.x;
snakearr[0].y += inputDir.y; 



    // part 2: render or display the snake 
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // y= row pr x = column


        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });




    // part 3: display food


    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    // y= row pr x = column

    foodElement.classList.add('food');
    board.appendChild(foodElement);

}















//main logic start here
let highscore = localStorage.getItem("highscore");
if(highscore === null){ 
   
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score: "+ highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }// strt the game
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x =0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x =0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x =1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x =-1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
