'use strict';

angular
.module('mainGrid', [])
//////////////////////////////////////////////////////////////////////
// The model
//////////////////////////////////////////////////////////////////////
.service('GridService', function() {
    this.size = 0;
    this.randomness = 0;
    this.grid = [];
    var _this = this;
    
    //////////////////////////////////////////////////////////////////////
    // Initialize <size> x <size> grid
    //////////////////////////////////////////////////////////////////////
    this.createGrid = function(size) {
        _this.size = size;
        
        var innerSize = Math.round(Math.sqrt(size));
        
        var generateValue = function(i) {
            var sideLength = Math.floor(Math.sqrt(size));
            return Math.floor(i / innerSize) 
                % sideLength 
                + sideLength
                * Math.floor(i / (innerSize * size)) + 1;
        };

        for (var i = 0; i < Math.pow(size, 2); i++) {
            var element = {
                value: generateValue(i),
                focused: false
            };
            if (_this.grid.length <= i) _this.grid.push(element);
            else _this.grid[i] = element;
        }
    };

    this.increaseRandomness = function(n) {
        _this.randomness += n;
    };

    //////////////////////////////////////////////////////////////////////
    // Make random subgrid rotations
    //////////////////////////////////////////////////////////////////////
    this.randomizeGrid = function() {
        var s = _this.size;
        var j = s + 1;
        for (var i = 0; i < _this.randomness; i++) {
            var k = Math.floor(Math.random() * 2) + 1;
            j = (j + k) % (_this.grid.length - 2 * s) + s;
            _this.toggleFocus(j);
            _this.rotate();
            _this.toggleFocus(j);
        }
        if (_this.checkPositions()) _this.randomizeGrid();
    };

    //////////////////////////////////////////////////////////////////////
    // Rotate 3 x 3 subgrid (focused elements)
    //////////////////////////////////////////////////////////////////////
    this.rotate = function() {
        _this.grid
            .map(function(element, index) {
                return {
                    value: element.value, 
                    focused: element.focused, 
                    i: index,
                };
            })
            .filter(function(element) { 
                return element.focused; 
            })
            .forEach(function(element, index) {
                var s = _this.size;
                var newIndex = function(ind) {
                    switch (ind) {
                        case 0:
                        case 1:
                            return element.i + 1;
                        case 2:
                        case 5:
                            return element.i + s;
                        case 3:
                        case 6:
                            return element.i - s;
                        case 4:
                            return element.i;
                        case 7:
                        case 8:
                            return element.i - 1;
                        default:
                            return 0;
                    };
                };
                var newLocation = _this.grid[newIndex(index)];
                newLocation.value = element.value;
            });

        if (_this.checkPositions()) {
            _this.createGrid(_this.size);
            _this.increaseRandomness(1);
            _this.randomizeGrid();
        }
    };

    //////////////////////////////////////////////////////////////////////
    // Toggle focus state of elements in 3 x 3 subgrid where @index
    // is the middle element
    //////////////////////////////////////////////////////////////////////
    this.toggleFocus = function(index) {
        var s = _this.size;
        if (index > s && index % s > 0 && index % s < s - 1 && index < Math.pow(s, 2) - s) {
            for (var i = 0; i < 3; i++) {
                _this.grid[index + i - s - 1].focused ^= true;
            }
            for (var i = 0; i < 3; i++) {
                _this.grid[index + i - 1].focused ^= true;
            }
            for (var i = 0; i < 3; i++) {
                _this.grid[index + i + s - 1].focused ^= true;
            }
        }
    };

    //////////////////////////////////////////////////////////////////////
    // Check if element values are equal inside each n x n subgrid
    //////////////////////////////////////////////////////////////////////
    this.checkPositions = function() {
        var check = true;
        var squareSize = Math.round(Math.sqrt(_this.size));
        var n = Math.pow(squareSize, 2);
        for (var k = 0; k < _this.size; k++) {
            
            // Offset by first index of each subgrid
            var offset = Math.floor(k / squareSize) * squareSize * n + Math.floor(k * squareSize) % _this.size;
            
            // Comparision value
            var value = _this.grid[offset].value;
            for (var i = 0; i < squareSize; i++) {
                for (var j = offset; j < offset + squareSize; j++) {
                    
                    // Chain comparision results
                    check &= _this.grid[i * _this.size + j].value === value;
                }
            }
        }
        return check === 1;
    };
});
