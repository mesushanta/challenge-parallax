
const Player = document.getElementById('player');

const Trees = document.getElementById('trees');
const Ground = document.getElementById('ground');
const Obstacle = document.getElementById('obstacle');

let posX = 100;
let posY = 230;
let keys = [];
let jump = false;
let fall = false;
let gameOver = false;

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
    updateTreePosition();
    updateGroundPosition();
    updateObstaclePosition();
    setTimeout(updatePlayer, 10);
    setTimeout(run, 50);
}
function updatePlayer() {
    Player.style.bottom = posY+'px';
    if(keys.length == 0) {
        Player.style.backgroundImage = "url('./assets/img/idle.gif')";
        Player.style.transform = "scaleX(1)";
    }
    if(keys.includes("ArrowLeft")) {
        Player.style.backgroundImage = "url('./assets/img/run.gif')";
        Player.style.transform = "scaleX(-1)";
    }
    if(keys.includes("ArrowRight")) {
        Player.style.backgroundImage = "url('./assets/img/run.gif')";
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
        if(
            (!keys.includes("ArrowLeft") && !keys.includes("ArrowLeft"))
            || (keys.includes("ArrowLeft") && keys.includes("ArrowLeft"))
        ) {
            Player.style.backgroundImage = "url('./assets/img/idle.gif')";
            Player.style.transform = "scaleX(1)";
        }
        jump = true;
    }

    if(posY < 350 && jump && !fall) {
        posY += 10;
        if(posY == 350) {
            fall = true;
        }
    }
    if(posY > 230 && jump && fall) {
        posY -= 10;
        if(posY == 230) {
            jump = false;
            fall = false;
        }
    }
}
function updateTreePosition() {
    if(keys.includes("ArrowLeft")) {
        posX += 5;
    }
    if(keys.includes("ArrowRight")) {
        posX -= 5;
    }
    Trees.style.backgroundPosition = posX + 'px';
}

function updateGroundPosition() {
    if(keys.includes("ArrowLeft")) {
        posX += 5;
    }
    if(keys.includes("ArrowRight")) {
        posX -= 5;
    }
    Ground.style.backgroundPosition = posX + 'px';
}

function updateObstaclePosition() {
    if(keys.includes("ArrowLeft")) {
        posX += 5;
    }
    if(keys.includes("ArrowRight")) {
        posX -= 5;
    }
    Obstacle.style.left = posX+'px';
}

run();
