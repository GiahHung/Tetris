// variable
const cols = 10;
const rows = 20;
const blockSize = 30;
const color_mapping = [
    'red',
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'black'
];

const brick_layout =  [
    [
      [
        [1, 7, 7],
        [1, 1, 1],
        [7, 7, 7],
      ],
      [
        [7, 1, 1],
        [7, 1, 7],
        [7, 1, 7],
      ],
      [
        [7, 7, 7],
        [1, 1, 1],
        [7, 7, 1],
      ],
      [
        [7, 1, 7],
        [7, 1, 7],
        [1, 1, 7],
      ],
    ],
    [
      [
        [7, 1, 7],
        [7, 1, 7],
        [7, 1, 1],
      ],
      [
        [7, 7, 7],
        [1, 1, 1],
        [1, 7, 7],
      ],
      [
        [1, 1, 7],
        [7, 1, 7],
        [7, 1, 7],
      ],
      [
        [7, 7, 1],
        [1, 1, 1],
        [7, 7, 7],
      ],
    ],
    [
      [
        [1, 7, 7],
        [1, 1, 7],
        [7, 1, 7],
      ],
      [
        [7, 1, 1],
        [1, 1, 7],
        [7, 7, 7],
      ],
      [
        [7, 1, 7],
        [7, 1, 1],
        [7, 7, 1],
      ],
      [
        [7, 7, 7],
        [7, 1, 1],
        [1, 1, 7],
      ],
    ],
    [
      [
        [7, 1, 7],
        [1, 1, 7],
        [1, 7, 7],
      ],
      [
        [1, 1, 7],
        [7, 1, 1],
        [7, 7, 7],
      ],
      [
        [7, 7, 1],
        [7, 1, 1],
        [7, 1, 7],
      ],
      [
        [7, 7, 7],
        [1, 1, 7],
        [7, 1, 1],
      ],
    ],
    [
      [
        [7, 7, 7, 7],
        [1, 1, 1, 1],
        [7, 7, 7, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 1, 7],
        [7, 7, 1, 7],
        [7, 7, 1, 7],
        [7, 7, 1, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 7, 7, 7],
        [1, 1, 1, 1],
        [7, 7, 7, 7],
      ],
      [
        [7, 1, 7, 7],
        [7, 1, 7, 7],
        [7, 1, 7, 7],
        [7, 1, 7, 7],
      ],
    ],
    [
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
    ],
    [
      [
        [7, 1, 7],
        [1, 1, 1],
        [7, 7, 7],
      ],
      [
        [7, 1, 7],
        [7, 1, 1],
        [7, 1, 7],
      ],
      [
        [7, 7, 7],
        [1, 1, 1],
        [7, 1, 7],
      ],
      [
        [7, 1, 7],
        [1, 1, 7],
        [7, 1, 7],
      ],
    ],
  ];

const keyCode = {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp',
    down: 'ArrowDown',
};
  
const black_color_id = 7;

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = cols * blockSize;
ctx.canvas.height = rows * blockSize;

// BOARD
class Board{
    constructor(ctx){
        this.ctx = ctx;
        this.grid = this.generateBlackBoard();
        this.score = 0;
        this.gameOver = false;
        this.isPlaying = false;

        this.audio = new Audio('../tetris/sound/clear.wav');
    }

// instance method
    // mảng 2 chiều bảng
    generateBlackBoard(){
        return Array.from({length: rows}, () => Array(cols).fill(black_color_id));
    }

    drawCell(xAxis, yAxis, colorId){
        this.ctx.fillStyle = color_mapping[colorId] || color_mapping[black_color_id];
        this.ctx.fillRect(xAxis*blockSize, yAxis* blockSize, blockSize, blockSize);
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(xAxis* blockSize, yAxis* blockSize, blockSize, blockSize);
    }

    drawBoard(){
        for(let row =0; row < this.grid.length; row++){
            for(let col = 0; col < this.grid[0].length; col++){
                this.drawCell(col,row,this.grid[row][col]);
            }
        }
    }

    // lấp đầy 1 hàng
    handleCompleteRow(){
      const latesGrid = board.grid.filter((row) =>{
        return row.some(col => col  === black_color_id);
      });

      const newScore = rows - latesGrid.length;
      const newRow = Array.from({length: newScore}, () => Array(cols).fill(black_color_id));

      if(newScore){
        board.grid = [...newRow, ...latesGrid];
        this.handleScore(newScore *10);
        this.audio.play();
      }
    }

