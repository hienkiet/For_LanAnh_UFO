class Bg{
    constructor(game){
        this.game = game;

        this.img;
        this.loaded = false;
        this.init();
    }
    init(){
        this.img = new Image();
        this.img.src = './img/bg.png';
        this.img.onload = ()=>{
            this.draw();
        }
    }
    draw(){
        this.game.ctx.drawImage(this.img, 0 ,0,1000,600);
    }

}