const LEFT_SIDE = 0;
const RIGHT_SIDE = 1000;
const TOP_SIDE = 0;
const BOTTOM_SIDE = 404;

const playerLevel = document.querySelector('#player-level');
const playerHeart = document.querySelector('#player-heart');
const heart1 = document.querySelector('#heart1');
const heart2 = document.querySelector('#heart2');
const heart3 = document.querySelector('#heart3');

const playerStar = document.querySelector('#player-star');
const star1 = document.querySelector('#star1');
const star2 = document.querySelector('#star2');
const star3 = document.querySelector('#star3');

const winningBg = document.querySelector('#winning-bg');
const nextLevel = document.querySelector('#next-level');
const winningLevel = document.querySelector('#winning-level');

const instructionsBg = document.querySelector('#instructions-bg');

let isGameStarted = false;
// the number of hearts
let heart = 3;
// the current level of the game
let currentLevel = 1;
let countMovies = 0;
// Sound effect
let gameSoundDeath;
// Sound effect
let gameSoundDies;
// Music
let music;

let spaceKeyUp = false;

// Enemies our player must avoid
const Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (isGameStarted) {
        if (this.x < 1006) {
            this.x += (this.speed * currentLevel / 5) * dt;
        } else {
            this.x = -98;
        }
        // this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y
        if (player.x > (this.x - 80) && player.x < (this.x + 80) && player.y > (this.y - 80) && player.y < (this.y + 80)) {
            gameSoundDeath = new Audio('sounds/Asteroids_Death.wav');
            gameSoundDies = new Audio('sounds/Burgertime_Dies.wav');
            if (heart === 3) {
                heart3.remove();
                gameSoundDeath.play();
            }

            if (heart === 2) {
                heart2.remove();
                gameSoundDeath.play();
            }

            if (heart === 1) {
                heart1.remove();
                gameSoundDies.play();
            }

            heart--;
            player.resetGame();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.\
const Player = function () {
    this.x = 503;
    this.y = 405;
    this.sprite = 'images/char-boy.png';
    playerLevel.textContent = `Level ${currentLevel}`;
};

// Now instantiate your objects.
// 1st enemy object - starts from x = -98, y = 62 and speed = 150
const enemy1 = new Enemy(-98, 62, 150);
// 2nd enemy object - starts from x = -98, y = 145 and speed = 100
const enemy2 = new Enemy(-98, 145, 100);
// 3th enemy object - starts from x = -98, y = 220 and speed = 70
const enemy3 = new Enemy(-98, 220, 70);
// 4th enemy object - starts from x = -98, y = 310 and speed = 30
const enemy4 = new Enemy(-98, 310, 30);
// 4th enemy object - starts from x = -500, y = 62 and speed = 120
const enemy5 = new Enemy(-500, 62, 120);
// 4th enemy object - starts from x = -450, y = 145 and speed = 80
const enemy6 = new Enemy(-450, 145, 80);
// 4th enemy object - starts from x = -300, y = 220 and speed = 50
const enemy7 = new Enemy(-300, 220, 50);
// 4th enemy object - starts from x = -250, y = 310 and speed = 30
const enemy8 = new Enemy(-250, 310, 30);

// Place all enemy objects in an array called allEnemies
allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];
// Place the player object in a variable called player
const player = new Player();

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

Player.prototype.handleInput = function (keyUp) {
    if (keyUp === 'space' && !spaceKeyUp) {
        isGameStarted = true;
        instructionsBg.style.display = 'none';
        music = new Audio('sounds/Contra Jungle.mp3');
        music.loop = true;

        music.play();

        // stop looping the music when pressing on space more than once
        spaceKeyUp = true;
    }


    if (isGameStarted) {
        if (keyUp === 'up' && this.y > TOP_SIDE) {
            this.y -= 83;
            countMovies++;
        }


        if (keyUp === 'down' && this.y < BOTTOM_SIDE) {
            this.y += 83;
            countMovies++;
        }


        if (keyUp === 'right' && this.x < RIGHT_SIDE) {
            this.x += 101;
            countMovies++;
        }


        if (keyUp === 'left' && this.x > LEFT_SIDE) {
            this.x -= 101;
            countMovies++;
        }


        if (keyUp === 'char-boy')
            player.sprite = 'images/char-boy.png';

        if (keyUp === 'char-cat-girl')
            player.sprite = 'images/char-cat-girl.png';

        if (keyUp === 'char-horn-girl')
            player.sprite = 'images/char-horn-girl.png';

        if (keyUp === 'char-pink-girl')
            player.sprite = 'images/char-pink-girl.png';

        if (keyUp === 'char-princess-girl')
            player.sprite = 'images/char-princess-girl.png';

        if (keyUp === 'mute') {
            music.muted = !music.muted;
        }

    }
};

Player.prototype.update = function () {
    if (this.y <= 0) {
        this.levelUp();
    }
};

// Won game
Player.prototype.levelUp = function () {
    currentLevel++;

    this.x = 503;
    this.y = 405;

    playerLevel.textContent = `Level ${currentLevel}`;

    if (heart === 2)
        star3.remove();


    if (heart === 1) {
        star2.remove();
        star3.remove();
    }

    winningLevel.textContent = `${countMovies} steps to end the game and
     Your next level is ${currentLevel}.`;

    winningBg.style.display = 'block';
};

// reset the game
Player.prototype.resetGame = function () {
    //  reset player position
    this.x = 503;
    this.y = 405;

    //  Reset enemy's position
    enemy1.x = -98;
    enemy2.x = -98;
    enemy3.x = -98;
    enemy4.x = -98;
    enemy5.x = -500;
    enemy6.x = -450;
    enemy7.x = -300;
    enemy8.x = -250;

    // Rest countMoves
    countMovies = 0;

    if (heart === 0) {
        heart = 3;
        currentLevel = 1;
        playerLevel.textContent = `Level ${currentLevel}`;

        // reset heart images
        playerHeart.appendChild(heart1);
        playerHeart.appendChild(heart2);
        playerHeart.appendChild(heart3);

        // reset star images
        playerStar.appendChild(star1);
        playerStar.appendChild(star2);
        playerStar.appendChild(star3);

        isGameStarted = false;
        instructionsBg.style.display = 'block';

        // Pause the music
        music.pause();


        spaceKeyUp = false;
    }
};

// On click listener
nextLevel.addEventListener('click', () => {
    winningBg.style.display = 'none';

    //  Reset enemy's position
    enemy1.x = -98;
    enemy2.x = -98;
    enemy3.x = -98;
    enemy4.x = -98;
    enemy5.x = -500;
    enemy6.x = -450;
    enemy7.x = -300;
    enemy8.x = -250;

    // Rest countMoves
    countMovies = 0;

    music.play();
});

// Uey up listener
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        49: 'char-boy',
        50: 'char-cat-girl',
        51: 'char-horn-girl',
        52: 'char-pink-girl',
        53: 'char-princess-girl',
        77: 'mute'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