    handleScore(newScore){
    this.score += newScore;
    document.getElementById('score').innerHTML = this.score;
    }

    handleGameOver(){
      this.gameOver = true;
      this.isPlaying = false;
      ctx.font = "50px MV Bolo";
      ctx.fillStyle = "White";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER!", brick.rowPos = 9, brick.colPos = 1);
    }

    reset(){
      this.score = 0;
      this.grid = this.generateBlackBoard();
      this.gameOver = false;
      this.drawBoard();
    }
}

// BRICK
class Brick{
    constructor(id){
        this.id = id;
        this.layout = brick_layout[id]
        this.activeIndex = 0;
        this.colPos = 3;
        this.rowPos = -2;
    }

// instance method
    draw(){
        for(let row = 0; row < this.layout[this.activeIndex].length; row++){
            for(let col = 0; col < this.layout[this.activeIndex][0].length; col++){
                if(this.layout[this.activeIndex][row][col] !== black_color_id){
                    board.drawCell(col+this.colPos,row+this.rowPos,this.id)
                }
            }
        }
    }
    // xóa vị trí cũ
    clear(){
        for(let row = 0; row < this.layout[this.activeIndex].length; row++){
            for(let col = 0; col < this.layout[this.activeIndex][0].length; col++){
                if(this.layout[this.activeIndex][row][col] !== black_color_id){
                    board.drawCell(col+this.colPos,row+this.rowPos,black_color_id)
                }
            }
        }
    }

    moveLeft(){
      if(!this.checkCollision(this.rowPos, this.colPos - 1, this.layout[this.activeIndex])){
        this.clear();
        this.colPos --;
        this.draw();
      }
    }
    moveRight(){
      if(!this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])){
        this.clear();
        this.colPos ++;
        this.draw();
      }
    }
    moveDown(){
      if(!this.checkCollision(this.rowPos +1, this.colPos, this.layout[this.activeIndex])){
        this.clear();
        this.rowPos ++;
        this.draw();

        return;
      }
      this.handleLanded();
      if(!board.gameOver){
        generateNewBrick();
      }
    }
    rotate(){
      if(!this.checkCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])){
        this.clear();
        this.activeIndex = (this.activeIndex + 1) % 4;
        this.draw();
      }
    }

    // xử lý va chạm
    checkCollision(nextR, nextC, nextLayout){
      for(let row = 0; row < nextLayout.length; row++){
        for(let col = 0; col < nextLayout[0].length; col++){
            if(nextLayout[row][col] !== black_color_id && nextR >= 0){
                if((col + nextC < 0)  || (col + nextC >= cols) || (row + nextR >= rows) || (board.grid[row + nextR][col + nextC] !== black_color_id)) return true;
            }
        }
    }

     return false;
    }

    // chạm đáy
    handleLanded(){
      if(this.rowPos <= 0){
       board.handleGameOver();
        return;
      }

      for(let row = 0; row < this.layout[this.activeIndex].length; row++){
        for(let col = 0; col < this.layout[this.activeIndex][0].length; col++){
          if(this.layout[this.activeIndex][row][col] !== black_color_id){
           board.grid[row + this.rowPos][col + this.colPos] = this.id;
          }
        }
      }
      board.handleCompleteRow();
      board.drawBoard();
    }
}

// random brick
function generateNewBrick(){
  brick = new Brick(Math.floor(Math.random() * 10) % brick_layout.length);
}


board = new Board(ctx);
board.drawBoard();

// set play
document.getElementById('play').addEventListener('click',()=>{
  board.reset();
  board.isPlaying = true;
  generateNewBrick();

 // set thời gian rơi
 const refresh = setInterval(() => {
   if(!board.gameOver){
    brick.moveDown();
   }else{
    clearInterval(refresh);
   }
 },1000);
});

// cài đặt phím
document.addEventListener('keydown', (e)=>{
  if(!board.gameOver && board.isPlaying){
    console.log({e});
    switch(e.code){
        case keyCode.left:
            brick.moveLeft();
            break;
        case keyCode.right:
                brick.moveRight();
                break;
        case keyCode.up:
                brick.rotate();
                break;
        case keyCode.down:
                brick.moveDown();
                break;
        default:
            break;
    }
  }
})

