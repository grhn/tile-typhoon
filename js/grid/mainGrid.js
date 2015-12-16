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
		_this.grid = [];
		for (var i = 1; i <= Math.pow(size, 2); i++) {
			var element = {
				value: Math.floor((Math.random() * size) + 1),
				selected: false
			};
			_this.grid.push(element);
		}
		return _this.grid;
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
				return {value: element.value, selected: element.selected, i: index};
			})
			.filter(function(element) { 
				return element.selected; 
			})
			.forEach(function(element, index) {
				var newIndex = function(ind) {
					switch (ind) {
						case 0:
							return element.i + 1;
						case 1:
							return element.i + _this.size;
						case 2:
							return element.i - _this.size;
						case 3:
							return element.i - 1;
						default:
							return 0;
					};
				};
				_this.grid[newIndex(index)].value = element.value;
			});
	};

	this.toggleSelect = function(index) {
		var s = _this.size;
		if (index % s < s - 1 && index < Math.pow(s, 2) - s) {
			for (var i = 0; i < 4; i++) {
				var m = i > 1 ? s - 2 : 0;
				_this.grid[index + i + m].selected ^= true;
			}
		}
	};

	this.getColor = function(element) {	
		var highlight = element.selected ? 64 : 0;
		return 'rgb(' 
			+ (highlight + element.value * 64 % 192) 
			+ ',' 
			+ (highlight + element.value * 8 % 196) 
			+ ',' 
			+ (highlight + element.value * 48 % 196) 
			+ ')';
	};

	this.checkMatch = function() {
		// Recursively check for matches of three or more
		var grid = _this.grid;
		var matches = [];
		var visited = [];
		var s = _this.size;
		var max = Math.pow(s, 2);
		console.log('checking', grid);
		
		var validIndex = function(i) {
			return i >= 0 && i < max && jQuery.inArray(i, matches) == -1;
		};

		var onSameRow = function(i, j) {
			return (i - 1) % s < j % s;
		};

		var innerCheck = function(i, previousValue) {
			var value = grid[i].value;
			
			// Check neighbors
			if (value === previousValue) {
				matches.push(i);
				console.log(matches);

				if (validIndex(i - 1) && onSameRow(i - 1, i)) innerCheck(i - 1, value);
				if (validIndex(i + 1) && onSameRow(i, i + 1)) innerCheck(i + 1, value);
				if (validIndex(i - s)) innerCheck(i - s, value);
				if (validIndex(i + s)) innerCheck(i + s, value);
			}
		};

		grid.forEach(function(element, index) {
			innerCheck(index, element.value);
			if (matches.length > 2) {
				matches.forEach(function(i) { grid[i].value = 0; });
			}
			matches = [];
		});
	};
});
