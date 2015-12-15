angular
.module('mainGrid', [])
.service('GridService', function() {
	this.size = 0;
	this.elementSize = 10;
	this.grid = [];
	
	this.createGrid = function(size, elementSize) {
		this.size = size;
		this.elementSize = elementSize;
		this.grid = [];
		for (var i = 1; i <= Math.pow(size, 2); i++) {
			var element = {
				value: i,
				selected: false
			};
			this.grid.push(element);
		}
		return this.grid;
	};

	this.getWidth = function() {
		return this.size * this.elementSize;
	};
});