'use strict';

angular
.module('rotateAndMatch', ['element', 'mainGrid'])
.controller('gameController', function(GridService) { 
	this.elementSize = 100;
	this.size = 4;

	this.elements = GridService.createGrid(this.size, this.elementSize);

	this.getWidth = function() { 
		return GridService.getWidth(); 
	};
	
	this.getBorders = function() { 
		return GridService.getBorders(); 
	};
	
	this.rotate = function() { 
		GridService.rotate(); 
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

