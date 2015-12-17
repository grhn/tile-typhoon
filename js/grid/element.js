'use strict';

angular
.module('element', [])
.directive('elem', function() {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            size: '='
        },
        templateUrl: 'js/grid/element.html',
        link: function(scope, elem, attr){
            scope.$watch('size', function(value){
                elem.css('width', value);
                elem.css('height', value);
            });
        }
    };
});