'use strict';

angular.module('supplweb', ['ui.router', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'ui.grid.pagination'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('entries', {
		url: '/',
		templateUrl: 'app/components/entries/index.html'
	});

	$stateProvider.state('addentry', {
		url: '/entry/add',
		templateUrl: 'app/components/entries/addEntry.html'
	});

});