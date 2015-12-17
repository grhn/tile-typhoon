angular
.module('mainGrid', [])
.service('GridService', function() {
	this.size = 0;
	this.elementSize = 10;
	this.grid = [];
	var _this = this;
	
	this.createGrid = function(size, elementSize) {
		_this.size = size;
		_this.elementSize = elementSize;
		
		var generateValue = function(i) {
			var sideLength = Math.floor(Math.sqrt(size));
			return Math.floor(i / 3) 
				% sideLength 
				+ sideLength
				* Math.floor(i / (3 * size)) + 1;
		};

		for (var i = 0; i < Math.pow(size, 2); i++) {
			var element = {
				value: generateValue(i),
				selected: false,
				rotation: 0
			};
			if (_this.grid.length <= i) _this.grid.push(element);
			else _this.grid[i] = element;
		}
	};

	this.randomizeGrid = function(n) {
		var s = _this.size;
		var j = s + 1;
		for (var i = 0; i < n; i++) {
			var k = Math.floor(Math.random() * _this.size) + 1;
			j = (j + k) % (_this.grid.length - 2 * s) + s;
			_this.toggleSelect(j);
			_this.rotate();
			_this.toggleSelect(j);
		}
		if (_this.checkPositions()) _this.randomizeGrid(n);
	};

	this.getWidth = function() {
		return _this.size * _this.elementSize;
	};

	this.getBorders = function() {
		return 'width:' + (_this.elementSize + 'px') + ','
			+ 'height:' + (_this.elementSize + 'px') + ',';
	};

	this.rotate = function() {
		_this.grid
			.map(function(element, index) {
				return {
					value: element.value, 
					selected: element.selected, 
					rotation: element.rotation,
					i: index,

				};
			})
			.filter(function(element) { 
				return element.selected; 
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
				newLocation = _this.grid[newIndex(index)];
				newLocation.value = element.value;
				newLocation.rotation = (element.rotation + 1) % 4;
			});
	};

	this.rotate2 = function() {
		_this.grid
			.map(function(element, index) {
				return {
					value: element.value, 
					selected: element.selected, 
					rotation: element.rotation,
					i: index,

				};
			})
			.filter(function(element) { 
				return element.selected; 
			})
			.forEach(function(element, index) {
				_this.grid[element.i].rotation = (element.rotation + 1) % 4;
			});
	};

	this.toggleSelect = function(index) {
		var s = _this.size;
		if (index % s > 0 && index % s < s - 1 && index < Math.pow(s, 2) - s) {
			for (var i = 0; i < 3; i++) {
				_this.grid[index + i - s - 1].selected ^= true;
			}
			for (var i = 0; i < 3; i++) {
				_this.grid[index + i - 1].selected ^= true;
			}
			for (var i = 0; i < 3; i++) {
				_this.grid[index + i + s - 1].selected ^= true;
			}
		}
	};

	this.getColor = function(element) {	
		var highlight = element.selected ? 32 : 0;
		return 'rgb(' 
			+ (highlight + element.value * 64 % 192 + 64) 
			+ ',' 
			+ (highlight + element.value * 16 % 128) 
			+ ',' 
			+ (highlight + element.value * 48 % 128 + 64) 
			+ ')';
	};

	this.checkMatch = function() {
		// Recursively check for matches of three or more
		var grid = _this.grid;
		var matches = [];
		var s = _this.size;
		var max = Math.pow(s, 2);
		
		var validIndex = function(i) {
			return i >= 0 && i < max && jQuery.inArray(i, matches) == -1;
		};

		var onSameRow = function(i, j) {
			if (i <= j) return i % s <= j % s;
			else return i % s > j % s;
		};

		var innerCheck = function(i, previousValue, previousRotation) {
			var value = grid[i].value;
			var rotation = grid[i].rotation;
			
			// Check neighbors
			if (value === previousValue + 1 && rotation === previousRotation) {
				matches.push(i);
				
				if (validIndex(i - 1) && onSameRow(i - 1, i)) innerCheck(i - 1, value, rotation);
				if (validIndex(i + 1) && onSameRow(i, i + 1)) innerCheck(i + 1, value, rotation);
				if (validIndex(i - s)) innerCheck(i - s, value, rotation);
				if (validIndex(i + s)) innerCheck(i + s, value, rotation);
			}
		};

		grid.forEach(function(element, index) {
			innerCheck(index, element.value - 1, element.rotation);
			if (matches.length > 2) {
				matches.forEach(function(i) { 
					grid[i].value = 0; 
				});
			}
			matches = [];
		});
	};

	this.checkPositions = function() {
		var check = true;
		var squareSize = Math.round(Math.sqrt(_this.size));
		var n = Math.pow(squareSize, 2);
		for (var k = 0; k < _this.size; k++) {
			var offset = Math.floor(k / squareSize) * squareSize * n + Math.floor(k * squareSize) % _this.size;
			var value = _this.grid[offset].value;
			for (var i = 0; i < squareSize; i++) {
				for (var j = offset; j < offset + squareSize; j++) {
					check &= _this.grid[i * _this.size + j].value === value;
				}
			}
		}
		return check;
	};
});
