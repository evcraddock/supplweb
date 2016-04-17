'use strict';

angular.module('supplweb', ['ui.router', 'ui.bootstrap'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('entries', {
		url: '/',
		templateUrl: 'app/components/entries/index.html'
	});

});