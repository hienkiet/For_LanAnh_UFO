
class Game{
    constructor(width, height){
        
        this.width = width;
        this.height = height;
        console.log(this.width, this.height)

        this.canvas;
        this.ctx;

        //objects
        this.bg;
        this.user;
        this.boss = [];
        this.bang = [];
        this.userBullet = [];
        this.boom = [];
        this.userBulletX;
        this.scoreBoard;
        //check and index
        this.lose = false;
        this.checkBullet = 0;
        this.bulletIdx = 0;

        this.checkBoss = 0;
        this.checkBoom = 0;
        this.boomIdx = 0;
        this.bossIdx = 0;
        this.timeBang = [];

        //score
        this.score = 0;
        this.life = 3;
        this.loseboard;

        this.hit;
        this.bullet;
        this.die;

        this.init();
        this.loop();
    }
    init(){
        //game elements
        this.hit = new Audio('./sound/hit.mp3');
        this.bullet = new Audio('./sound/bullet.mp3');
        this.die = new Audio('./sound/lose.mp3');
        this.scoreBoard = new Score(this);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style = 'border: 20px solid black;'
        document.body.appendChild(this.canvas);

        //initialize objects
        this.bg = new Bg(this);
        this.user = new User(this);
        this.userBulletX = this.user.x+15;
        for(let i = 0; i < 7; i++){
            this.boss[i] = new Boss(this);
        }

        // listen event
        // USE MOUSE
        document.addEventListener('mousemove',(event)=>{
            if(event.clientX < this.width-80){
                this.user.x = event.clientX;
                this.userBulletX = this.user.x+15;
            }
        });

        //USE ARROW KEYS

        // document.addEventListener('keydown',(event)=>{
        //     let pressKey = event.key;
        //     switch(pressKey){
        //         case 'ArrowLeft':{
        //             this.user.moveLeft()
        //             this.userBulletX = this.user.x+15;
        //         };;
        //         case 'ArrowRight':{
        //             this.user.moveRight();
        //             this.userBulletX = this.user.x+15;
        //         };
        //         case 'ArrowUp':{

        //             this.user.moveUp();
        //             this.userBulletX = this.user.x+15;
        //         };
        //         case 'ArrowDown':{
        //             this.user.moveDown();
        //             this.userBulletX = this.user.x+15;
        //         };
        //     }
            

        // });
    }

    loop(){
        if(!this.lose){

            this.clear();
            this.update();
            this.checkScore();
            this.checkLose1();
            this.checkLose2();

            if(this.checkBullet % 7 == 0){
                this.bullet.play();
                this.userBullet.unshift(new UserBullet(this, this.userBulletX));
                this.checkBullet = 0;
            }

            if(this.checkBoss % 8 == 0){
                this.boss[this.bossIdx] = new Boss(this);
                this.bossIdx++;
                this.checkBoss++;
            }
            
            this.timeBang.forEach((cur,ind)=>{
                if(cur.check == true){
                    cur.time--;
                }
            })
            
            this.checkBoom++;
            if(this.checkBoom % 30 == 0){
                this.createBoom();
                this.checkBoom = 0;
            }
            
            this.draw();
            setTimeout(()=>{
                this.checkBullet++;
                        this.loop();
                    },15);
        }
        else{
            this.die.play();
            setTimeout(()=>{

                this.loseboard = new Lose(this);
                this.loseboard.board.innerHTML = 'Lose! Score: '+this.score+'<br/>Click to replay';
                document.body.removeChild(this.canvas);
                document.body.removeChild(this.scoreBoard.board);
    
                this.scoreBoard = null;
                return;
            },1000);
        }
    }

    update(){
        this.boss.forEach((cur,ind)=>{
            cur.update();
        });

        // this.boom.forEach((cur,ind)=>{
        //     cur.update();
        // });
    }

    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    draw(){
        this.bg.draw();
        this.user.draw();
        this.boss.forEach((cur,ind)=>{
            cur.draw();
        });
        this.bang.forEach((cur,ind)=>{
            if(this.timeBang[ind].time > 0)
                cur.draw();
        });
       
        this.userBullet.forEach((cur,ind)=>{
            if(cur.y > -50){
                cur.update();
                cur.draw();
            }
            else{
                // this.bulletIdx = ind;
                this.userBullet.splice(ind,1);
            }
        });
        this.boom.forEach((cur,ind)=>{
            if(cur.y < 600){
                cur.update();
                cur.draw();
            }
            else{
                // this.bulletIdx = ind;
                this.boom.splice(ind,1);
            }
        });
    }

    randomBoom(){
        return Math.floor(Math.random()*7);
    }

    createBoom(){
        let rand = this.randomBoom();
        let x = this.boss[rand].x + 35;
        let y = this.boss[rand].y + 75;
        if(y < 200){
            this.boom.unshift(new Boom(this, x, y));
        }
        else return;
    }

    checkScore(){
        this.userBullet.forEach((cur,ind)=>{
            this.boss.forEach((bcur,bind)=>{
                if((cur.x+35 > bcur.x && cur.x < bcur.x+70) &&(cur.y < bcur.y+70)){
                    this.bang[bind] = new Bang(this);
                    this.bang[bind].x = bcur.x;
                    this.bang[bind].y = bcur.y;
                    this.timeBang[bind] = {check: true, time: 10};
                    this.hit.play();
                    bcur.random();
                    this.userBullet.splice(ind,1);
                    this.score++;
                    this.scoreBoard.score.innerHTML = 'score: '+this.score;
                }
            });
        });
    }

    checkLose1(){
        this.boss.forEach((cur,ind)=>{
            if(cur.y >= 530){
                if(this.life > 1){
                    this.life--;
                    this.scoreBoard.life.innerHTML = 'life: ' + this.life;
                    cur.random();
                    this.canvas.style = 'border: solid 20px red;'
                    setTimeout(()=>{
                        this.canvas.style = 'border: solid 20px black;'
                    },400)
                }
                else{
                    this.scoreBoard.life.innerHTML = 'life: ' + 0;
                    cur.changeLose();
                    this.lose = true;
                }
            }
        });
    }
    checkLose2(){
        this.boom.forEach((cur,ind)=>{
            if(cur.y >= 480 && (cur.x >= this.user.x && cur.x <= this.user.x+70)){
                if(this.life > 1){
                    this.life--;
                    this.die.play();
                    cur.changeLose();
                    this.scoreBoard.life.innerHTML = 'life: ' + this.life;
                    this.boom.splice(ind,1);
                    this.canvas.style = 'border: solid 20px red;'
                    setTimeout(()=>{
                        this.canvas.style = 'border: solid 20px black;'
                    },400)

                }
                else{
                    this.scoreBoard.life.innerHTML = 'life: ' + 0;
                    cur.changeLose();
                    this.user.changeLose();
                    this.lose = true;
                }
            }
        });
    }
}

var startBg = document.createElement('div');
var startBtn = document.createElement('button');
startBg.style = 'height: 600px; width: 1000px; border: 20px solid black; background: url("./img/bg.png"); display: flex; justify-content: center; align-items: center;';
startBtn.innerHTML = 'Start Game!';
startBtn.style = 'width: 300px; height: 100px; font-family:"Courier New", Courier, monospace; font-size: 30px; border-radius: 20px; background-image: linear-gradient(to right, rgb(116, 50, 122), rgb(211, 123, 123)); cursor: pointer;';

var game;
document.body.appendChild(startBg);
startBg.appendChild(startBtn);
startBtn.onclick = function(){
    startBg.style.display = 'none';
    game = new Game(GAMEWIDTH, GAMEHEIGHT);
}


