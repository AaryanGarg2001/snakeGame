var direction ={
    x: 0,
    y: 0
};
var score=0;
var snakeArr=[{x:13,y:15}];
var musicSound=new Audio('music/music.mp3');
let a = 2;
let b = 16;
var food ={x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};

// game functions
function main(){
    var speed=300-10*score;
    speed=Math.max(speed,90);
    setTimeout(gameEngine,speed);
}

function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }

    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        new Audio('music/gameover.mp3').play();
        musicSound.pause();
        direction =  {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        new Audio('music/food.mp3').play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            $('.hiscore').innerHTML = "HiScore: " + hiscoreval;
        }
        $('.score').innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y});
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('body');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
    main();

}


// game loop

// musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    $('hiscore').innerHTML = "HiScore: " + hiscore;
}

main();
$(document).keydown(function(event){
    direction={x:1,y:0}; //start the game
    new Audio('music/move.mp3').play();
    switch(event.key){
        case "ArrowUp":
            direction={x:0,y:-1};
            break;
        case "ArrowDown":
            direction={x:0,y:1};
            break;
        case "ArrowLeft":
            direction={x:-1,y:0};
            break;
        case "ArrowRight":
            direction={x:1,y:0};
            break;
    }
});
