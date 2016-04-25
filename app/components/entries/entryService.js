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
			},
			addEntry: function(entry) {
				var data = JSON.stringify({
						supplement: entry.supplement,
						amount: parseFloat(entry.amount.toString()),
						measurementType: entry.measurementType
					});
				
				$http.post("http://localhost:8080/api/entries", data)
				.success(function (data, status) {
					
				})

			}
		}
	}
);