angular.module('ismsHelpDesk', [])

/**
 * A simple example service that returns some data.
 */
.factory('EventService', function($q,$http) {
 
  //bluemix nodejs application route
  var base = "http://ismshelpdesk.mybluemix.net";

  return {
/**
 * function to find all events from database
 * @returns {$q@call;defer.promise}
 */	  
    findAllEvents: function() {      	
    	var deferred = $q.defer();    		
        var result = $http.get(base+"/events", {
            method: 'GET'
            }); 
        console.log(JSON.stringify(result));
        deferred.resolve(result);   	
        return deferred.promise;
    },
    /**
     * 
     * @param {type} eventId
     * @returns {$q@call;defer.promise}
    */
    findById: function(eventId) {        
        var deferred = $q.defer();
        var result = $http.get(base+"/events/" + eventId, {
            method: 'GET'
        });
        deferred.resolve(result);
        return deferred.promise;
    },
    
    /**
     * function to find all events by a specific creator
     * @param {type} creatorId
     * @returns {$q@call;defer.promise}
     */

    findByCreator: function (creatorId) {   	
        var deferred = $q.defer(),
            results = events.filter(function (element) {
                return parseInt(creatorId) === element.managerId;
            });
        deferred.resolve(results);
        return deferred.promise;
    },
    
    /**
     * function to find all events by a its status <processed-1, unprocessed-0>
     * @param {type} status
     * @returns {$q@call;defer.promise}
     */

    findByStatus: function (status) {   	
        var deferred = $q.defer(),
            results = events.filter(function (element) {
                return parseInt(status) === element.status;
            });
        deferred.resolve(results);
        return deferred.promise;
    }  
    
    
       
  }
});
