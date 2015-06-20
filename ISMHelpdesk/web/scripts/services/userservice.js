angular.module('ismsHelpDesk', [])

/**
 * A simple example service that returns some data.
 */
.factory('UserService', function($q,$http) {
 
  //bluemix nodejs application route
  var base = "http://ismshelpdesk.mybluemix.net";

  return {
	  
    findAll: function() {  
    	console.log("FIND ALL Users");
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
    }
  }
});
