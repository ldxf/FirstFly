function Enemy(ctx,emys)
{
	this.ctx=ctx;
	this.img=new Image();
	this.img.src="img/Rock.png";
	this.x=parseInt((Math.random()*500).toFixed(0));
	this.y=parseInt((-Math.random()*700).toFixed(0));
	this.width=66;
	this.height=70;
	this.emys=emys;
	this.exploded=false;
	this.explodedImg=new Image();
	this.explodedImg.src="img/explosionEnemy.png";
	this.explodeIndex=0;
}

Enemy.prototype.draw=function(){
	if(!this.exploded)
	{
		this.ctx.drawImage(this.img,this.x,this.y);
		this.y++;
	}
	else
	{
		  this.ctx.drawImage(this.explodedImg,
                this.explodeIndex*44,0,44,49,
                this.x,this.y,
                44,49);
        this.explodeIndex++;
	}
	
	
	
	if(this.y>450)
	{
		this.emys.remove(this);	
	}
}

Enemy.prototype.getCenter=function(){
//	console.log(this.x);
//	console.log(typeof(this.x));
	return new Point(this.x+this.width/2,this.y+this.height/2);
}
