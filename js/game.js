
const Player = document.getElementById('player');
const PlayerWrap = document.getElementById('player_wrap');
const Result = document.getElementById('result');
const ScoreWrap = document.getElementById('score_value');

const Trees = document.getElementById('trees');
const Ground = document.getElementById('ground');
const Obstacle = document.getElementById('obstacle');

const PlayerWidth = parseFloat(window.getComputedStyle(PlayerWrap, null).getPropertyValue("width"));
const PlayerHeight = parseFloat(window.getComputedStyle(PlayerWrap, null).getPropertyValue("height"));
const ObstacleWidth = parseFloat(window.getComputedStyle(Obstacle, null).getPropertyValue("width"));
const ObstacleHeight = parseFloat(window.getComputedStyle(Obstacle, null).getPropertyValue("height"));

const PlayerPosX = parseFloat(window.getComputedStyle(Player, null).getPropertyValue("left"));

let posX = 1000;
let posY = 230;
let keys = [];
let jump = false;
let fall = false;
let gameOver = false;
let score = 0;

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
    let index = keys.indexOf(key);
    keys.splice(index, 1);
});

function run() {
    if(!gameOver) {
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
        Result.style.opacity = 1;
    }
}
function updatePlayer() {
    if(keys.length == 0) {
        Player.style.backgroundImage = "url('./assets/img/idle.gif')";
        Player.style.transform = "scaleX(1)";
    }

    if(keys.includes("ArrowUp")) {
        Player.style.backgroundImage = "url('./assets/img/jump.gif')";
        if(keys.includes("ArrowLeft")) {
            Player.style.transform = "scaleX(-1)";
        }
        if(keys.includes("ArrowRight")) {
            Player.style.transform = "scaleX(1)";
        }
        jump = true;
    }
    else if(keys.includes("ArrowLeft")) {
        Player.style.backgroundImage = "url('./assets/img/run.gif')";
        Player.style.transform = "scaleX(-1)";
    }
    else if(keys.includes("ArrowRight")) {
        Player.style.backgroundImage = "url('./assets/img/run.gif')";
        Player.style.transform = "scaleX(1)";
    }

    if(posY < 400 && jump && !fall) {
        posY += 2;
        if(posY == 400) {
            fall = true;
        }
    }
    if(posY > 230 && jump && fall) {
        posY -= 2;
        if(posY == 230) {
            jump = false;
            fall = false;
        }
    }
    Player.style.bottom = posY+'px';
}
function updateTreePosition() {
    if(keys.includes("ArrowLeft")) {
        posX += 1;
    }
    if(keys.includes("ArrowRight")) {
        posX -= 1;
    }
    Trees.style.backgroundPosition = posX + 'px';
}

function updateGroundPosition() {
    if(keys.includes("ArrowLeft")) {
        posX += 1;
    }
    if(keys.includes("ArrowRight")) {
        posX -= 1;
    }
    Ground.style.backgroundPosition = posX + 'px';
}

function updateObstaclePosition() {
    if(keys.includes("ArrowLeft")) {
        posX += 1;
    }
    if(keys.includes("ArrowRight")) {
        posX -= 1;
    }
    Obstacle.style.left = posX+'px';
}

function isNotOver(){

        var playerPosY = parseFloat(window.getComputedStyle(Player, null).getPropertyValue("bottom"));
        var obstaclePosX = parseFloat(window.getComputedStyle(Obstacle, null).getPropertyValue("left"));
    console.log(playerPosY);
        if(
            ((obstaclePosX + ObstacleWidth >= PlayerPosX)) &&
            (obstaclePosX < PlayerPosX + PlayerWidth) &&
            (playerPosY < 250)
        )
        {
            gameOver = true;
        }

}

function getScore() {
    score += 1;
    ScoreWrap.innerHTML = score;
}
run();
