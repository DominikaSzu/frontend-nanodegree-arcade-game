const game = {
    points: 0,
    count: document.querySelector(".count"),
    button: document.querySelector(".playerChange")
};

// Array with characters to choose

const characters = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-princess-girl.png',
    'images/char-pink-girl.png'
];


// Enemies our player must avoid

var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = 0;
    }
}

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

let Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
};

// Player udate method

Player.prototype.update = function (dt) {
    this.checkCollisions();
    this.winControl();
}

//Player handleInput method

Player.prototype.handleInput = function (key) {
    if ((key == "left") && (this.x > 0)) {
        this.x -= 100;
    } else if ((key == "up") && (this.y > -10)) {
        this.y -= 83;
    } else if ((key == "right") && (this.x < 400)) {
        this.x += 100;
    } else if ((key == "down") && (this.y < 400)) {
        this.y += 83;
    }

}

// Player render method

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

let allEnemies = [
    new Enemy(0, 65, 80),
    new Enemy(0, 150, 50),
    new Enemy(0, 230, 90)
];

let player = new Player(200, 400);

// EventListener that listens user's moves

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Collision detection function

Player.prototype.checkCollisions = function () {
    for (const enemy of allEnemies) {
        if (this.x < enemy.x + 50 &&
            this.x + 50 > enemy.x &&
            this.y < enemy.y + 50 &&
            50 + this.y > enemy.y) {
            game.points -= 1;
            this.reset();
            resetSpeed(randomSpeed);
        }
    }
}

// Player reset method

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;

    allEnemies = [
    new Enemy(0, 65, 80),
    new Enemy(0, 150, 50),
    new Enemy(0, 230, 90)
];
    game.count.textContent = game.points;
}

// Enemy reset method

function randomSpeed() {

    let min;
    let max;

    if (game.points <= 4) {
        min = 40;
        max = 100;
    } else if ((game.points > 4) && (game.points <= 8)) {
        min = 110;
        max = 200;
    } else if ((game.points > 8) && (game.points <= 13)) {
        min = 210;
        max = 300;
    } else if ((game.points > 13) && (game.points <= 19)) {
        min = 310;
        max = 400;
    } else if ((game.points > 19) && (game.points <= 24)) {
        min = 410;
        max = 500;
    } else {
        min = 510;
        max = 700;
    }

    let num = Math.floor(Math.random() * (max - min)) + min;

    return num;
}

function resetSpeed(randomSpeed) {
    for (let i = 0; i < allEnemies.length; i++) {
        allEnemies[i].speed = randomSpeed();
    }
}

// Win control

Player.prototype.winControl = function () {
    if (player.y <= 0) {
        game.points += 1;
        game.count.textContent = game.points;
        this.reset();
        resetSpeed(randomSpeed);
    }
}

// Changing the player functionality

game.button.addEventListener("click", function () {

    let num = Math.floor(Math.random() * (4 - 0 + 1)) + 0;

    let character = characters[num];

    player.sprite = character;

    player.render();
});
