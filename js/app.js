'use strict';

angular
.module('rotateAndMatch', ['element', 'mainGrid'])
.controller('gameController', function(GridService) { 
	this.gridSize = 9;
	this.startLevel = 1;
	this.model = GridService;
	
	GridService.createGrid(this.gridSize);
	GridService.increaseRandomness(this.startLevel);
	GridService.randomizeGrid();

	this.getGrid = function() {
		return GridService.grid;
	};

	this.getElementSize = function() { 
		return GridService.elementSize; 
	};
	
	this.getWidth = function() { 
		return GridService.getWidth(); 
	};
	
	this.getBorders = function() { 
		return GridService.getBorders(); 
	};
	
	this.getRandomness = function() { 
		return GridService.randomness; 
	};
	
	this.rotate = function() { 
		GridService.rotate();
		if (GridService.checkPositions()) {
			GridService.createGrid(this.gridSize);
			GridService.increaseRandomness(1);
			GridService.randomizeGrid();
		}
	};

	this.toggleSelect = function(i) { 
		return GridService.toggleSelect(i); 
	};

	this.getColor = function(element) {
		return GridService.getColor(element); 
	};
});

