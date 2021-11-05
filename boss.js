class Boss{
    constructor(game){
        this.game = game;

        this.img;
        this.x;
        this.y = 0;

        this.hitted = false;
        this.loaded = false;

        this.init();

    }
    init(){
        this.random();
        this.img = new Image();
        this.img.src = './img/boss.png';

        this.img.onload = () => {
            this.loaded = true;
            this.draw();
        }
    }

    random(){
        this.x = Math.floor(Math.random()*(this.game.width-70));
        this.y = 0;
    }

    update(){
        this.y+=3;
    }
    change(){
        this.img.src = './img/bang.png';
    }
    changeLose(){
        this.img.src = './img/lose.png';
    }
    reChange(){
        this.img.src = './img/boss.png';
    }
    draw(){
        this.game.ctx.drawImage(this.img,this.x,this.y,70,70);
    }

}