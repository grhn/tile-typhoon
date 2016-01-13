'use strict';

angular
.module('defaultView', ['element'])
//////////////////////////////////////////////////////////////////////
// Bind CSS width / height properties to expressions <w> and <h>
//////////////////////////////////////////////////////////////////////
.directive('setSize', function() {
    return {
        restrict: 'A',
        scope: {
            w: '=',
            h: '='
        },
        link: function($scope, elem, attr){
            $scope.$watch('w', function(w){
                elem.css('width', w);
            });
            $scope.$watch('h', function(h){
                elem.css('height', h);
            });
        }
    }
})
//////////////////////////////////////////////////////////////////////
// Parse CSS color property from element
//////////////////////////////////////////////////////////////////////
.filter('color', function() {           
   return function(element) {
        var highlight = element.focused ? 32 : 0;
        return 'rgb(' 
            + (highlight + element.value * 64 % 192 + 64) 
            + ',' 
            + (highlight + element.value * 16 % 128) 
            + ',' 
            + (highlight + element.value * 48 % 128 + 64) 
            + ')';
   }
 })
//////////////////////////////////////////////////////////////////////
// Game grid template
//////////////////////////////////////////////////////////////////////
.directive('gameGrid', function() {
    return {
        restrict: 'A',
        scope: {
            ngModel: '=',
            gridSize: '='
        },
        templateUrl: 'js/view/mainGrid.html'
    }
});
