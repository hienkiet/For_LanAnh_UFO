class UserBullet{
    constructor(game,x){
        this.game = game;
        this.x = x;
        this.y;

        this.img;
        this.loaded;
        
        this.init();
    }

    init(){
        this.y = this.game.height - 130;
        this.img = new Image();
        this.img.src = './img/userbullet.png';
        
        this.img.onload = () => {
            this.draw();
        }
    }

    update(){
        this.y-=10;
    }
    change(){
        this.img.src = './img/userBulletBang.png';
    }

    draw(){
        this.game.ctx.drawImage(this.img, this.x, this.y, 70, 70);
    }
}