/**
 *背景
 */
function Background(ctx)
{
	this.ctx=ctx;
	this.img=new Image();
	this.img.src="img/Stars.png";
	this.x=0;
	this.y=0;
}

Background.prototype.draw=function(){
	this.ctx.drawImage(this.img,this.x,this.y);
	this.ctx.drawImage(this.img,this.x,this.y-this.ctx.canvas.height);
	this.y++;
	if(this.y>this.ctx.canvas.height)
	{
		this.y=0;
	}
}
