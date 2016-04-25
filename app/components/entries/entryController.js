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

        angular.element(document).ready(function () {
            $scope.getEntries();
        });
    }
);
