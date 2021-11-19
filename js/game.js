
const Player = document.getElementById('player');
const PlayerWrap = document.getElementById('player_wrap');
const Result = document.getElementById('result');
const ScoreWrap = document.getElementById('score_value');
const Restart = document.getElementById('restart');

const Trees = document.getElementById('trees');
const Ground = document.getElementById('ground');
const Clouds1 = document.getElementById('distint_clouds');
const Clouds2 = document.getElementById('close_clouds');
const Hills = document.getElementById('hills');
const Bushes = document.getElementById('bushes');

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
];

let automatic = true;

let posX = 0;
let posY = 230;
let cloudPosX = 0;
let hillsPosX = 0;
let coinsPosX = 0;
let keys = [];
let jump = false;
let fall = false;
let gameOver = false;
let score = 0;

let previous_obstacle = '';
let Obstacle;
let previous_coins = '';
let Coins;

let ObstacleWidth;
let ObstacleHeight;
let ObstaclePosX;
let MaxJump;
let CoinsWidth;

let new_obstacle = false;
let new_coins = false;

document.addEventListener('keydown', function(event) {
    event.preventDefault();
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
    // if(key != 'ArrowRight') {
        let index = keys.indexOf(key);
        keys.splice(index, 1);
    // }
});

function run() {
    if(!gameOver) {
        updateRan();
        if(new_obstacle) {
            destroyObstacle();
            createObstacle();
        }
        updateCoins();
        if(new_obstacle) {
            destroyCoins();
            createCoins();
        }
        getScore();
        updateTreePosition();
        updateGroundPosition();
        updateObstaclePosition();
        updatePlayer();
        updateClouds1Position();
        updateClouds2Position();
        updateHillsPosition();

        updateCoinsPosition();
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
    if(keys.length == 0  && !automatic) {
        Player.style.backgroundImage = "url('./assets/img/idle.gif')";
        Player.style.transform = "scaleX(1)";
    }
    Player.classList.remove("rotating");
    if(keys.includes("ArrowUp")) {
        Player.style.backgroundImage = "url('./assets/img/jump.gif')";
        // if(keys.includes("ArrowLeft")) {
        //     Player.style.transform = "scaleX(-1)";
        // }
        if(automatic) {
            Player.style.transform = "scaleX(1)";
        }
        jump = true;
    }
    // else if(keys.includes("ArrowLeft")) {
    //     Player.style.backgroundImage = "url('./assets/img/run.gif')";
    //     Player.style.transform = "scaleX(-1)";
    // }
    else if(automatic) {
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
    if(automatic) {
        posX -= 2;
    }
    Trees.style.backgroundPosition = posX + 'px';
}
function updateHillsPosition() {
    // if(keys.includes("ArrowLeft")) {
    //     posX += 1;
    // }
    if(automatic) {
        hillsPosX -= 0.8;
    }
    Hills.style.backgroundPosition = hillsPosX + 'px';
    Bushes.style.backgroundPosition = hillsPosX + 'px';

}

function updateClouds1Position() {
    // if(keys.includes("ArrowLeft")) {
    //     posX += 1;
    // }
    if(automatic) {
        cloudPosX -= 0.2;
    }
    Clouds1.style.backgroundPosition = cloudPosX + 'px';
}

function updateClouds2Position() {
    // if(keys.includes("ArrowLeft")) {
    //     posX += 1;
    // }
    if(automatic) {
        cloudPosX -= 0.5;
    }
    Clouds2.style.backgroundPosition = cloudPosX + 'px';
}

function updateGroundPosition() {
    // if(keys.includes("ArrowLeft")) {
    //     posX += 1;
    // }
    if(automatic) {
        posX -= 2;
    }
    Ground.style.backgroundPosition = posX + 'px';
}

function updateObstaclePosition() {
    // if(keys.includes("ArrowLeft")) {
    //     posX += 1;
    // }
    if(automatic) {
        ObstaclePosX -= 4;
    }
    Obstacle.style.left = ObstaclePosX+'px';
}

function updateCoinsPosition() {
    // if(keys.includes("ArrowLeft")) {
    //     posX += 1;
    // }
    if(automatic) {
        coinsPosX -= 4;
    }
    Coins.style.left = coinsPosX+'px';
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
function destroyObstacle() {
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
    ObstaclePosX =  ScreenWidth + Math.floor(randomNumberBetween(100,300));
    div.style.left = ObstaclePosX + 'px';
    document.body.appendChild(div);
    Obstacle = document.getElementById(obstacle);
    ObstacleWidth = parseFloat(window.getComputedStyle(Obstacle, null).getPropertyValue("width"));
    ObstacleHeight = parseFloat(window.getComputedStyle(Obstacle, null).getPropertyValue("height"));
    MaxJump = ObstacleHeight + 80;
}
function getScore() {
    if(automatic) {
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
    if(automatic) {
        if(ObstaclePosX + ObstacleWidth < 0){
            new_obstacle = true;
        }
        else {
            new_obstacle = false;
        }
    }
}

function updateCoins() {
    if(automatic) {
        if(coinsPosX < 0){
            new_coins = true;
        }
        else {
            new_coins = false;
        }
    }
}

function destroyCoins() {
    if(Coins != '' && Coins != null) {
        Coins.remove();
    }
}
function createCoins() {
    coinsPosX =  ScreenWidth + Math.floor(randomNumberBetween(400,800));
    let div = document.createElement('div');
    div.id = 'coins';
    div.style.left = coinsPosX + 'px';
    document.body.appendChild(div);
    coinElements();
}

function coinElements() {
    let count = Math.floor(randomNumberBetween(3,7));
    for(let i=0; i<count; i++) {
        let coin_div = document.createElement('div');
        coin_div.classList.add('coin');
        document.getElementById("coins").appendChild(coin_div);
    }
    Coins = document.getElementById("coins");
    CoinsWidth = count * 45;

}


function restart() {
    Result.style.opacity = 0;
    Restart.style.opacity = 0;
    gameOver = false;
    destroyObstacle()
    createObstacle();
    destroyCoins()
    createCoins();
    score = 0;
    run();
}


Restart.addEventListener('click',restart);
destroyObstacle()
createObstacle();
createCoins();
run();
