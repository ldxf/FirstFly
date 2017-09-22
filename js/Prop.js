/**
 *道具类
 */
function Prop(director) {
    this.ctx = director.ctx;
    this.director = director;
    this.img = new Image();
    // this.imgs = ["img/enemy_small.png", "img/enemy_small_2.png", "img/enemy_small_2_special.png",
    //     "img/enemy_small_3.png", "img/enemy_small_4.png"];
    this.img.src = "img/Rock.png";
    // this.x = parseInt((Math.random() * 500).toFixed(0));
    // this.y = parseInt((Math.random() * 700).toFixed(0));
    this.width = 66;
    this.height = 70;
    this.exploded = false;
    this.explodedImg = new Image();
    this.explodedImg.src = "img/explosionEnemy.png";
    // this.explodeIndex = 0;
    // this.airplaneType = parseInt(Math.random() * 10 % this.imgs.length);
    // this.img.src = this.imgs[this.airplaneType];

    //初始位置xy，速度vx，vy
    this.ball = {
        x: 100,
        y: 100,
        vx: 5,
        vy: 2
    };

}



Prop.prototype.draw =  function () {
    if (!this.exploded) {
    this.ctx.drawImage(this.img,this.ball.x,this.ball.y)
    this.ball.x += this.ball.vx;
    this.ball.y += this.ball.vy;
    if (this.ball.y + this.ball.vy > this.director.height- this.height ||
        this.ball.y + this.ball.vy < 0) {
        this.ball.vy = -this.ball.vy;
    }
    if (this.ball.x + this.ball.vx > this.director.width-this.width ||
        this.ball.x + this.ball.vx < 0) {
        this.ball.vx = -this.ball.vx;
    }
    } else {
        this.ctx.drawImage(this.explodedImg,
            this.explodeIndex * 44, 0, 44, 49,
            this.x, this.y,
            44, 49);
        this.explodeIndex++;
    }
}
