angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('UserService', function($q,$http) {
 
  //bluemix nodejs application route
  var base = "http://ismshelpdesk.mybluemix.net";

  return {
	  
    findAll: function() {  
    	console.log("FIND ALL EMPLOYEES in services ");
    	var deferred = $q.defer();    		
        var result = $http.get(base+"/employees", {
            method: 'GET'
            }); 
        console.log(JSON.stringify(result));
        deferred.resolve(result);   	
        return deferred.promise;
    },

    findById: function(employeeId) {        
        var deferred = $q.defer();
        var result = $http.get(base+"/employee/"+employeeId, {
            method: 'GET'
        });
        deferred.resolve(result);
        return deferred.promise;
    },
    
    findEmpByManagerId: function(managerId){
    	var deferred = $q.defer();
    	var result = $http.get(base + "/employeesByManager/"+managerId,{method: "GET"});
    	deferred.resolve(result);
    	return deferred.promise;
    },

    findByName: function(searchKey) {
        var deferred = $q.defer();
        var results = employees.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        deferred.resolve(results);
        return deferred.promise;
    },

    findByManager: function (managerId) {   	
        var deferred = $q.defer(),
            results = employees.filter(function (element) {
                return parseInt(managerId) === element.managerId;
            });
        deferred.resolve(results);
        return deferred.promise;
    }
  }
});
