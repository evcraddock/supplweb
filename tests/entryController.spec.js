'use strict';

describe('Given a user with access', function(){

	var scope;
	var ctrl;

	beforeEach(module('supplweb'));

	describe('When the entry view is loaded', function() {
		var entryService;
		
		beforeEach(inject(function($q, $rootScope, $controller, _entryService_) {
			entryService = _entryService_;
			
			scope = $rootScope.$new();

			var fakeGridApi = {
				selection: {
					getSelectedRows: function() {
						return [];
					}
				}
			}

			var fakeEntries = [{
					supplement: 'test supplement',
					amount: 1.2,
					measurementType: 'mg',
					dateTaken: new Date()
				}]

			sinon.stub(entryService, "getEntries").returns($q(function(resolve, reject) {
				scope.entries = fakeEntries;
				resolve(fakeEntries);
			}));

			scope.gridApi = sinon.stub(fakeGridApi);
			ctrl = $controller('entryCtl', { $scope: scope, entryService: entryService });
		}));

		it ('we should get a list of entries', function() {
			expect(entryService).to.exist;
			expect(scope.gridOptions).to.exist;

			scope.getEntries();
			expect(scope.entries).to.exist;
			expect(entryService.getEntries.calledOnce).to.equal(true);
		});
		
		it('the Page header should have a value', function(){
			expect(scope.PageHeader).to.equal('Supplement Entries');
		});

		describe('When the save button is clicked', function() {
			it('then an entry is added', function() {
				expect(entryService).to.exist;
				var addEntry = sinon.spy(entryService, "addEntry");
				scope.addEntry();
				expect(addEntry.calledOnce).to.equal(true);
			});
		});
	});
});