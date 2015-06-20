'use strict';

angular.module('ismsHelpDesk')
  .controller('MainCtrl', function ($scope, $http, $rootScope, $location, UserService, EventService) {

    $scope.searchKey = "";    
    $scope.clearSearch = function () {    	
        $scope.searchKey = "";
        findAllEmployees();        
    };

    $scope.search = function () {
        UserService.findByName($scope.searchKey).then(function (employees) {
            $scope.employees = employees;
        });
    };

    $scope.getAllUsers = function() {    	
        UserService.findAll().then(function (result) {
        	$scope.employees = result.data.employees;         	
            try{
            	$scope.$apply();
            }catch(e){}
        },function(err){
        	//do something here
        });
    };
    
  /**
   * function to get all events those are not processed
   * @returns {undefined}
   */
    $scope.getUnprocessedEvents = function() {    	
        EventService.findByStatus(0).then(function (result) {
        	$scope.events = result.data.events;         	
            try{
            	$scope.$apply();
            }catch(e){}
        },function(err){
        	//do something here
        });
    };
    
    /**
     * function to get all events those are processed
     * @returns {undefined}
     */
    $scope.getProcessedEvents = function() {    	
        EventService.findByStatus(1).then(function (result) {
        	$scope.events = result.data.events;         	
            try{
            	$scope.$apply();
            }catch(e){}
        },function(err){
        	//do something here
        });
    };
    
    /**
     * function to login
     * @returns {undefined}
     */
    $scope.login = function(){
        getAllUsers();
        for (var user in $scope.employees) {
            if ((user.password === $scope.credentials.username) && (user.username === $scope.credetials.password)) {
               console.log(data[key].id);
            }
        }
    };    
     	

  });