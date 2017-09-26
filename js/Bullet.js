/**
 * 子弹
 * X，Y 初始位置
 * isSecondPlayer 是否是第二个玩家
 * isCreate 子弹是否再原来基础上添加的
 * isLeft 子弹是否在飞机的左边
 * isRight 子弹是否在飞机的右边
 *
 */
function Bullet(director, x, y, isSecondPlayer,isCreate,isLeft,isRight) {
    this.isCreate=isCreate;
    this.isLeft=isLeft;
    this.isRight=isRight;
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
    this.players = director.players;
    // this.bulleType = this.players[this.isSecondPlayer ? 0 : 1].bulleType;
    // this.BulleCode = this.players[this.isSecondPlayer ? 0 : 1].BulleCode;
    this.bulleType = 2;
    this.BulleCode = {
        Type0: 0,
        Type1: 1,
        Type2: 2
    };
}

Bullet.prototype.draw = function () {
    // console.log("子弹数:" + this.bullets.length);
    if (this.bulleType === this.BulleCode.Type2) {
        if(!this.isCreate){
            this.BulletType2();
        }
        if(this.isLeft){
            this.ctx.save();
            this.ctx.translate(this.x + 14, this.y - 8);              //移动到图形的中心
            this.ctx.rotate((Math.PI / 180) * -45);  //旋转45度
            this.ctx.drawImage(this.img, 0, 0);
            this.ctx.restore();
            this.x += 3;
        }
        if(this.isRight){
            this.ctx.save();
            this.ctx.translate(this.x + 14, this.y - 8);              //移动到图形的中心
            this.ctx.rotate((Math.PI / 180) * 45);  //旋转45度
            this.ctx.drawImage(this.img, 0, 0);
            this.ctx.restore();
            this.x -= 3;
        }
        this.ctx.drawImage(this.img, this.x, this.y);
        this.y -= this.speed;
        if (this.y < -10 || this.exploded) {
            this.bullets.remove(this);
        }
        return;
    }

    if(!this.isCreate){
        this.setLocus();
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
    }
};

Bullet.prototype.BulletType0 = function () {
}

Bullet.prototype.BulletType1 = function () {
    this.bullets.push(new Bullet(this.director, this.x - this.width / 2, this.y + this.height / 2, this.isSecondPlayer,true,false,false));
    this.bullets.push(new Bullet(this.director, this.x + this.width / 2, this.y + this.height / 2, this.isSecondPlayer,true,false,false));
}
Bullet.prototype.BulletType2 = function () {
    this.bullets.push(new Bullet(this.director, this.x - this.width / 2, this.y + this.height / 2, this.isSecondPlayer,true,true,false));
    this.bullets.push(new Bullet(this.director, this.x + this.width / 2, this.y + this.height / 2, this.isSecondPlayer,true,false,true));
}
