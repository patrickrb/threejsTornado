'use strict';

angular.module('threeTornado')
    .directive('footer', function(tornadoOptionsService, sceneService) {
        return {
            restrict: 'E',
            templateUrl: 'components/footer/footer.html',
            link: function($scope) {
              console.log('tornado options: ', tornadoOptionsService);
              $scope.numCubesSlider = {
                value: sceneService.cubeCount,
                options: {
                  floor: 10,
                  ceil: 10000
                }
              };

              $scope.chaosSlider = {
                value: 5,
                options: {
                  floor: 1,
                  ceil: 10
                }
              };
            }
        };
    });
