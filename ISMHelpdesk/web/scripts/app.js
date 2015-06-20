'use strict';

/**
 * @ngdoc overview
 * @name recruiterApp
 * @description
 * # recruiterApp
 *
 * Main module of the application.
 */
angular
  .module('ismsHelpDesk', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .filter('capitalize', function() {
   return function(input, scope) {
     var stringArray = input.split(' ');
     for (var i=0; i<=stringArray.length; i++) {
      if (stringArray[i] != null) {
        stringArray[i] = stringArray[i].toLowerCase();
        stringArray[i] = stringArray[i].substring(0,1).toUpperCase() + stringArray[i].substring(1);
      }
     }
     return stringArray.join(' ');
   }
  })
  .filter('percentage', ['$filter', function($filter) {
    return function(input, decimals) {
        return $filter('number')(input*100, decimals)+'%';
    };
  }])
  .filter('decimals', ['$filter', function($filter) {
    return function(input, decimals) {
        return $filter('number')(input*1, decimals)+'%';
    };
  }])
  .directive('eventModal', function() {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'views/event-modal.html',
      controller: 'EventCtrl'
    };
  })
  .directive('capitalize', function() {
     return {
       require: 'ngModel',
       link: function(scope, element, attrs, modelCtrl) {
          var capitalize = function(inputValue) {
             if(inputValue == undefined) inputValue = '';
             var capitalized = inputValue.toUpperCase();
             if(capitalized !== inputValue) {
                modelCtrl.$setViewValue(capitalized);
                modelCtrl.$render();
              }
              return capitalized;
           }
           modelCtrl.$parsers.push(capitalize);
           capitalize(scope[attrs.ngModel]);  // capitalize initial value
       }
     };
  })
  .run(function($rootScope, $location, $http) {
    
  })
;
