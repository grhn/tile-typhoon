'use strict';

angular
.module('element', [])
.directive('elem', function() {
    return {
        restrict: 'E',
        scope: {
            target: '='
        },
        templateUrl: 'js/grid/element.html'
    };
});
