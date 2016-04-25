angular.module('supplweb')
.controller('entryCtl',
    function (entryService, uiGridConstants, $filter, $scope) {
    	
    	$scope.PageHeader = 'Supplement Entries';

        $scope.hasSelectedClients = function() {
            return $scope.gridApi && $scope.gridApi.selection.getSelectedRows().length > 0;
        }

        $scope.gridOptions = {
            enableRowSelection: false,
            multiSelect: false,
            enableSelectAll: false,
            selectionRowHeaderWidth: 35,
            enableHorizontalScrollbar: 0, 
            enableVerticalScrollbar: 0,
            enablePaginationControls: true,
            paginationPageSizes: [],
            paginationPageSize: 10,
            enableFiltering: false,
            rowHeight: 35,
            isRowSelectable: function(row){
                return false;
            }
          };

        $scope.gridOptions.onRegisterApi = function(gridApi){
          $scope.gridApi = gridApi;
        }

        $scope.gridOptions.columnDefs = [
            { field: 'supplement', displayName: 'Supplement'},
            { field: 'amount', displayName: 'Measurement', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.amount}} {{row.entity.measurementType}}</div>' },
            { field: 'dateTaken', displayName: 'Date', type: 'date', cellFilter: 'date:\'MM/dd/yyyy\'' }
        ];

        $scope.getEntries  = function() {
           entryService.getEntries()
           .then(function(results) {
                var entries = results.data;
                $scope.entries = entries.reverse();
                $scope.gridOptions.data = entries;
                $scope.gridOptions.enablePaginationControls = $scope.entries.length > 10;
                $scope.gridOptions.totalItems = entries.length;
                $scope.gridApi.core.refresh();
           }, function(error) {
                $scope.errorMessage = error.data.message || "An unknown error has occurred.";
           });
        };

        $scope.newEntry = {
                supplement: '',
                amount: 0,
                measurementType: ''
            };

        

        $scope.addEntry = function() {
            entryService.addEntry($scope.newEntry);
            $scope.getEntries();
            window.location.reload();
        }

        $scope.clear = function() {
            $scope.newEntry = {
                supplement: '',
                amount: 0,
                measurementType: ''
            };
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

        angular.element(document).ready(function () {
            $scope.getEntries();
        });
    }
);
