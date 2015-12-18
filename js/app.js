'use strict';

angular
.module('rotateAndMatch', ['mainGrid', 'element'])
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
})
.directive('setSize', function() {
	return {
        restrict: 'A',
        scope: {
            w: '=',
            h: '='
        },
        link: function(scope, elem, attr){
            scope.$watch('w', function(w){
            	elem.css('width', w);
                elem.css('height', w);
            });
            scope.$watch('h', function(h){
            	elem.css('width', h);
                elem.css('height', h);
            });
        }
    };
})
.filter('color', function() {           
   return function(element) {
       	var highlight = element.selected ? 32 : 0;
		return 'rgb(' 
			+ (highlight + element.value * 64 % 192 + 64) 
			+ ',' 
			+ (highlight + element.value * 16 % 128) 
			+ ',' 
			+ (highlight + element.value * 48 % 128 + 64) 
			+ ')';
   }
 });

