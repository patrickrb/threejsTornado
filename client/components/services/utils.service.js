'use strict';

angular.module('threeTornado')
  .service('utilsService', function () {
    class UtilsService {
            constructor() {
            }

            randNum(min, max) {
                return Math.random() * (max - min) + min;
            }
        }
        return new UtilsService();
  });
