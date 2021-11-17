const player = document.getElementById('player');
const trees = document.getElementById('trees');
const ground = document.getElementById('ground');
const player_initial_posX = player.style.backgroundPositionX;
const player_initial_posY = player.style.backgroundPositionY;

player_posX = 0;
player_PosY = 0;

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        // up
        jump();
        console.log('up');
    }
    else if (e.keyCode == '40') {
        // down
        slide();
    }
    else if (e.keyCode == '37') {
        // left
        moveLeft();
    }
    else if (e.keyCode == '39') {
        // Right
        moveRight();
    }
}
 function  jump() {
    console.log('jump');
 }
function  slide() {
    console.log('slide');
}
function  moveLeft() {
    ground.style.backgroundPositionX = '200px';
    console.log('move left');
}
function  moveRight() {
    console.log('move right');
}