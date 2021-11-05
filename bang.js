class Bang{
    constructor(game){
        this.game = game;

        this.img;
        this.x;
        this.y;

        this.loaded = false;

        this.init();

    }
    init(){
        this.img = new Image();
        this.img.src = './img/bang.png';

        this.img.onload = () => {
            this.loaded = true;
        }
    }

    draw(){
        this.game.ctx.drawImage(this.img,this.x,this.y,70,70);
    }

}