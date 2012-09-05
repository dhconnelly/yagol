(function (global) {
'use strict';

var NUM_ROWS = 65,
    NUM_COLS = 100,
    TICK_INTERVAL = 100;

// ============================================================================
// Drawing

function Canvas(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.blockWidth = width / NUM_COLS;
    this.blockHeight = height / NUM_ROWS;
    this.oldBoard = null;
}

Canvas.prototype.drawSquare = function (row, col, live) {
    var ctx = this.ctx,
        width = this.blockWidth,
        height = this.blockHeight;
    ctx.fillStyle = live ? 'black' : 'white';
    ctx.fillRect(col * width, row * height, width, height);
};

Canvas.prototype.draw = function (board) {
    for (var i = 0; i < NUM_ROWS; i++) {
        for (var j = 0; j < NUM_COLS; j++) {
            if (!this.oldBoard || this.oldBoard[i][j] !== board[i][j]) {
                this.drawSquare(i, j, board[i][j]);
            }
        }
    }
    this.oldBoard = board;
};

// ============================================================================
// Simulation

function createBoard() {
    var board = [];
    for (var i = 0; i < NUM_ROWS; i++) {
        var row = [];
        for (var j = 0; j < NUM_COLS; j++) {
            row.push(global.Math.random() >= 0.5);
        }
        board.push(row);
    }
    return board;
}

function tick(oldBoard) {
    var newBoard = createBoard();
    for (var i = 0; i < NUM_ROWS; i++) {
        for (var j = 0; j < NUM_COLS; j++) {
            newBoard[i][j] = isLive(oldBoard, i, j);
        }
    }
    return newBoard;
}

function isLive(board, row, col) {
    var live = board[row][col];
    var nbrs = 0;
    for (var i = row - 1; i < row + 2; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = col - 1; j < col + 2; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === row && j === col) continue;
            if (board[i][j]) nbrs++;
        }
    }
    return !live && nbrs === 3 || live && (nbrs === 2 || nbrs === 3);
}

// ============================================================================
// Main

function main() {
    var cvs = global.document.getElementById('life-canvas');
    var canvas = new Canvas(cvs.getContext('2d'), cvs.width, cvs.height);
    var board = createBoard();
    global.setInterval(function () {
        canvas.draw(board);
        board = tick(board);
    }, TICK_INTERVAL);
}

global.addEventListener('DOMContentLoaded', main);

}(this));
