'use strict';

angular.module('ismsHelpDesk')
  .controller('AboutCtrl', function ($scope) {
    $scope.searchKey = "";    
    $scope.clearSearch = function () {    	
        $scope.searchKey = "";
        findAllEmployees();        
    }

    $scope.search = function () {
        EmployeeService.findByName($scope.searchKey).then(function (employees) {
            $scope.employees = employees;
        });
    }

    var findAllEmployees = function() {
    	console.log("FIND ALL EMPLOYEES in controller");
        EmployeeService.findAll().then(function (result) {
        	$scope.employees = result.data.employees; 
        	$rootScope.employees = $scope.employees;
            try{
            	$scope.$apply();
            }catch(e){}
        },function(err){
        	//do something here
        });
    }
    if($rootScope.employees != null ){    	
    	$scope.employees = $rootScope.employees;
    	$rootScope.employees = null;
    	 try{
         	$scope.$apply();
         }catch(e){}
    }else{    	
    	findAllEmployees();
    }    

  });
