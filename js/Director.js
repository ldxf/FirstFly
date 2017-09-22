function Director()
{
	this.ctx=null;//canvas的上下文
	this.bg=null;//背景
	this.player=null;//玩家
	this.enimes=[];//敌人集合
	this.bullets=[];//子弹集合
	
	this.animID=null;//刷帧ID
}

//游戏
Director.prototype.play=function(){
//	alert(this.gameLoop());
	var temp=this;
//	this.animID=setInterval(temp.gameLoop(),1000/60);
	this.animID=setInterval(function(){
		temp.gameLoop();
	},1000/60);
}

Director.prototype.gameLoop=function(){
	//1.清屏
	this.ctx.clearRect(0,0,600,450);
	//2.画背景
	this.bg.draw();
	//3.画玩家
	this.player.draw();
	
//	console.log(this.enimes.length);
	//4.画敌人
	 for(var i=0;i<this.enimes.length;i++)
    {
        this.enimes[i].draw();
    }
    //5.画子弹
 	for(var i=0;i<this.bullets.length;i++) 
 	{
 		this.bullets[i].draw();
 	}
 	//6.爆炸检测
 	for(var i=0;i<this.enimes.length;i++)
 	{
 		for(var j=0;j<this.bullets.length;j++)
 		{
 			if(!this.enimes[i].exploded)
 			{
 				if(IsCollided(this.enimes[i],this.bullets[j]))
 				{
   					console.log("打中了");
   					this.enimes[i].exploded=true;
   					this.bullets[j].exploded=true;
 				}	
 			}
 		}
 	}
 	
 	
}
