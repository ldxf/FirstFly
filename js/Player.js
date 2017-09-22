function Player(director) {
    this.ctx = director.ctx;
    this.img = new Image();
    this.img.src = "img/Player.png";
    this.x = 250;
    this.y = 350;
    this.bullets = director.bullets

    this.director = director;
    this.width = 32;
    this.height = 32;
    this.exploded = false;
    this.explodedImg = new Image();
    this.explodedImg.src = "img/explosionEnemy.png";
    this.explodeIndex = 0;
    this.explodeIndex2 = 0;
    this.multiplayered = false;
    this.palyer2X = 0;
    this.palyer2Y = 0;
    this.exploded2 = false;
    this.img2 = new Image();
}

Player.prototype.draw = function () {
    // this.setMultiplayer();
    if (!this.exploded) {
        this.ctx.drawImage(this.img, this.x, this.y);
        if (keyStatus.keyLeftStatus) {
            this.x > -this.width / 2 ? this.x -= 5 : this.x;
        }
        if (keyStatus.keyRightStatus) {
            this.x < this.director.width + this.width / 2 ? this.x += 5 : this.x;
        }
        if (keyStatus.keyUpStatus) {
            this.y > 0 ? this.y -= 5 : this.y;
        }
        if (keyStatus.keyDownStatus) {
            this.y < this.director.height - this.height / 2 ? this.y += 5 : this.y;
        }
        if (keyStatus.keySpaceStatus) {
            this.fire(this.x + 8, this.y);
            keyStatus.keySpaceStatus = false;
        }
    } else {
        if (this.explodeIndex < 10) {
            this.ctx.drawImage(this.explodedImg,
                this.explodeIndex * 44, 0, 44, 49,
                this.x, this.y,
                44, 49);
            this.explodeIndex++;
        }
    }
    if (this.multiplayered) {
        if (!this.exploded2) {
            this.ctx.drawImage(this.img2, this.palyer2X, this.palyer2Y);
            if (keyStatus.keyAStatus) {
                this.palyer2X > -this.width / 2 ? this.palyer2X -= 5 : this.palyer2X
            }
            if (keyStatus.keyDStatus) {
                this.palyer2X < this.director.width + this.width / 2 ? this.palyer2X += 5 : this.palyer2X;
            }
            if (keyStatus.keyWStatus) {
                this.palyer2Y > 0 ? this.palyer2Y -= 5 : this.palyer2Y;
            }
            if (keyStatus.keySStatus) {
                this.palyer2Y < this.director.height - this.height / 2 ? this.palyer2Y += 5 : this.palyer2Y;
            }
            if (keyStatus.key0Status) {
                this.fire(this.palyer2X + 8, this.palyer2Y);
                keyStatus.key0Status = false;
            }
        } else {
            if (this.explodeIndex2 < 10) {
                this.ctx.drawImage(this.explodedImg,
                    this.explodeIndex2 * 44, 0, 44, 49,
                    this.palyer2X, this.palyer2Y,
                    44, 49);
                this.explodeIndex2++;
            }

        }
    }

}


Player.prototype.fire = function (removeX, removeY) {
    var bul = new Bullet(this.ctx, removeX, removeY, this.bullets);
    this.bullets.push(bul);
}

Player.prototype.getCenter = function () {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
}
Player.prototype.getCenter2 = function () {
    return new Point(this.palyer2X + this.width / 2, this.palyer2Y + this.height / 2);
}
Player.prototype.animStep = function () {
    // console.log(this.explodeIndex);
    return (this.exploded && this.explodeIndex > 7) && (this.multiplayered ? (this.exploded2 && this.explodeIndex2 > 7) : true);
}

Player.prototype.setMultiplayer = function () {
    this.multiplayered = true;
    this.img2.src = "img/Player2.png";
    this.palyer2X = this.director.width / 3;
    this.palyer2Y = this.director.height*3/4;
    this.x = this.director.width * 2 / 3;
    this.y=this.director.height*3/4;
    this.explodeIndex = 0;
    this.explodeIndex2 = 0;
    this.exploded = false;
    this.exploded2 = false;
    // this.bullets=[];
}
Player.prototype.setSingleplayer = function () {
    this.multiplayered = false;
    this.x = this.director.width / 2;
    this.y=this.director.height*3/4;
    this.explodeIndex = 0;
    this.exploded = false;
    // this.bullets=[];
}

