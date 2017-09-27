/**
 * 子弹
 * X，Y 初始位置
 * isSecondPlayer 是否是第二个玩家
 * isCreate 子弹是否再原来基础上添加的
 * isLeft 子弹是否在飞机的左边（负的0到90度）
 * isRight 子弹是否在飞机的右边 （0到90度)
 *
 */
function Bullet(director, x, y, isSecondPlayer, isCreate, isLeft, isRight, Angle) {
    this.Angle = Angle;
    this.isCreate = isCreate;
    this.isLeft = isLeft;
    this.isRight = isRight;
    this.director = director;
    this.isSecondPlayer = isSecondPlayer;
    this.ctx = director.ctx;
    this.img = new Image();
    this.img.src = "img/projectile.png"
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 28;
    this.bullets = director.bullets;
    this.exploded = false;
    this.speed = 10;
    this.bulleType = this.director.players[!this.isSecondPlayer ? 0 : 1].bulleType;
    this.BulleCode = this.director.players[!this.isSecondPlayer ? 0 : 1].BulleCode;

    // this.bulleType = 1;
    // this.BulleCode = {
    //     Type0: 0,
    //     Type1: 1,
    //     Type2: 2
    // };
}

Bullet.prototype.draw = function () {
    // console.log("子弹数:" + this.bullets.length);
    this.bulleType = 2;
    if (this.bulleType === this.BulleCode.Type2) {
        if (!this.isCreate) {
            this.BulletType2();
            this.isCreate = true;
        }
        // if (this.isRight) {
        //     this.ctx.save();
        //     this.ctx.translate(this.x + this.director.players[!this.isSecondPlayer ? 0 : 1].width / 2, this.y);
        //     this.ctx.rotate((Math.PI / 180) * this.Angle);  //旋转45度
        //     this.ctx.drawImage(this.img, -this.width / 2, -this.height / 2);
        //     this.ctx.restore();
        //     this.x += Math.abs(Math.sin(this.Angle) * this.speed);
        //     this.y -= Math.abs(Math.cos(this.Angle) * this.speed);
        // }
        // if (this.isLeft) {
        //     this.ctx.save();
        //     this.ctx.translate(this.x, this.y);              //移动到图形的中心
        //     this.ctx.rotate((Math.PI / 180) * this.Angle);  //旋转45度
        //     this.ctx.drawImage(this.img, -this.width / 2, -this.height / 2);
        //     this.ctx.restore();
        //     this.x -= Math.abs(Math.sin(this.Angle) * this.speed);
        //     this.y -= Math.abs(Math.cos(this.Angle) * this.speed);
        //     // this.x -= Math.sin(this.Angle) * this.speed;
        //     // this.y -= Math.cos(this.Angle) * this.speed;
        // }
        if (this.Angle === 0) {
            this.ctx.drawImage(this.img, this.x, this.y);
            this.y -= this.speed;
        }
        else {
            this.ctx.save();
            this.ctx.translate(this.x, this.y);
            this.ctx.rotate((Math.PI / 180) * this.Angle);
            this.ctx.drawImage(this.img, -this.width / 2, -this.height / 2);
            this.ctx.restore();
            this.x += Math.cos((90 - this.Angle) * Math.PI / 180) * this.speed;
            this.y -= Math.sin((90 - this.Angle ) * Math.PI / 180) * this.speed;
        }
        if (this.y < -10 || this.exploded) {
            this.bullets.remove(this);
        }
        return;
    }

    if (!this.isCreate) {
        console.log("isCreate:11111111111111111111111111");
        this.setLocus();
        this.isCreate = true;
    }
    this.ctx.drawImage(this.img, this.x, this.y);
    this.y -= this.speed;
    if (this.y < -10 || this.exploded) {
        this.bullets.remove(this);
    }
};

Bullet.prototype.getCenter = function () {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
};
Bullet.prototype.setLocus = function () {
    switch (this.bulleType) {
        case this.BulleCode.Type0:
            this.BulletType0(this.x, this.y);
            break;
        case this.BulleCode.Type1:
            this.BulletType1(this.x, this.y);
            break;
        case this.BulleCode.Type2:
            break;
        case this.BulleCode.Type3:
            this.BulletType3(this.x, this.y);
            break;
        case this.BulleCode.Type4:
            this.BulletType4(this.x, this.y);
            break;
        case this.BulleCode.Type5:
            this.BulletType0(this.x, this.y);
            break;
    }

};

Bullet.prototype.BulletType0 = function () {
}

Bullet.prototype.BulletType1 = function () {
    this.bullets.push(new Bullet(this.director, this.x - this.width / 2, this.y + this.height / 2, this.isSecondPlayer, true, false, false, 0));
    this.bullets.push(new Bullet(this.director, this.x + this.width / 2, this.y + this.height / 2, this.isSecondPlayer, true, false, false, 0));
}
Bullet.prototype.BulletType2 = function () {
    this.bullets.push(new Bullet(this.director, this.x + this.width / 2, this.y + this.height/2, this.isSecondPlayer, true, false, true, -60));
    this.bullets.push(new Bullet(this.director, this.x + this.width / 2, this.y + this.height/2, this.isSecondPlayer, true, false, true, 200));
    // this.bullets.push(new Bullet(this.director, this.x - this.width / 2, this.y + this.height / 2, this.isSecondPlayer, true, true, false, -40));

}
Bullet.prototype.BulletType3 = function () {
    this.bullets.push(new Bullet(this.director, this.x - this.width / 2, this.y + this.height / 2, this.isSecondPlayer, true, false, false, 0));
    this.bullets.push(new Bullet(this.director, this.x + this.width / 2, this.y + this.height / 2, this.isSecondPlayer, true, false, false, 0));
    this.bullets.push(new Bullet(this.director, this.x - this.width, this.y + this.height / 2, this.isSecondPlayer, true, false, false, 0));
    this.bullets.push(new Bullet(this.director, this.x + this.width, this.y + this.height / 2, this.isSecondPlayer, true, false, false, 0));
}
Bullet.prototype.BulletType4 = function () {
    this.bullets.push(new Bullet(this.director, this.x - this.width / 2, this.y + this.height / 2, this.isSecondPlayer, true, false, false, 0));
    this.bullets.push(new Bullet(this.director, this.x + this.width / 2, this.y + this.height / 2, this.isSecondPlayer, true, false, false, 0));
    this.bullets.push(new Bullet(this.director, this.x - this.width, this.y + this.height, this.isSecondPlayer, true, false, false, 0));
    this.bullets.push(new Bullet(this.director, this.x + this.width, this.y + this.height, this.isSecondPlayer, true, false, false, 0));
}
