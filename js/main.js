$(function () {
    var director = new Director();
    director.ctx = $("#game_canvas")[0].getContext("2d");
    director.back = new Background(director.ctx);
    director.player = new Player(director);
    // director.player.setMultiplayer();
    director.grade = new Grade(director);
    director.width=director.ctx.canvas.width;
    director.height=director.ctx.canvas.height;

    // setInterval(function () {
    //     var emy = new Enemy(director.ctx, director.enimes);
    //     director.enimes.push(emy);
    // }, 1000);
    // director.play();
    new KeyControl(director);
});