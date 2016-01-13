'use strict';

//////////////////////////////////////////////////////////////////////
// Single element in grid
//////////////////////////////////////////////////////////////////////
angular
.module('element', [])
.directive('elem', function() {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            size: '=',
            content: '='
        },
        templateUrl: 'js/view/element.html'
    }
});

