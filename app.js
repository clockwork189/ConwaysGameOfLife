var GameOfLife = function () {
    var self = {};

    self.init = function (rows, columns) {
        var grid = [];
        for(var i = 0; i < rows; i++) {
            var row = [];
            for(var j = 0; j < columns; j++) {
                var column = [0];
                row.push(column);
            }
            grid.push(row);
        }
        return grid;
    };

    var getNumberOfNeighbors = function (matrix, i, j) {
        var left = i - 1;
        var right = i + 1;
        var down = j - 1;
        var up = j + 1;
        var numAliveCells = 0;

        if(check2DMatrix(matrix, i, up)) {
            numAliveCells = addCount(numAliveCells, matrix[i][up]);
        }
        if(check2DMatrix(matrix, i, down)) {
            numAliveCells = addCount(numAliveCells, matrix[i][down]);
        }
        if(check2DMatrix(matrix, right, j)) {
            numAliveCells = addCount(numAliveCells, matrix[right][j]);
        }
        if(check2DMatrix(matrix, left, j)) {
            numAliveCells = addCount(numAliveCells, matrix[left][j]);
        }
        if(check2DMatrix(matrix, left, up)) {
            numAliveCells = addCount(numAliveCells, matrix[left][up]);
        }
        if(check2DMatrix(matrix, left, down)) {
            numAliveCells = addCount(numAliveCells, matrix[left][down]);
        }
        if(check2DMatrix(matrix, right, up)) {
            numAliveCells = addCount(numAliveCells, matrix[right][up]);
        }
        if(check2DMatrix(matrix, right, down)) {
            numAliveCells = addCount(numAliveCells, matrix[right][down]);
        }
        return numAliveCells;
    };

    var check2DMatrix = function (matrix, i, j) {
        if(matrix[i] !== undefined) {
            if(matrix[i][j] !== undefined) {
                return true;
            }
        }
        return false;
    };

    var addCount = function (counter, val) {
        if(val === 0) {
            counter++;
        }
        return counter;
    };

    self.getNextGen = function (matrix) {
        var newMatrix = matrix;
        for(var i = 0; i < matrix.length; i++) {
            for(var j = 0; j < matrix[i].length; j++) {
                if(check2DMatrix(matrix, i, j)) {
                    var numNeighbors = getNumberOfNeighbors(matrix, i , j);
                    var oldMatrixSpot = matrix[i][j];
                    if(oldMatrixSpot == 1) {
                        if(numNeighbors < 2 || numNeighbors > 3) {
                            newMatrix[i][j] = 0;
                        }
                    } else if(oldMatrixSpot == 0) {
                        if(numNeighbors == 3) {
                            newMatrix[i][j] = 1;
                        }
                    }
                }
            }
        }
        return newMatrix;
    };

    return self;
};