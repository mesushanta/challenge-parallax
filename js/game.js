
const Player = document.getElementById('player');

const Trees = document.getElementById('trees');
const Ground = document.getElementById('ground');
const Obstacle = document.getElementById('obstacle');

var posX = 0;
var keys = [];

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
    if(key == 'ArrowUP') {
        if(!keys.includes("ArrowUP")) {
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
    setTimeout(run, 50);
}
function updatePlayer() {
    if(!keys.includes("ArrowLeft")) {
        Player.style.transform = "rotate(7deg)";
    }
    if(!keys.includes("ArrowRight")) {
        Player.style.transform = "rotate(7deg)";
    }
    if(!keys.includes("ArrowUp")) {
        Player.style.backgroundImage = "url('../')";
    }
}
function updateTreePosition() {
    if(!keys.includes("ArrowLeft")) {
        posX -= 10;
    }
    if(!keys.includes("ArrowRight")) {
        posX += 10;
    }
    Trees.style.backgroundPosition = posX + 'px';
}

function updateGroundPosition() {
    if(!keys.includes("ArrowLeft")) {
        posX -= 10;
    }
    if(!keys.includes("ArrowRight")) {
        posX += 10;
    }
    Ground.style.backgroundPosition = posX + 'px';
}

function updateObstaclePosition() {
    if(!keys.includes("ArrowLeft")) {
        posX -= 10;
    }
    if(!keys.includes("ArrowRight")) {
        posX += 10;
    }
    Obstacle.style.left = posX+'px';
}

run();
