angular.module('supplweb')
.controller('addEntryCtl',
    function (entryService, $filter, $scope, $state) {
    	
    	$scope.PageHeader = 'Add Entry';

        $scope.newEntry = {
                supplement: '',
                amount: 0,
                measurementType: ''
            };

        $scope.addEntry = function() {
            entryService.addEntry($scope.newEntry);
            $state.go('entries');
        }

        $scope.quickAddEntries = [
            {
                supplement: '100% Chelated Magnesium',
                amount: 200,
                measurementType: 'mg'
            },
            {
                supplement: 'Potassium Citrate',
                amount: 99,
                measurementType: 'mg'
            },
            {
                supplement: 'Mens Health Multivitamin',
                amount: 1,
                measurementType: 'capsule'
            },
            {
                supplement: 'KetoOs',
                amount: 22.3,
                measurementType: 'g'
            } 
        ];

        $scope.measurementTypes = ["g", "mg", "capsule"];

        $scope.toggleMeasurementType = function(measurementType) {
            $scope.newEntry.measurementType = measurementType;
        }

        $scope.toggleQuickAdd = function(entry) {
            $scope.newEntry = entry;
        }

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
        };

    }
);
