/**
 *背景
 */
function Background(director) {
    this.director = director;
    this.ctx = director.ctx;
    this.img = new Image();
    this.img.src = "img/Stars.png";
    this.x = 0;
    this.y = 0;
}

Background.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y, this.director.width, this.director.height);
    this.ctx.drawImage(this.img, this.x, this.y - this.ctx.canvas.height, this.director.width, this.director.height);
    this.y++;
    if (this.y > this.ctx.canvas.height) {
        this.y = 0;
    }
}
