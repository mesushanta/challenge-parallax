
const Player = document.getElementById('player');
const PlayerWrap = document.getElementById('player_wrap');
const Result = document.getElementById('result');
const ScoreWrap = document.getElementById('score_value');
const Restart = document.getElementById('restart');

const Trees = document.getElementById('trees');
const Ground = document.getElementById('ground');

const ScreenWidth = window.innerWidth;

const PlayerWidth = parseFloat(window.getComputedStyle(PlayerWrap, null).getPropertyValue("width"));
const PlayerHeight = parseFloat(window.getComputedStyle(PlayerWrap, null).getPropertyValue("height"));

const PlayerPosX = parseFloat(window.getComputedStyle(Player, null).getPropertyValue("left"));
const Obstacles = [
    'small_obstacle',
    'small_tall_obstacle',
    'small_tallest_obstacle',
    'medium_square_obstacle',
    'medium_tall_obstacle',
    'medium_wide_obstacle'
]
let automatic = true;
let posX = 0;
let posY = 230;
let keys = ['ArrowRight'];
let jump = false;
let fall = false;
let gameOver = false;
let score = 0;

let previous_obstacle = ''
let Obstacle = '';

let ObstacleWidth;
let ObstacleHeight;
let ObstaclePosX;
let MaxJump;

let new_obstacle = false;

document.addEventListener('keydown', function(event) {
    let key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if(key == 'ArrowRight') {
        if(!keys.includes("ArrowRight")) {
            keys.push('ArrowRight');
        }
    }
    if(key == 'ArrowLeft') {
        if(!keys.includes("ArrowLeft")) {
            keys.push('ArrowLeft');
        }
    }
    if(key == 'ArrowUp') {
        if(!keys.includes("ArrowUp")) {
            keys.push('ArrowUp');
        }
    }
    if(key == 'ArrowDown') {
        if(!keys.includes("ArrowDown")) {
            keys.push('ArrowDown');
        }
    }
});

document.addEventListener('keyup', function(event) {
    let key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown
    if(key != 'ArrowRight') {
        let index = keys.indexOf(key);
        keys.splice(index, 1);
    }
});

function run() {
    if(!gameOver) {
        updateRan();
        if(new_obstacle) {
            destroyObstacle();
            createObstacle();
        }
        getScore();
        updateTreePosition();
        updateGroundPosition();
        updateObstaclePosition();
        updatePlayer();
        isNotOver();

        setTimeout(run, 10);
    }
    else {
        Player.style.backgroundImage = "url('./assets/img/dead.gif')";
        Player.classList.remove('rotating');
        Result.style.opacity = 1;
        Restart.style.opacity = 1;
    }
}
function updatePlayer() {
    if(keys.length == 0) {
        Player.style.backgroundImage = "url('./assets/img/idle.gif')";
        Player.style.transform = "scaleX(1)";
    }
    Player.classList.remove("rotating");
    if(keys.includes("ArrowUp")) {
        Player.style.backgroundImage = "url('./assets/img/jump.gif')";
        // if(keys.includes("ArrowLeft")) {
        //     Player.style.transform = "scaleX(-1)";
        // }
        if(keys.includes("ArrowRight")) {
            Player.style.transform = "scaleX(1)";
        }
        jump = true;
    }
    // else if(keys.includes("ArrowLeft")) {
    //     Player.style.backgroundImage = "url('./assets/img/run.gif')";
    //     Player.style.transform = "scaleX(-1)";
    // }
    else if(automatic || keys.includes("ArrowRight")) {
        Player.style.backgroundImage = "url('./assets/img/run.gif')";
        Player.style.transform = "scaleX(1)";
    }
    MaxJump = 400;
    if(posY < MaxJump && jump && !fall) {
        Player.classList.add("rotating");
        posY += 2;
        if(posY == 400) {
            fall = true;
        }
    }
    else if(posY > 230 && jump && fall) {
        Player.classList.add("rotating");
        posY -= 2;
        if(posY == 230) {
            jump = false;
            fall = false;
        }
    }
    else {
        Player.classList.remove("rotating");
    }

    Player.style.bottom = posY+'px';
}
function updateTreePosition() {
    // if(keys.includes("ArrowLeft")) {
    //     posX += 1;
    // }
    if(automatic || keys.includes("ArrowRight")) {
        posX -= 2;
    }
    Trees.style.backgroundPosition = posX + 'px';
}

function updateGroundPosition() {
    // if(keys.includes("ArrowLeft")) {
    //     posX += 1;
    // }
    if(automatic || keys.includes("ArrowRight")) {
        posX -= 2;
    }
    Ground.style.backgroundPosition = posX + 'px';
}

function updateObstaclePosition() {
    // if(keys.includes("ArrowLeft")) {
    //     posX += 1;
    // }
    if(automatic || keys.includes("ArrowRight")) {
        ObstaclePosX -= 4;
    }
    Obstacle.style.left = ObstaclePosX+'px';
}

function isNotOver(){

    var playerPosY = parseFloat(window.getComputedStyle(Player, null).getPropertyValue("bottom"));
    var obstaclePosX = parseFloat(window.getComputedStyle(Obstacle, null).getPropertyValue("left"));
    if(
        ((obstaclePosX + ObstacleWidth >= PlayerPosX)) &&
        (obstaclePosX < PlayerPosX + PlayerWidth) &&
        (playerPosY < 250)
    )
    {
        gameOver = true;
    }

}
function  destroyObstacle() {
    if(Obstacle != '' && Obstacle != null) {
        Obstacle.remove();
    }
}
function createObstacle() {
    if(previous_obstacle != '' && previous_obstacle != null) {
        previous_obstacle.remove();
    }
    previous_obstacle = Obstacle;
    let div = document.createElement('div');
    let obstacle = Obstacles[Math.floor(Math.random() * Obstacles.length)];
    div.id = obstacle;
    console.log();
    ObstaclePosX =  ScreenWidth + Math.floor(randomNumberBetween(100,500));
    div.style.left = ObstaclePosX + 'px';
    document.body.appendChild(div);
    Obstacle = document.getElementById(obstacle);
    ObstacleWidth = parseFloat(window.getComputedStyle(Obstacle, null).getPropertyValue("width"));
    ObstacleHeight = parseFloat(window.getComputedStyle(Obstacle, null).getPropertyValue("height"));
    MaxJump = ObstacleHeight + 80;
}
function getScore() {
    if(keys.includes("ArrowRight")) {
        score += 1;
        ScoreWrap.innerHTML = score;
    }
}
// function randomFromArray(array) {
//      return array[Math.floor(Math.random()*array.length)];
// }
//
function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function updateRan() {
    if(automatic || keys.includes("ArrowRight")) {
        if(ObstaclePosX + ObstacleWidth < 0){
            new_obstacle = true;
        }
        else {
            new_obstacle = false;
        }
    }
}



function restart() {
    Result.style.opacity = 0;
    Restart.style.opacity = 0;
    gameOver = false;
    destroyObstacle()
    createObstacle();
    run();
}

Restart.addEventListener('click',restart);
destroyObstacle()
createObstacle();
run();
