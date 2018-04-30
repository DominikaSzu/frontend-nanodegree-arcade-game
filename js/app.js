// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    
    if (this.x > 505) {
        this.x = 0;
    }
    
    // it should handle collision with the player
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
}

// update method

Player.prototype.update = function (dt) {
   
};

// handleInput method

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
    
};

// Player render method

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
    new Enemy(0, 65, 230),
    new Enemy(0, 150, 100),
    new Enemy(0, 230, 300),
];
// Place the player object in a variable called player
let player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
