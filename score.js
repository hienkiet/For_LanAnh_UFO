class Score{
    constructor(game){
        this.game = game;
        this.board;
        this.score;

        this.init();
    }

    init(){
        this.board = document.createElement('div');
        this.score = document.createElement('div');
        this.life = document.createElement('div');

        this.score.innerHTML = 'Score: 0';
        this.life.innerHTML = 'Life: 3';
        this.board.style = 'display: flex; width: 1040px;padding: 0;margin: 0;justify-content: center; align-items: center;'
        this.score.style = 'margin: 0;padding: 0;display: inline-flex;justify-content: center; align-items: center;color: white; font-size: 30px;background-image: linear-gradient(to right, rgb(116, 50, 122), rgb(211, 123, 123));font-family:"Courier New", Courier, monospace; width: 520px; height: 68px;'
        this.life.style = 'margin: 0;padding: 0;display: inline-flex;justify-content: center; align-items: center;color: white; font-size: 30px;background-image: linear-gradient(to right, rgb(116, 50, 122), rgb(211, 123, 123));font-family:"Courier New", Courier, monospace; width: 520px; height: 68px;'
        document.body.appendChild(this.board);
        this.board.appendChild(this.score);
        this.board.appendChild(this.life);

        
    }
}