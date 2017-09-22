$(function () {
    var director = new Director();
    director.ctx = $("#game_canvas")[0].getContext("2d");
    director.back = new Background(director.ctx);
    director.player = new Player(director);
    // director.player.setMultiplayer();
    director.grade = new Grade(director);

        // setInterval(function () {
        //     var emy = new Enemy(director.ctx, director.enimes);
        //     director.enimes.push(emy);
        // }, 1000);
        // director.play();
    new KeyControl(director);
});