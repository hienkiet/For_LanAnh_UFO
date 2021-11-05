class Lose{
    constructor(game){
        this.game = game;
        this.board;

        this.init();
    }
    init(){
        this.board = document.createElement('div');
        this.board.style = 'cursor: pointer;display: flex; width: 1040px;height: 200px;padding: 0;margin: 0;justify-content: center; align-items: center;font-size: 30px;background-image: linear-gradient(to right, rgb(116, 50, 122), rgb(211, 123, 123));font-family:"Courier New", Courier, monospace;'
        
        document.body.appendChild(this.board);
        this.board.onclick = ()=>{
            location.reload();
        }
    }
}