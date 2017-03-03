describe('camelCaseArray', function(){
	beforeEach(module('cgApp.controllers'));
  beforeEach(module('cgApp.services'));

	it('should convert Helloworld into Hello World',
       inject(function ($controller, $rootScope) {
         var $scope = $rootScope.$new();
         $controller('ChartController', {
           $scope: $scope
         });

         var string = $scope.getCamelCaseArray('HelloWorld');
         expect(string).toEqual('Hello World');
         
	}));

});

describe('handleFilter', function(){
  beforeEach(module('cgApp.controllers'));
  beforeEach(module('cgApp.services'));

  it('should organize clay data based on filters',
       inject(function ($controller, $rootScope) {
         // create $scope var
         var $scope = $rootScope.$new();
         $scope.dataoriginal = [{key1:'value1'},{key2:'value2'},{key3:'value3'}];
         $scope.dataclay = [{key1:'value1'},{key2:'value2'},{key3:'value3'}];

         $controller('ChartController', {
           $scope: $scope
         });

         // add a new filter
         var firstCall = $scope.handleFilter('cardType', '1');
         var activeFiltersLength = $scope.activeFilters.length;
         expect(activeFiltersLength).toBe(1);

         // add another filter
         var secondCall = $scope.handleFilter('shore', '1');
         var activeFiltersLength = $scope.activeFilters.length;

         // add previous filter
         var firstCall = $scope.handleFilter('cardType', '1');
         var activeFiltersLength = $scope.activeFilters.length;
         expect(activeFiltersLength).toBe(2);

         // change previous filter arg
         var firstCall = $scope.handleFilter('shore', '2');
         var activeFiltersLength = $scope.activeFilters.length;
         expect(activeFiltersLength).toBe(2);


         
  }));

});

describe('limitCharactersFilter', function(){
  beforeEach(module('cgApp.filters'));

  it('should limit notes summary to x number of characters',
       inject(function ($filter) {
         // limits a string to 12 characters
         filter = $filter('limitCharacters');
         expect(filter(12)).toBe(12); 
  }));

});