'use strict';

angular.module('ismsHelpDesk')
  .controller('LoginCtrl', function ($scope, UserService) { 

    var getAllUsers = function() {    	
        UserService.findAll().then(function (result) {
        	$scope.employees = result.data.employees;         	
            try{
            	$scope.$apply();
            }catch(e){}
        },function(err){
        	//do something here
        });
    };
    
    
    $scope.login = function(){
        getAllUsers();
        for (var user in $scope.employees) {
            if ((user.password === $scope.credentials.username) && (user.username === $scope.credetials.password)) {
               console.log("Logged in with account: "+ $scope.credentials.username);
               go('/results');
            }
        }
    };  
       

  });
