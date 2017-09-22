function Player(ctx,bullets)
{
	this.ctx=ctx;
	this.img=new Image();
	this.img.src="img/Player.png";
	this.x=250;
	this.y=350;
	this.bullets=bullets
}

Player.prototype.draw=function(){
	this.ctx.drawImage(this.img,this.x,this.y);
	
	if(keyStatus.keyLeftStatus)
	{
		this.x-=5;
	}
	if(keyStatus.keyRightStatus)
	{
		this.x+=5;
	}
	if(keyStatus.keySpaceStatus)
	{
		this.fire();
		keyStatus.keySpaceStatus=false;
	}
}

Player.prototype.fire=function(){
	var bul=new Bullet(this.ctx,this.x,this.y,this.bullets);
	this.bullets.push(bul);
}
