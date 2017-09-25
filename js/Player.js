function Player(director) {
    this.director = director;
    this.ctx = director.ctx;
    this.img = new Image();
    this.img.src = "img/Player.png";
    this.x = 0;
    this.y = 0;
    this.bullets = director.bullets;
    this.width = 32;
    this.height = 32;
    this.exploded = false;
    this.explodedImg = new Image();
    this.explodedImg.src = "img/explosionEnemy.png";
    this.explodeIndex = 0;
    // this.explodeIndex2 = 0;
    // this.multiPlayer = false;
    // this.palyer2X = 0;
    // this.palyer2Y = 0;
    // this.exploded2 = false;
    // this.img2 = new Image();

    this.BulleCode = {
        Type0: 0,
        Type1: 1

    };
    this.bulleType = this.BulleCode.Type0;

}

Player.prototype.draw = function () {
    if (!this.exploded) {
        this.ctx.drawImage(this.img, this.x, this.y);
        if (keyStatus.keyLeftStatus) {
            this.x > 0 ? this.x -= 5 : this.x;
        }
        if (keyStatus.keyRightStatus) {
            this.x < this.director.width - this.width ? this.x += 5 : this.x;
        }
        if (keyStatus.keyUpStatus) {
            this.y > 0 ? this.y -= 5 : this.y;
        }
        if (keyStatus.keyDownStatus) {
            this.y < this.director.height - this.height ? this.y += 5 : this.y;
        }
        if (keyStatus.keySpaceStatus) {
            this.fire(this.x + 8, this.y);
            keyStatus.keySpaceStatus = false;
        }
    } else {
        if (this.explodeIndex < 10) {
            this.ctx.drawImage(this.explodedImg,
                this.explodeIndex * 44, 0, 44, 49,
                this.x, this.y, 44, 49);
            this.explodeIndex++;
        }
    }
};

Player.prototype.fire = function (removeX, removeY) {
    switch (this.bulleType){
        case this.BulleCode.Type0:
            this.BulletType0(removeX,removeY);
            break;
        case this.BulleCode.Type1:
            this.BulletType1(removeX,removeY);
            break;
    }

};

Player.prototype.getCenter = function () {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
}

Player.prototype.animStep = function () {
    // console.log(this.explodeIndex);
    return (this.exploded && this.explodeIndex > 7);
}


Player.prototype.initPlayer = function (img, x, y) {
    this.img.src = img;
    this.x = x;
    this.y = y;
}


Player.prototype.BulletType0 = function (x, y) {
    this.bullets.push(new Bullet(this.ctx, x, y, this.bullets));
}
Player.prototype.BulletType1 = function (x, y) {
    this.bullets.push(new Bullet(this.ctx, x, y, this.bullets));
    this.bullets.push(new Bullet(this.ctx, x-this.width/2, y+this.height/2, this.bullets));
    this.bullets.push(new Bullet(this.ctx, x+this.width/2, y+this.height/2, this.bullets));
}

