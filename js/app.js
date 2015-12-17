'use strict';

angular
.module('rotateAndMatch', ['element', 'mainGrid'])
.controller('gameController', function(GridService) { 
	this.size = 9;
	this.randomLevel = 10;
	this.elementSize = Math.floor(500 / this.size);
	
	GridService.createGrid(this.size, this.elementSize);
	GridService.randomizeGrid(this.randomLevel);
	this.grid = GridService.grid;

	this.getWidth = function() { 
		return GridService.getWidth(); 
	};
	
	this.getBorders = function() { 
		return GridService.getBorders(); 
	};
	
	this.rotate = function() { 
		GridService.rotate();
		if (GridService.checkPositions()) {
			this.randomLevel += 1;
			GridService.createGrid(this.size, this.elementSize);
			GridService.randomizeGrid(this.randomLevel);
		}
	};

	this.rotate2 = function() { 
		GridService.rotate2(); 
	};

	this.toggleSelect = function(i) { 
		return GridService.toggleSelect(i); 
	};

	this.getColor = function(element) {
		return GridService.getColor(element); 
	};

	this.checkMatch = function() {
		GridService.checkMatch();
	};
});

