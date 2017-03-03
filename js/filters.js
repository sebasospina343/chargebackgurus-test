angular.module('cgApp.filters', [])
	.filter('limitCharacters', function() {
    	return function(input, characterCount) {
			return (input.length > characterCount) ? input.substring(0,characterCount) + '... Read all' : input;
		} 
	});