'use strict';

angular
.module('element', [])
.directive('elem', function() {
    return {
        restrict: 'E',
        scope: {
            size: '@',
            value: '@',
            index: '@',
            controller: '='
        },
        templateUrl: 'js/grid/element.html'
    };
});