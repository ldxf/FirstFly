$(function(){
	var director =new Director();
	director.ctx=$("#game_canvas")[0].getContext("2d");
	director.bg=new Background(director.ctx);
	director.player=new Player(director.ctx,director.bullets);
	
	setInterval(function(){
		var emy=new Enemy(director.ctx,director.enimes);
		director.enimes.push(emy);
	},1000);
			
	director.play();
	Event();
});