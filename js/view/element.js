'use strict';

//////////////////////////////////////////////////////////////////////
// Single element template
//////////////////////////////////////////////////////////////////////
angular
.module('element', [])
.directive('elem', function() {
    return {
        restrict: 'E',
        scope: {
            size: '=',
            content: '='
        },
        templateUrl: 'js/view/element.html'
    }
});

