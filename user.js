class User{
    constructor(game){
        this.game = game;

        this.img;
        this.x;
        this.y;
        this.init();
    }
    init(){
        this.x = this.game.width/2 - 25;
        this.y = 530;
        this.img = new Image()
        this.img.src = './img/user.png';
        this.img.onload = () => {
            this.draw();
        }
    }
//default y: 530;
    draw(){
        this.game.ctx.drawImage(this.img,this.x,this.y,100,100);
    }
    changeLose(){
        this.img.src = './img/lose.png';
    }
    moveRight(){
        if(this.x < 920){
            this.x+=25;
        }
    }
    moveLeft(){
        if(this.x > 0){
            this.x-=25;
        }
    }
    moveUp(){
        if(this.y > 0){
            this.y-=25;
        }
    }
    moveDown(){
        if(this.y < 530){
            this.y+=25;
        }
    }
}