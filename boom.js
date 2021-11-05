class Boom{
    constructor(game, x, y){
        this.game = game;
        this.x = x;
        this.y = y;

        this.img;
        this.loaded = false;
        
        this.init();
    }

    init(){
        this.img = new Image();
        this.img.src = './img/boom.png';

        this.img.onload = ()=>{
            this.loaded = true;
            this.draw();
        }
    }

    draw(){
        this.game.ctx.drawImage(this.img, this.x, this.y, 48, 48);
    }

    update(){
        this.y+=6;
    }

    changeLose(){
        this.img.src = './img/lose.png';
    }
}