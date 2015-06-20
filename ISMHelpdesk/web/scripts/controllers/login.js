'use strict';

angular.module('ismsHelpDesk')
  .controller('LoginCtrl', function ($scope, UserService) {
    $scope.searchKey = "";    
    $scope.clearSearch = function () {    	
        $scope.searchKey = "";
        findAllEmployees();        
    }

    $scope.search = function () {
        UserService.findByName($scope.searchKey).then(function (employees) {
            $scope.employees = employees;
        });
    };

    var findAllEmployees = function() {
    	console.log("FIND ALL EMPLOYEES in controller");
        UserService.findAll().then(function (result) {
        	$scope.employees = result.data.employees; 
        	
            try{
            	$scope.$apply();
            }catch(e){}
        },function(err){
        	//do something here
        });
    };
    
    var getAllUSers = function() {
    	console.log("FIND ALL EMPLOYEES USERS........");
         
        UserService.getAllUsers().then(function (result) {
        	$scope.users = result.data.users;   
              
            try{
            	$scope.$apply();
                 alert("ALL USERS: " + JSON.stringify($scope.users));
            }catch(e){}
        },function(err){
        	//do something here
        });
    };
    
    $scope.login = function(){
        
    };    
     	
   getAllUSers();
       

  });
