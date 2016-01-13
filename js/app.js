'use strict';

angular
.module('rotateAndMatch', ['mainGrid', 'defaultView'])
.controller('gameController', function(GridService, $scope) { 
    //////////////////////////////////////////////////////////////////////
    // Initial values:
    // gridSize     - length of the side of the game grid 
    // startLevel   - initial level i.e. how many random rotations are made 
    //////////////////////////////////////////////////////////////////////
    this.gridSize = 9;
    this.startLevel = 1;
    
    GridService.createGrid(this.gridSize);
    GridService.increaseRandomness(this.startLevel);
    GridService.randomizeGrid();
    
    this.model = GridService;
    
    $scope.getRandomness = function() { 
        return GridService.randomness; 
    };
});
