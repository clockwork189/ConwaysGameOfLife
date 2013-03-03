var Main = function () {
	var self = {};
	var canvas = document.getElementById("mainGameCanvas");
	var context = canvas.getContext("2d");
	var matrix;
	var newMatrix;
	var rows = 15;
	var columns = 30;
	var frameCount = 0;
	var lastWave = 0;

	var life;
	self.init = function () {
		life = new GameOfLife();
		matrix = life.init(rows, columns);
		loop();
	};
	// Gets Animated Frames from the browser
	var requestAnimationFrame = (function () {
			return  window.requestAnimationFrame       ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame     ||
					function(/* function */ callback, /* DOMElement */ element){
						window.setTimeout(callback, 1000 / 60);
					};
	})();

	//A simple random generator
	var random = function (min, max) {
		return Math.random() * (max - min) + min;
	};

	var drawGrid = function () {
		for (var i = 0; i < matrix.length; i++) {
			for (var j = 0; j < matrix.length; j++) {
				if(matrix[i][j] == 0) {
					console.log("$$$$$$$$$$$$$$$$$$$$$$");
					context.beginPath();
					context.rect(i * 50, j * 50, 50, 50);
					context.fillStyle = 'white';
					context.fill();
					context.lineWidth = 1;
					context.strokeStyle = 'black';
					context.stroke();
				} else {
					context.beginPath();
					console.log("****************");
					context.rect(i * 50, j * 50, 50, 50);
					context.fillStyle = 'yellow';
					context.fill();
					context.lineWidth = 1;
					context.strokeStyle = 'black';
					context.stroke();
				}
			}
		}
	};
	var generateCitizen = function () {
		console.log(lastWave, "   ", frameCount);
		if((frameCount - lastWave) > 500) {
			var xAxis = parseInt(random(0, columns), 10);
			var yAxis = parseInt(random(0, rows),10);
			matrix[yAxis][xAxis] = 1;
			console.log(matrix[yAxis][xAxis], "    ", yAxis, "    ", xAxis);
			lastWave = frameCount;
		}
	};

	var loop = function () {
		frameCount += 1;
		generateCitizen();
		var newMatrix = life.getNextGen(matrix);
		matrix = newMatrix;
		drawGrid();
		requestAnimationFrame(loop);
	};

	return self;
};

var main = new Main();
main.init();