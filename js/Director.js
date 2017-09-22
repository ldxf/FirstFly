function Director() {
    this.ctx = null;//canvas的上下文
    this.back = null;//背景
    this.player = null;//玩家
    this.enimes = [];//敌人集合
    this.bullets = [];//子弹集合

    this.animID = null;//刷帧ID
    this.animenimesID = null;//刷帧ID

    this.grade = null;
    this.width = 0;
    this.height = 0;
    this.status = 0// 0 - choose 1 - play
}

/**
 * 游戏开始
 */
Director.prototype.play = function () {
    var temp = this;
    // //1.清屏
    // this.ctx.clearRect(0, 0, this.width,  this.height);
    // //2.画背景
    // this.back.draw();

    // this.animID = setInterval(temp.gameLoop(), 1000 / 60);
    this.animenimesID = setInterval(function () {
        //5.添加敌人
        temp.enimes.push(new Enemy(temp.ctx, temp.enimes));
    }, 1500);
    this.animID = setInterval(function () {
        temp.gameLoop();
    }, 1000 / 60);
    //飞机按键监听
    new KeyControl(temp);
}

/**
 * 游戏动画循环
 */
Director.prototype.gameLoop = function () {
    //1.清屏
    this.ctx.clearRect(0, 0, this.width, this.height);
    //2.画背景
    this.back.draw();
    //3.画玩家
    this.player.draw();
    // //4.画分数
    // this.grade.draw();
    //5.添加敌人
    // this.enimes.push(new Enemy(this.ctx, this.enimes));

    // //4.画敌人
    // for (var i = 0; i < this.enimes.length; i++) {
    //     this.enimes[i].draw();
    // }
    // //5.画子弹
    // for (var i = 0; i < this.bullets.length; i++) {
    //     this.bullets[i].draw();
    // }
    // //6.爆炸检测
    // for (var i = 0; i < this.enimes.length; i++) {
    //     for (var j = 0; j < this.bullets.length; j++) {
    //         if (!this.enimes[i].exploded) {
    //             if (IsCollided(this.enimes[i], this.bullets[j])) {
    //                 console.log("打中了");
    //                 this.enimes[i].exploded = true;
    //                 this.bullets[j].exploded = true;
    //                 this.grade.setGrade((this.enimes[i].airplaneType + 1) * 1000);
    //             }
    //         }
    //     }
    // }

    //7.飞机撞击动画
    // for (var i = 0; i < this.enimes.length; i++) {
    //     if (IsCollided(this.enimes[i], this.player)) {
    //         console.log("飞机撞击动画");
    //         this.player.exploded = true;
    //     }
    //     if (this.player.multiplayered) {
    //         if (IsCollided2(this.enimes[i], this.player)) {
    //             console.log("飞机撞击动画");
    //             this.player.exploded2 = true;
    //         }
    //     }
    // }

    if (this.player.animStep()) {
        this.onPause();
    }
}

/**
 * 暂停动画（游戏循环）
 */
Director.prototype.onPause = function () {
    clearInterval(this.animID);
    clearInterval(this.animenimesID);
    this.animenimesID = null;
    this.animID = null;
}

/**
 * 画玩家选择
 * @param choose
 */
Director.prototype.drawChoose = function (choose) {
    if(choose === 1){
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("1 player",this.width/2,this.height/2,1000);
        this.ctx.fillStyle = "DarkGray";
        this.ctx.font = "16px Arial";
        this.ctx.fillText("2 player",this.width/2,this.height/2+40,1000);
    }else if(choose === 2){
        this.ctx.fillStyle = "DarkGray";
        this.ctx.font = "16px Arial";
        this.ctx.fillText("1 player",this.width/2,this.height/2,1000);
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("2 player",this.width/2,this.height/2+40,1000);
    }
}

/**
 * 选择玩家
 */
Director.prototype.choosePlayer = function () {
    var temp = this;
    var choose = 1;
    temp.ctx.font = "16px Arial";
    temp.ctx.textAlign = "center";
    this.animID = setInterval(function () {
        //1.清屏
        temp.ctx.clearRect(0, 0, temp.width, temp.height);
        //2.画背景
        temp.back.draw();
        //3.画选择
        temp.drawChoose(choose);
    }, 1000 / 60);

    $(document).keydown(function (e) {
        if(temp.status !==0){
            return;
        }
        switch (e.which){
            case keyCode.keyUp:
                choose = 1;
                break;

            case keyCode.keyDown:
                choose = 2;
                break;

            case keyCode.keyEnter:
                if(choose === 1){
                    temp.player.setSinglePlayer();
                }else if(choose === 2){
                    temp.player.setMultiPlayer();
                }
                temp.enimes.removeAll();
                temp.bullets.removeAll();
                temp.grade.setGrade(0);
                temp.onPause();
                temp.play();
                temp.status = 1;
                break;
        }
    })
}

