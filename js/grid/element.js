'use strict';

angular
.module('element', [])
.directive('elem', function() {
    return {
        restrict: 'E',
        scope: {
            size: '@'
        },
        templateUrl: 'js/grid/element.html'
    };
});