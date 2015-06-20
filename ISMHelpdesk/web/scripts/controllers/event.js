'use strict';

angular.module('ismsHelpDesk')
  .controller('EventCtrl', function ($scope, EventService) {

    $scope.searchKey = "";    
    $scope.clearSearch = function () {    	
        $scope.searchKey = "";
        findAllEmployees();        
    }

    $scope.getEventById = function () {
        EventService.findById(eventId).then(function (event) {
            $scope.event = event;
        });
    };

    $scope.getEventsbyCreator = function() {    	
        EventService.findByCreator().then(function (result) {
        	$scope.event = result.data.event;         	
            try{
            	$scope.$apply();
            }catch(e){}
        },function(err){
        	//do something here
        });
    };    
    /**
     * function to find events with a specific status <unprocessed-0 processed-1>
     * @param {type} status
     * @returns {undefined}
     */
    $scope.getEventByStatus = function(status) {    	
        EventService.findByStatus(status).then(function (result) {
        	$scope.event = result.data.event;         	
            try{
            	$scope.$apply();
            }catch(e){}
        },function(err){
        	//do something here
        });
    };    
     	

  });
