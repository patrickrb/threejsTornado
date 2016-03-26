'use strict';

angular.module('threeTornado')
    .directive('footer', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/footer/footer.html',
            link: function($scope) {
            }
        };
    });
