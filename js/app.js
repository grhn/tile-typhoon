'use strict';

angular
.module('rotateAndMatch', ['mainGrid', 'element'])
.controller('gameController', function(GridService) { 
    //////////////////////////////////////////////////////////////////////
    // Initial values:
    // gridSize     - length of the side of the game grid 
    // startLevel   - initial level i.e. how many random rotations are made 
    // TODO: generalize size for all n^2, where n > 1 is integer
    //////////////////////////////////////////////////////////////////////
    this.gridSize = 9;
    this.startLevel = 1;
    
    GridService.createGrid(this.gridSize);
    GridService.increaseRandomness(this.startLevel);
    GridService.randomizeGrid();
    
    this.model = GridService;
    
    this.getWidthPixels = function() { 
        return GridService.getWidthPixels(); 
    };
    
    this.getRandomness = function() { 
        return GridService.randomness; 
    };
})
//////////////////////////////////////////////////////////////////////
// Bind CSS width / height properties to expressions <w> and <h>
//////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////
// Parse CSS color property from element
//////////////////////////////////////////////////////////////////////
.filter('color', function() {           
   return function(element) {
        var highlight = element.focused ? 32 : 0;
        return 'rgb(' 
            + (highlight + element.value * 64 % 192 + 64) 
            + ',' 
            + (highlight + element.value * 16 % 128) 
            + ',' 
            + (highlight + element.value * 48 % 128 + 64) 
            + ')';
   }
 });

