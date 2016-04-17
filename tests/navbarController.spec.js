'use strict';

describe('Given a user loads any page', function(){

	var scope;
	var ctrl;

	beforeEach(module('supplweb'));

	describe('When the navbar view is loaded', function() {



		beforeEach(inject(function($q, $rootScope, $controller, $state) {
			scope = $rootScope.$new();

			var fakeState = {}

			ctrl = $controller('navbarCtl as navbar', { 
				$scope: scope, 
				$state: fakeState
			});
		}));

		it('then Page title should have a value', function(){
			expect(scope.pageTitle).to.equal('Supple Ments');
		});
	});
});