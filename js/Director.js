function Director() {
    this.ctx = null;//canvas的上下文
    this.back = null;//背景
    this.player = null;//玩家
    this.enimes = [];//敌人集合
    this.bullets = [];//子弹集合

    this.animID = null;//刷帧ID

    this.grade = null;
    this.width = 600;
    this.height = 450;
}

//游戏
Director.prototype.play = function () {
//	alert(this.gameLoop());
    var temp = this;
    // //1.清屏
    // this.ctx.clearRect(0, 0, this.width,  this.height);
    // //2.画背景
    // this.back.draw();

    // this.animID=setInterval(temp.gameLoop(),1000/60);
    this.animID = setInterval(function () {
        temp.gameLoop();
    }, 1000 / 60);
}

Director.prototype.gameLoop = function () {
    //1.清屏
    this.ctx.clearRect(0, 0, this.width, this.height);
    //2.画背景
    this.back.draw();
    //3.画玩家
    this.player.draw();
    //4.画分数
    this.grade.draw();
    //5.添加敌人
    this.enimes.push(new Enemy(this.ctx, this.enimes));

    //4.画敌人
    for (var i = 0; i < this.enimes.length; i++) {
        this.enimes[i].draw();
    }
    //5.画子弹
    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].draw();
    }
    //6.爆炸检测
    for (var i = 0; i < this.enimes.length; i++) {
        for (var j = 0; j < this.bullets.length; j++) {
            if (!this.enimes[i].exploded) {
                if (IsCollided(this.enimes[i], this.bullets[j])) {
                    console.log("打中了");
                    this.enimes[i].exploded = true;
                    this.bullets[j].exploded = true;
                    this.grade.setGrade((this.enimes[i].airplaneType + 1) * 1000);
                }
            }
        }
    }

    //7.飞机撞击动画
    for (var i = 0; i < this.enimes.length; i++) {
        if (IsCollided(this.enimes[i], this.player)) {
            console.log("飞机撞击动画");
            this.player.exploded = true;
        }
        if (this.player.multiplayered) {
            if (IsCollided2(this.enimes[i], this.player)) {
                console.log("飞机撞击动画");
                this.player.exploded2 = true;
            }
        }
    }

    if (this.player.animStep()) {
        this.onPase();
    }
}

Director.prototype.onPase = function () {
    clearInterval(this.animID);
    this.animID=null;
}

Director.prototype.onPrepare = function (string) {
    // console.log(this.animID);
    if (this.animID !== null && this.animID>0) {
        return;
    }
    // console.log("play");
    //twostart回车键
    if (string === "848779838465828413") {
        this.player.setMultiplayer();
    }else {
        this.player.setSingleplayer();
    }
    this.enimes.removeAll();
    this.bullets.removeAll();
    this.grade.setGrade(0);
    this.play();


}
