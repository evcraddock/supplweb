'use strict';

angular.module('supplweb')
.factory('entryService', 

	function ($http) {
		return {
			getEntries: function() {
				var req = {
				    method: 'GET',
				    url: 'http://localhost:8080/api/entries'
				}

				return $http(req);
			}
		}
	}
);