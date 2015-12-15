'use strict';

angular
.module('rotateAndMatch', ['element', 'mainGrid'])
.controller('gameController', ['$scope', 'GridService', function($scope, GridService) { 
	this.title = 'rotate-and-match';
	this.elementSize = 100;
	this.size = 5;
	this.elements = GridService.createGrid(this.size, this.elementSize);
	this.width = GridService.getWidth();

	$scope.getBorders = function() {
		return 'width:' + (controller.elementSize + 'px') + ','
			+ 'height:' + (controller.elementSize + 'px') + ',';
	};

	$scope.rotate = function() {
		GridService.grid
			.map(function(element, index) {
				var cpy = jQuery.extend({}, element);
				return {content: cpy, i: index};
			})
			.filter(function(element) { 
				return element.content.selected; 
			})
			.forEach(function(element, index) {
				var s = GridService.size;
				var newIndex = function(ind) {
					switch (ind) {
						case 0:
							return element.i + 1;
						case 1:
							return element.i + s;
						case 2:
							return element.i - s;
						case 3:
							return element.i - 1;
					};
				};
				GridService.grid[newIndex(index)].value = element.content.value;
			});
	};

	$scope.toggleSelect = function(index) {
		var s = GridService.size;
		if (index % s < s - 1 && index < Math.pow(s, 2) - s) {
			for (var i = 0; i < 4; i++) {
				var m = i > 1 ? s - 2 : 0;
				GridService.grid[index + i + m].selected ^= true;
			}
		}
	};

	$scope.getColor = function(element) {
		var highlight = element.selected ? 64 : 0;
		return 'rgb(' 
			+ (highlight + element.value * 64 % 192) 
			+ ',' 
			+ (highlight + element.value * 8 % 196) 
			+ ',' 
			+ (highlight + element.value * 48 % 196) 
			+ ')';
	};

}]);

