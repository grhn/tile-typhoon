'use strict';

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
        templateUrl: 'js/grid/element.html',
        link: function(scope, elem, attr){
            scope.$watch('ngModel.elementSize', function(s){
                elem.css('width', s);
                elem.css('height', s);
            });
        }
    };
});

