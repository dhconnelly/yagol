(function (global) {

var console = global.console,
    document = global.document,
    Math = global.Math;

var NUM_ROWS = 10,
    NUM_COLS = 10,
    NUM_TURNS = 10;

// ============================================================================
// Drawing

function setupContext(context) {

}

function draw(context, oldBoard, newBoard) {
    console.log('Drawing board');
}

// ============================================================================
// Simulation

function randomCell() {
    return Math.random() >= 0.5;
}

function createBoard() {
    var board = [];
    for (var i = 0; i < NUM_ROWS; i++) {
        var row = [];
        for (var j = 0; j < NUM_COLS; j++) {
            row.push(randomCell());
        }
        board.push(row);
    }
    return board;
}

function tick(oldBoard) {
    return oldBoard;
}

function isLive(board, row, col) {
    return false;
}

// ============================================================================
// Main

function main() {
    console.log('Starting Game of Life');

    var canvas = document.getElementById('life-canvas');
    var context = canvas.getContext('2d');
    setupContext(context);

    var oldBoard = null;
    var newBoard = createBoard();
    for (var i = 0; i < NUM_TURNS; i++) {
        draw(context, oldBoard, newBoard);
        oldBoard = newBoard;
        newBoard = tick(oldBoard);
    }
}

global.addEventListener('DOMContentLoaded', main);

}(this));
