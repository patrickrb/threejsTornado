'use strict';

angular.module('threeTornado')
    .directive('footer', function(tornadoOptionsService, sceneService, animationService) {
        return {
            restrict: 'E',
            templateUrl: 'components/footer/footer.html',
            link: function($scope) {
              $scope.numCubesSlider = {
                value: sceneService.cubeCount,
                options: {
                  floor: 10,
                  ceil: 10000,
                  onChange: function(sliderId, modelValue, highValue){
                    sceneService.setCubeCount(modelValue);
                  }
                }
              };

              $scope.chaosSlider = {
                value: 5,
                options: {
                  floor: 1,
                  ceil: 10,
                  onChange: function(sliderId, modelValue, highValue){
                    animationService.setSpeed(modelValue);
                  }
                }
              };
            }
        };
    });
