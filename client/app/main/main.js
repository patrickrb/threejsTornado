'use strict';

angular.module('threeTornado')
  .config(function($stateProvider) {
      $stateProvider
          .state('main', {
              url: '/',
              templateUrl: 'app/main/main.html',
              controller: 'MainController',
              controllerAs: 'main'
          });
  });
